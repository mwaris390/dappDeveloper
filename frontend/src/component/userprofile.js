import { NavBar } from "./navbar"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../css/profile.css';
export function Userprofile (){
    const[notify,setNotify] = useState(0);
    const [msg,setMsg] = useState("")

    const [isUpdate,setIsUpdate] = useState(0);
    const [isSubmitSug,setSubmitSug] = useState(0);
    const [isSubmitRev,setSubmitRev] = useState(0);

    const[suggest,setSuggest] = useState("");
    const[review,setReview] = useState("");

    function clickUpdate(){
        if(isUpdate===0){
            setIsUpdate(1);
        }else{
            setIsUpdate(0);
        }
    }
    function handleChangeSuggest(e){
        setSuggest(e.target.value)
    }
    function clickSubmitSug(){
        if(isSubmitSug===0){
            setSubmitSug(1);
        }else{
            setSubmitSug(0);
            if(suggest!==""){
                setMsg("Thank You for your Suggestion");
                setNotify(1);
                setTimeout(()=>{
                setNotify(0)
                },5000)
            }
            setSuggest("")
        }
    }

    function handleChangeReview(e){
        setReview(e.target.value)
    }
    function clickSubmitRev(){
        if(isSubmitRev===0){
            setSubmitRev(1);
        }else{
            setSubmitRev(0);
            if(review!==""){
                setMsg("Thank You for your Review");
                setNotify(1);
                setTimeout(()=>{
                setNotify(0)
                },5000)
            }
            setReview("")
        }
    }
    const user = useSelector((state)=>state.user);
    const nav = useNavigate();
    if(user.role !== "admin"){
        nav("/signin")
    }
    else if(user.role !== "client"){
        nav("/signin")
    }
    return(
        <>
        <div className={notify===0?"notification":"notification notif"}>
                <h3>{msg}</h3>
        </div>
        <NavBar/>
        <div id="probox">
            <div className="procard">
                <h3>Profile</h3>
                <form>
                    <input type="text" name="firstname" id="firstname" value="Muhammad" disabled={isUpdate===0?"true":""}/>
                    <input type="text" name="lastname" id="lastname" value="Waris" disabled={isUpdate===0?"true":""}/>
                    <input type="text" name="username" id="username" value="m.waris36" disabled={isUpdate===0?"true":""} />
                    <input type="number" name="age" id="age" value="23" disabled={isUpdate===0?"true":""}/>
                    <input type="email" name="email" id="email" value="m.waris390@gmail.com" disabled={isUpdate===0?"true":""} />
                    <input type="password" name="password" id="password" value="12345678" disabled={isUpdate===0?"true":""}/>
                    <div className="radiobtn">
                        <h5>Male:</h5>
                        <input type="radio" name="age" id="age1" value="male" checked disabled={isUpdate===0?"true":""} />
                        <h5>Female:</h5>
                        <input type="radio" name="age" id="age2" value="female" disabled={isUpdate===0?"true":""}/>
                    </div>
                </form>
                <button className="updatebtn" onClick={clickUpdate}>{isUpdate===0?"Enable Update":"Click to Update"}</button>
            </div>
            <div className="sugcard">
                <div className="sugbox">
                    <h3>Suggestion</h3>
                    <textarea value={suggest} name="suggbox" id="suggbox" placeholder="You can give us suggestion of courses in this box" disabled={isSubmitSug===0?"true":""} onChange={handleChangeSuggest}></textarea>
                    <button className="updatebtn" onClick={clickSubmitSug}>{isSubmitSug===0?"Click to Write":"Click to Submit"}</button>
                </div>
                <div className="sugbox">
                    <h3>Review</h3>
                    <textarea value={review} name="reviewbox" id="reviewbox" placeholder="You can give us review of improvement in the web application in this box" disabled={isSubmitRev===0?"true":""} onChange={handleChangeReview}></textarea>
                    <button className="updatebtn" onClick={clickSubmitRev}>{isSubmitRev===0?"Click to Write":"Click to Submit"}</button>
                </div>
            </div>
        </div>
        <div id="coursebox">
            <div className="coursecard">
                <div className="coursecontainer">
                    <div className="courseheading"><h4>Course</h4></div>
                    <div className="courseprogress"><h4>Your progress</h4></div>
                </div>
                <div className="coursecontainer">
                    <div className="courseheading"><h4>CourseName</h4></div>
                    <div className="courseprogress"><h4>90%</h4></div>
                </div>
            </div>
        </div>
        </>
    )
}