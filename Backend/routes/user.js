const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();
const revSugModel = require("../models/revSugModel");
const userModel = require("../models/usermodel");

router.post("/useradd",async (req,res)=>{
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = bcrypt.hashSync(req.body.password,10);
    const email = req.body.email;
    const gender = req.body.gender;
    const age = req.body.age;
    const user = new userModel({username:username,firstname:firstname,lastname:lastname,password:password,email:email,age:age,gender:gender});
    await user.save();
    console.log("USER ADDED")
});


router.post("/revsugadd",async (req,res)=>{
    const userName = "JohnDoe2"
    const category = "Suggestion"
    const userMsg = ` `
    const revSug = new revSugModel({userName:userName,category:category,userMsg:userMsg});
    await revSug.save();
    console.log("REV ADDED")
});

router.get("/revsugread",async(req,res)=>{
    await revSugModel.find({},{__v:0}).then((result)=>{
        res.json(result)
        console.log("REV READ")
    });
});

router.delete(`/revsugdelete/:id`,async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    await revSugModel.deleteOne({_id:id});
    console.log("REV DELETED")

});



module.exports = router