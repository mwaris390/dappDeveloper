const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const router = express.Router();
const userModel = require("../models/usermodel");
const userAdminModel = require("../models/adminusermodel");
require("dotenv").config()
router.use(cookieParser());

async function authAdmin(req,res,next){
    const us = req.body.username;
    const pas = req.body.password;
    const isAdmin = req.body.isadmin;
    if(isAdmin===true){
        const ans = await userAdminModel.findOne({name:us},{__v:0});

        if(ans !== null){
            const truepass = bcrypt.compareSync(pas,ans.password);
            const token = jwt.sign({id:ans._id,
                username:ans.name}, process.env.SECRET_KEY);
            if(truepass === false){
                res.status(400).json({msg:"Invalid password"})
            }else{
                req.user = {
                    id:ans._id,
                    username:ans.name,
                    role:"admin",
                    jwt:token
                }
            }
        }
        else{
            res.status(400).json({msg:"Invalid username"})
        }
    }
    next();
}
async function authUser(req,res,next){
    const us = req.body.username;
    const pas = req.body.password;
    const isAdmin = req.body.isadmin;
    if(isAdmin === false){
        const ans = await userModel.findOne({username:us},{__v:0});
        if(ans !== null){
            const truepass = bcrypt.compareSync(pas,ans.password);
            const token = jwt.sign({id:ans._id,
                username:ans.username}, process.env.SECRET_KEY);
            if(truepass === false){
                res.status(400).json({msg:"Invalid password"})
            }else{
                req.user = {
                    id:ans._id,
                    username:ans.username,
                    role:"client",
                    jwt:token
                }
            }   
        }
        else{
            res.status(400).json({msg:"Invalid username"})
        }
    }
    next()
}
router.post("/loginauth",authAdmin,authUser,async(req,res)=>{
    res.status(200).json(req.user);
});
  

module.exports = router; 



