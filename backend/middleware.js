const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authorization Failed'
        })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token, JWT_SECRET);
        if (decode.userId) {
            req.userId = decode.userId; // This is our authorized user's ID from the token and we are adding to the request header (req.userId)
            next();
        }
        else{
            return res.status(403).json({
                message: "Don't have access to this route"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: 'Authorization Failed'
        })
    }
}

module.exports = {
    authMiddleware
}