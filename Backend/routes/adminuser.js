const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();
const adminUserModel = require("../models/adminusermodel");
const authenticate = require("./authenticateToken");

router.post("/useradd",authenticate,async (req,res)=>{
    let username=req.body.username;
    let pass= bcrypt.hashSync(req.body.password,10);

    const adminUser = new adminUserModel({name:username,password:pass});
    await adminUser.save();
    console.log("USER ADDED")
});

router.get("/userread",async(req,res)=>{
    await adminUserModel.find({},{__v:0}).then((users)=>{
        res.json(users)
        console.log("USER READ")
    });
});

router.delete(`/userdelete/:id`,authenticate,async(req,res)=>{
    const id = req.params.id;
    await adminUserModel.deleteOne({_id:id});
    console.log("USER DELETED")

});

router.put(`/userupdate/:id`,authenticate,async(req,res)=>{
    const id = req.params.id;
    usn = req.body.username;
    pas= bcrypt.hashSync(req.body.password,10);
    
    await adminUserModel.updateOne({_id:id},{name:usn,password:pas}).then(()=>{
        console.log("USER UPDATED");
    })

});

module.exports = router