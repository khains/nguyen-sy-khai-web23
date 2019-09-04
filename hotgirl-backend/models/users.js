const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
});

module.exports = mongoose.model("User", UserSchema);