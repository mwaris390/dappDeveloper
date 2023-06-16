const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();
const userModel = require("../models/usermodel");
const userAdminModel = require("../models/adminusermodel");

router.post("/loginauth",async(req,res)=>{
    const us = req.body.username;
    const pas = req.body.password;
    const isAdmin = req.body.isadmin;

    if(isAdmin===true){
        const ans = await userAdminModel.findOne({name:us},{__v:0});

        if(ans !== null){
            const truepass = bcrypt.compareSync(pas,ans.password);
            if(truepass === false){
                res.status(400).json({msg:"Invalid password"})
            }
            const userobj = {
                id:ans._id,
                username:ans.name,
                role:"admin"
            }
            res.status(200).send(userobj);
        }
        if(ans === null){
            res.status(400).json({msg:"Invalid username"})
        }
    }else{
        const ans = await userModel.findOne({username:us},{__v:0});

        if(ans !== null){
            const truepass = bcrypt.compareSync(pas,ans.password);
            if(truepass === false){
                res.status(400).json({msg:"Invalid password"})
            }
            const userobj = {
                id:ans._id,
                username:ans.username,
                role:"client"
            }
            res.status(200).send(userobj);
        }
        if(ans === null){
            res.status(400).json({msg:"Invalid username"})
        }
    }
    
})

module.exports = router;



