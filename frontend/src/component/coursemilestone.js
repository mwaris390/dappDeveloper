import { NavBar } from "./navbar"
import { Link,useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {setUser} from "../reduxstates/loginslice";
import axios from 'axios';
import "../css/coursemilestone.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'

export function CourseMilstone (){

    const [milstone,setMilestone] = useState([]);
    
    const url = useParams();
    
    const user = useSelector((state)=>state.user);
    const dis = useDispatch();
    const nav = useNavigate();

    useEffect(()=>{
        if(user.role==='admin'||user.role==='client'){
            axios.get(`http://localhost:3001/course/topicread?cid=${url.cid}`).then((result1)=>{
            setMilestone(result1.data);
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            nav("/signin")
        }
    },[user,nav,dis,url.cid])

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
    
    return(
        <>
        {user.role !== ""?<>
        <NavBar/>
        <div id="milebox">
            <div className="milecard">
                <div className="milehead">
                    <h3>{url.cc}</h3>
                </div>
                {milstone[0] !== undefined?
                milstone.map((val,key)=>{
                    return(
                            <>
                            <Link to={`/course/${val._id}/${url.cid}/${url.cc}`}>
                                <div className="milestep">
                                    <h4>{val.ctopic}</h4>
                                </div>
                            </Link>
                            </>
                            )
                        })
                :
                <div id="lazyLoad">
                    <h4>Loading<FontAwesomeIcon icon={faRotate} />Please Wait...</h4>
                </div>
                }
            </div>
        </div></>:""}
        </>
    )
}