const mongoose = require("mongoose");

const courseTopicSchema = mongoose.Schema({
    cid: Number,
    ctopic: String,
    ccontent: String,
    ccode: String,
    ctrueans: {type:Array,default:[]},
    cquestion: {type:Array,default:[]}
})

const courseTopic = mongoose.model("courseTopic",courseTopicSchema);
module.exports = courseTopic;