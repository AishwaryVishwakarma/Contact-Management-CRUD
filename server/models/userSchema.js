const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
});

const User = mongoose.model("contacts", userSchema);

module.exports = User;