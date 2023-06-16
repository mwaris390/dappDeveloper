const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors');
require("dotenv").config()

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL)

app.use(express.json());
app.use(cors());

const adminuser = require("./routes/adminuser");
const user = require("./routes/user");
const course = require("./routes/course");
const authuser = require("./routes/authuser");

app.use("/adminuser",adminuser);
app.use("/clientuser",user);
app.use("/course",course);
app.use("/authuser",authuser);


app.listen(port,()=>{
    console.log(`app running on ${port}`)
});
