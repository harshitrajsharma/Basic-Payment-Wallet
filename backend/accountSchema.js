const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    username: {
        type: mongoose.Schema.Types.String,
        ref: "User",
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    }
})

const Account = mongoose.model("Account", accountSchema);

module.exports = { Account };
