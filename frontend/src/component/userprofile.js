import { NavBar } from "./navbar"
import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setUser} from "../reduxstates/loginslice";
import '../css/profile.css';
export function Userprofile (){
    const user = useSelector((state)=>state.user);
    const[notify,setNotify] = useState(0);
    const [msg,setMsg] = useState("")

    const [isSubmitSug,setSubmitSug] = useState(0);
    const [isSubmitRev,setSubmitRev] = useState(0);

    const[suggest,setSuggest] = useState("");
    const[review,setReview] = useState("");

    const [client,setClient] = useState([]);
    const[gender,setGender] = useState("male");
    const [ispasschanged,setIspasschanged] = useState("");
    function handleChangeSuggest(e){
        setSuggest(e.target.value)
    }
    function clickSubmitSug(){
        
        if(suggest!==""){
            axios.post(`http://localhost:3001/clientuser/revsugadd/`,{un:user.name,cat:"Suggestion",msg:suggest}).catch((err)=>{
            console.log(err);
            })
            setMsg("Thank You for your Suggestion");
            setNotify(1);
            setTimeout(()=>{
            setNotify(0)
            },5000)
            setSuggest("")
        }
        
    }

    function handleChangeReview(e){
        setReview(e.target.value)
    }
    function clickSubmitRev(){
            if(review!==""){
                axios.post(`http://localhost:3001/clientuser/revsugadd/`,{un:user.name,cat:"Review",msg:review}).catch((err)=>{
                console.log(err);
                })
                setMsg("Thank You for your Review");
                setNotify(1);
                setTimeout(()=>{
                setNotify(0)
                },5000)
                setReview("")
            }
    }
    const nav = useNavigate();
    const dis = useDispatch();
    useEffect(()=>{
        if(user.role==='client'){
            axios.get(`http://localhost:3001/clientuser/oneuserclread/${user.id}`).then((result1)=>{
            setClient(result1.data);
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            nav("/")
        }
    },[user,nav,dis])
    function check(){
        const data = localStorage.getItem("ld");
        if(data !== null){
            if(user.role === ""){
                const pdata = JSON.parse(data);
                dis(setUser(pdata));
            }
        }
    }
    check()
    
    function clickUpdate(e){
        const id = user.id;
        const un = document.getElementById(`un${id}`).value.trim();
        const ps= document.getElementById(`pas${id}`).value.trim();
        const ls= document.getElementById(`ls${id}`).value.trim();
        const fs= document.getElementById(`fs${id}`).value.trim();
        const em= document.getElementById(`em${id}`).value.trim();
        const ag= document.getElementById(`ag${id}`).value.trim();

        if(ps === ispasschanged){
            axios.put(`http://localhost:3001/clientuser/usercupdate/${id}`,{uid:user.id,jwt:user.jwt,firstname:fs,lastname:ls,username:un,password:ps,email:em,age:ag,gender:gender,ispas:true}).catch((err)=>{
            console.log(err);
            })
        }else{
            axios.put(`http://localhost:3001/clientuser/usercupdate/${id}`,{uid:user.id,jwt:user.jwt,firstname:fs,lastname:ls,username:un,password:ps,email:em,age:ag,gender:gender,ispas:false}).catch((err)=>{
            console.log(err);
            })
        }
    }
    let arr = []
    client.forEach((val)=>{
        arr = val.evalcourse;
    })
    // console.log(arr[0].course);
    return(
        <>
        {user.role === "client"?<>
        <div className={notify===0?"notification":"notification notif"}>
                <h3>{msg}</h3>
        </div>
        <NavBar/>
        <div id="probox">
            <div className="procard">
                <h3>Profile</h3>
                {client.map((val,key)=>{
                    return(
                        <>
                            <form>
                                <input type="text" defaultValue={val.firstname} id={`fs${val._id}`} />
                                <input type="text" defaultValue={val.lastname} id={`ls${val._id}`}/>
                                <input type="text" defaultValue={val.username} id={`un${val._id}`}/>
                                <input type="number"  defaultValue={val.age} id={`ag${val._id}`}/>
                                <input type="email" defaultValue = {val.email} id={`em${val._id}`}/>
                                <input type="text" defaultValue={val.password} onChange={(e)=>{setIspasschanged(e.target.value)}} id={`pas${val._id}`}/>
                                <div className="radiobtn">
                                    <h5>Male:</h5>
                                    <input type="radio" name="radiobtn"  value="male" onChange={(e)=>{setGender(e.target.value)}} />
                                    <h5>Female:</h5>
                                    <input type="radio" name="radiobtn"  value="female" onChange={(e)=>{setGender(e.target.value)}}/>
                                </div>
                            </form>
                            <button value={val._id} className="updatebtn" onClick={clickUpdate}>Update</button>
                        </>
                    )
                })}
                
            </div>
            <div className="sugcard">
                <div className="sugbox">
                    <h3>Suggestion</h3>
                    <textarea value={suggest} name="suggbox" id="suggbox" placeholder="You can give us suggestion of courses in this box" onChange={handleChangeSuggest}></textarea>
                    <button className="updatebtn" onClick={clickSubmitSug}>Submit</button>
                </div>
                <div className="sugbox">
                    <h3>Review</h3>
                    <textarea value={review} name="reviewbox" id="reviewbox" placeholder="You can give us review of improvement in the web application in this box" onChange={handleChangeReview}></textarea>
                    <button className="updatebtn" onClick={clickSubmitRev}>submit</button>
                </div>
            </div>
        </div>
        <div id="coursebox">
            <div className="coursecard">
                <div className="coursecontainer">
                    <div className="courseheading"><h4>Course</h4></div>
                    <div className="courseprogress"><h4>Completed Topics</h4></div>
                </div>
                {arr.length !==0? arr.map((val,key)=>{
                    return(
                        <>
                            <div className="coursecontainer">
                                <div className="courseheading"><h4>{val.coursename}</h4></div>
                                <div className="courseprogress"><h4>{val.coursetopic}</h4></div>
                            </div>
                        </>
                    )
                }):
                        <>
                            <div className="coursecontainer">
                                <div className="courseheading"><h4>No Course Yet</h4></div>
                                <div className="courseprogress"><h4>No Data</h4></div>
                            </div>
                        </>
                }
            </div>
        </div></>:""}
        </>
    )
}