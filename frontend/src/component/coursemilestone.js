import { NavBar } from "./navbar"
import { Link,useParams,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/coursemilestone.css";
export function CourseMilstone (){
    const [milstone,setMilestone] = useState([]);
    const url = useParams();
    useEffect(()=>{
        axios.get(`http://localhost:3001/course/topicread?cid=${url.cid}`).then((result1)=>{
            setMilestone(result1.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
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
        <NavBar/>
        <div id="milebox">
            <div className="milecard">
                <div className="milehead">
                    <h3>{url.cc}</h3>
                </div>
                {milstone.map((val,key)=>{
            return(
                    <>
                    <Link to={`/course/${val._id}/${url.cc}`}>
                        <div className="milestep">
                            <h4>{val.ctopic}</h4>
                        </div>
                    </Link>
                    </>
                    )
                })}
            </div>
        </div>
        </>
    )
}