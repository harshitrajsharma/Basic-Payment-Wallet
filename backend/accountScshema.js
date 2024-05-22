import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    }
})

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
