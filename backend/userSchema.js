const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: 30,
        minLength: 4,
    },

    password: {
        type: String,
        required: true,
        maxLength: 60,
        minLength: [ 8, ' password must be 8 characters long']
    },

    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = { User }