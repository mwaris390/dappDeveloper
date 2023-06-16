const mongoose = require("mongoose");

const revSugSchema = mongoose.Schema({
    userName: String,
    category: String,
    userMsg: String
})

const revSug = mongoose.model("revSug",revSugSchema);
module.exports = revSug;