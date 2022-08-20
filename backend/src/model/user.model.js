const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    type: {type: String, required: true},
    password: {type: String, required: true}
})

const User = mongoose.model("babi-user", UserSchema)

module.exports = User