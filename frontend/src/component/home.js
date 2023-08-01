import { NavBar } from "./navbar";
import { useEffect, useState } from "react";
import {setUser} from "../reduxstates/loginslice";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../css/home.css';

export function Home (){

    const [course,setCourse] = useState([]);
    const dis = useDispatch();
    const nav = useNavigate();
    const user = useSelector((state)=>state.user);

    useEffect(()=>{
        if(user.role==='admin'||user.role==='client'){
            nav("/")
            axios.get("http://localhost:3001/course/courseread").then((result1)=>{
            setCourse(result1.data);
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            nav("/signin")
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
    
    return(
        <>
        {user.role!==''?<>
            <NavBar/>
            <div id="banner">
                <h2>Courses</h2>
                <p><strong>WEB3 technology is the future of the internet</strong> , enabling a decentralized, transparent, and secure online experience for users. By embracing WEB3 technology, you're not only joining a revolutionary movement but also paving the way for a more equitable and inclusive digital world.</p>
            </div>
            <div id="coursesshow">
                {course.map((val,key)=>{
                    return(
                        <>
                        <div id="card">
                            <div className="image">
                                <img src={val.image} alt="imgg" />
                            </div>
                            <div className="content" >
                                <div className="effort"><h5>By <span>Dapp</span><span>Developer</span>   {val.courseCode}</h5></div>
                                <div className="coursename"><h3>{val.courseName}</h3></div>
                                <div className="description">
                                    <p>{val.courseDescription}</p>
                                </div>
                                <div className="contentbtn">
                                    <Link to={`/coursemilestone/${val.courseCode}/${val.courseName}`}>
                                        <button>Lets start!</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        </>
                    )
                })}

            </div></>:""}
        </>
    )
}