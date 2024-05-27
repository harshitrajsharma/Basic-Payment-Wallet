const express = require('express');
const mongoose = require('mongoose');
const { authMiddleware } = require('../middleware');
const { Account } = require('../accountSchema');

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        user: req.userId,
    })

    res.json({
        balance: account.balance
    })
});

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession(); // This is used to start a session

    session.startTransaction(); // This is used to start a transaction

    // This will extract the transfer info from the request body
    const { to, amount } = req.body;

    // This will find the user's account who is sending the money in the database
    const fromAccount = await Account.findOne({
        user: req.userId
    })

    // This will check if the user has enough money to transfer or not
    if (!fromAccount || fromAccount.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance",
        })
    }

    // Now, if the user's account exists and also user has enough balance to transfer

    // Now, its time to find the account of the user to whom we are transferring the money
    const toAccount = await Account.findOne({
        user: to
    })

    // Now, we will check if the user to whom we are transferring the money exists or not
    // If the user doesn't exists, then we have to abor the transaction
    if (!toAccount) {
        await session.abortTransaction(); // This will abort the transaction
        return res.status(400).json({
            message: "User doesn't exists",
        })
    }

    // If the user exists.
    // Now, we will deduct the amount from the sender's account and add it to the receiver's account
    await Account.updateOne({
        user: req.userId,
    },
        {
            $inc: { balance: -amount }
        }).session(session);

    await Account.updateOne({
        user: to
    }, {
        $inc: { balance: amount }
    }).session(session);

    // Now, the transaction is completed.
    // Now, we will commit the transaction

    await session.commitTransaction();
    res.json({
        message: "Amount transferred successful"
    })
})

module.exports = router;