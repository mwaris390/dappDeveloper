import { NavBar } from "./navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../css/home.css'
export function Home (){
    const [course,setCourse] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3001/course/courseread").then((result1)=>{
            setCourse(result1.data);
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
                            <div className="content">
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

            </div>
        </>
    )
}