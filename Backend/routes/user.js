const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();
const revSugModel = require("../models/revSugModel");
const userModel = require("../models/usermodel");
const authenticate = require("./authenticateToken");

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
    res.status(201).json({"msg":"COURSE ADDED"})
    //console.log("USER ADDED")
});

router.get("/userclread",async(req,res)=>{
    await userModel.find({},{__v:0}).then((users)=>{
        res.json(users)
        //console.log("USER READ")
    });
});
router.get(`/oneuserclread/:id`,async(req,res)=>{
    const id = req.params.id;
    await userModel.find({_id:id},{__v:0}).then((users)=>{
        res.json(users)
        //console.log("USER READ")
    });
});

router.delete(`/usercdelete/:id`,authenticate,async(req,res)=>{
    const id = req.params.id;
    await userModel.deleteOne({_id:id});
    //console.log("USER DELETED")
    res.status(200).json({"msg":"COURSE DELETED"})

});

router.put(`/usercupdate/:id`,authenticate,async(req,res)=>{
    const id = req.params.id;
    const usn = req.body.username;
    const pas= bcrypt.hashSync(req.body.password,10);
    const ls= req.body.lastname;
    const fs= req.body.firstname;
    const em= req.body.email;
    const ag= req.body.age;
    const ge= req.body.gender;
    const ispas = req.body.ispas;

    if(ispas === true){
        await userModel.updateOne({_id:id},{firstname:fs,lastname:ls,username:usn,password:pas,email:em,age:ag,gender:ge}).then(()=>{
            //console.log("USER UPDATED");
            res.status(200).json({"msg":"COURSE UPDATED"})
        })
    }else{
        await userModel.updateOne({_id:id},{firstname:fs,lastname:ls,username:usn,email:em,age:ag,gender:ge}).then(()=>{
            //console.log("USER UPDATED");
            res.status(200).json({"msg":"COURSE UPDATED"})

        })
    }
    

});


router.post("/revsugadd",async (req,res)=>{
    const userName = req.body.un
    const category = req.body.cat
    const userMsg = req.body.msg
    const revSug = new revSugModel({userName:userName,category:category,userMsg:userMsg});
    await revSug.save();
    //console.log("REV ADDED")
});

router.get("/revsugread",async(req,res)=>{
    await revSugModel.find({},{__v:0}).then((result)=>{
        res.json(result)
        //console.log("REV READ")
    });
});

router.delete(`/revsugdelete/:id`,async(req,res)=>{
    const id = req.params.id;
    await revSugModel.deleteOne({_id:id});
    //console.log("REV DELETED")

});

router.post("/addeval",authenticate,async (req,res)=>{
    const id = req.body.uid
    const eval = req.body.evt
    const cval = req.body.evc
    let evaltopic = []
    let evalcourse = []
    await userModel.findOne({_id:id},{__v:0}).then((result)=>{
        evaltopic = result.evaltopic;
        evalcourse = result.evalcourse;
    })
    
    await userModel.updateOne({_id:id},{evaltopic:[...evaltopic,eval],evalcourse:[...evalcourse,cval]}).then(()=>{
        //console.log("USER Evaluatation UPDATED");
    })
});

router.get(`/readeval/:id`,async (req,res)=>{
    const id = req.params.id;
    let evaltopic = []
    await userModel.findOne({_id:id},{__v:0}).then((result)=>{
        evaltopic = result.evaltopic;
    })
    res.status(200).json(evaltopic);
    
});



module.exports = router