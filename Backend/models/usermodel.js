const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    age: Number,
    email: String,
    gender: String,
    evaltopic: {type: Array, default:[]},
    evalcourse: {type: Array, default:[]},


})

const user = mongoose.model("user",userSchema);
module.exports = user;