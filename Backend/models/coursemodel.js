const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    image: String,
    courseCode: Number,
    courseName: String,
    courseDescription: String
})

const course = mongoose.model("course",courseSchema);
module.exports = course;