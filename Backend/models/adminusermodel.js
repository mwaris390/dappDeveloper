const mongoose = require("mongoose");

const adminUserSchema = mongoose.Schema({
    name: String,
    password: String
})

const adminUser = mongoose.model("adminUser",adminUserSchema);
module.exports = adminUser;