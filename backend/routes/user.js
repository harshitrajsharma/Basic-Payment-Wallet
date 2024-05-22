const express = require('express')
const zod = require('zod');
const { User } = require('../userSchema')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const { authMiddleware } = require("../middleware")


const router = express.Router();


// Using zod for input validation
const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

router.post('/signup', async (req, res) => {
    try {
        // Now we are extracting req from body and validating the inputs
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: " You have entered Incorrect Inputs"
            })
        }

        // Now we are checking, if the user is already existed or not
        const existingUser = await User.findOne({
            username: req.body.username,
        })
        if (existingUser) {
            return res.status(411).json({
                message: "User already existed",
            })
        }

        // Now, inputs are valids and user not already existed
        // Now, lets create user in the database

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        // User has the mongoDB Id
        const userId = user._id;

        // Add a Random balance to the user's account on signup between 1 to 10000
        const balance = await Account.create({
            user: userId,
            balance: Math.floor(Math.random()*10000 + 1)
        })

        // Token is generated by jwt
        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.json({
            message: 'User created sucessfully',
            token: token,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});


router.post('/signin', async(req, res) => {
    try {

        // Checking if the inputs are valid or not
        const { success } = signinBody.safeParse(req.body);
        if( !success){
            return res.status(411).json({
                message: "Inputs are not valid",
            })
        }

        // Checking if the user is existed or not
        const userExists = await User.findOne({
            username: req.body.username,
        })

        if(!userExists){
            return res.status(411).json({
                message: "User doesn't exist"
            })
        }

        // Checking if the password is correct or not
        const isPasswordCorrect = (
            req.body.password ==  userExists.password
        )
        if(!isPasswordCorrect){
            return res.status(411).json({
                message: "Incorrect Password. Try Again"
            })
        }

        // User is valid and password is correct
        const userId = userExists._id;
        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.send({
            message: "User signed in successfully",
            token: token,
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "An error occurred during signin",
            error: error.message,
        })
    }
})


// Below is the input validation for updating the user
const updateUser = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

router.put('/update', authMiddleware, async (req, res) =>{
    // now we are checking if the inputs are valid or not  
    const { success } = updateUser.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Enter valid Inputs",
        })
    }

    // Now we are updating the user
    const user = await User.updateOne({
        _id: req.userId,
    }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    })

    res.json({
        message: "Updated Successfully",
    })

})

// Now, if we have to search for another user for some reason like to follow or send money or message

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }, {
            username: {
                "$regex": filter
            }
        }]
    })

    // if user not found
    if (!users) {
        return res.status(404).json({
            message: "User not found",
        })
    }

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;