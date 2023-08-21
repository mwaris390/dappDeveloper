const express = require("express");
const router = express.Router();
const courseModel = require("../models/coursemodel");
const courseTopicModel = require("../models/coursetopicmodel");
const authenticate = require("./authenticateToken");


router.post("/courseadd",authenticate,async (req,res)=>{
    image = req.body.image;
    ccode = req.body.courseCode;
    courseName = req.body.courseName;
    courseDesc = req.body.courseDesc;
    const course = new courseModel({image:image,courseCode:ccode,courseName:courseName,courseDescription:courseDesc});
    await course.save();
    //console.log("COURSE ADDED")
});
router.post("/coursetopicadd",authenticate,async (req,res)=>{
    cid = req.body.cid;
    ctopic = req.body.ctopic;
    ccontent = req.body.ccontent;
    ccode = req.body.ccode;
    ctrueans = req.body.ctrueans;
    cques = req.body.cques;
    const courseTopic = new courseTopicModel({cid:cid,ctopic:ctopic,ccontent:ccontent,ccode:ccode,ctrueans:ctrueans,cquestion:cques});
    await courseTopic.save();
    // console.log("COURSE TOPIC ADDED")
});

router.get("/courseread",async(req,res)=>{
    await courseModel.find({},{__v:0}).then((result)=>{
        res.json(result)
        //console.log("COURSE READ")
    });
});
router.get("/coursetopicread",async(req,res)=>{
    await courseTopicModel.find({},{__v:0}).then((result)=>{
        res.json(result)
        //console.log("COURSE TOPIC READ")
    });
});



router.get("/topicread",async(req,res)=>{
    const q = req.query;
    const cid = q.cid
    const id = q.id

    if(cid !== undefined ){
        await courseTopicModel.find({cid:Number(cid)},{__v:0}).then((result)=>{
            res.json(result)
            //console.log("COURSE TOPIC READ")
        });
    }
    if(id !== undefined){
        await courseTopicModel.find({_id:id},{__v:0}).then((result)=>{
            res.json(result)
            //console.log("COURSE TOPIC READ")
        });
    }
});

router.delete(`/coursedelete/:id`,authenticate,async(req,res)=>{
    const id = req.params.id;
    await courseModel.deleteOne({_id:id});
    //console.log("COURSE DELETED")

});
router.delete(`/coursetopicdelete/:id`,authenticate,async(req,res)=>{
    const id = req.params.id;
    await courseTopicModel.deleteOne({_id:id});
    //console.log("COURSE TOPIC DELETED")

});

router.put(`/courseupdate/:id`,authenticate,async(req,res)=>{
    const id = req.params.id;
    image = req.body.image;
    ccode = req.body.courseCode;
    courseName = req.body.courseName;
    courseDesc = req.body.courseDesc;
    await courseModel.updateOne({_id:id},{image:image,courseCode:ccode,courseName:courseName,courseDescription:courseDesc}).then(()=>{
        //console.log("COURSE UPDATED");
    })
});
router.put(`/coursetopicupdate/:id`,authenticate,async(req,res)=>{
    const id = req.params.id;
    cid = req.body.cid;
    ctopic = req.body.ctopic;
    ccontent = req.body.ccontent;
    ccode = req.body.ccode;
    ctrueans = req.body.ctrueans;
    cques = req.body.cques;
    await courseTopicModel.updateOne({_id:id},{cid:cid,ctopic:ctopic,ccontent:ccontent,ccode:ccode,ctrueans:ctrueans,cquestion:cques}).then(()=>{
        //console.log("COURSE TOPIC UPDATED");
    })
});
module.exports = router