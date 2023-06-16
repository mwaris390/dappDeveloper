import "../css/navbar.css"
import {Link} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {clearUser} from "../reduxstates/loginslice";
import React, {useState} from 'react'
export function NavBar(){
    const [isActive,setIsActive] = useState(false);
    const user = useSelector((state)=>state.user)
    const dis = useDispatch();
    function showNav(){
        setIsActive(true);
    }
    function hideNav(){
        setIsActive(false);
    }
    function handleClear(){
        dis(clearUser({id:"",username:"",role:""}));
    }
    return(
        <>
            <div id="header">
                <div id="burger" onClick={showNav}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div id="logo">
                    <h2>
                    <Link to="/">
                        <span>Dapp</span><span>Developer</span>
                    </Link>
                    </h2>
                    </div>
            </div>

            <div className={isActive?"navbar active-navbar":"navbar"}>
                <div id="cross" onClick={hideNav}>
                    <span></span>
                    <span></span>
                </div>
                <div>
                    <ul>
                        {(window.location.href===`http://localhost:3000/course/:id/:ch`)?<Link to='/coursemilestone'><li>Back</li></Link>:""}
                        <Link to='/'><li>Home</li></Link>
                        <Link to='/userprofile'><li>Profile</li></Link>
                        {(window.location.href==="http://localhost:3000/admin"||window.location.href==="http://localhost:3000/coursetopic")?<><Link to='/admin'><li>Admin</li></Link><Link to='/coursetopic'><li>Courses</li></Link></>:""}
                        <Link to='/signin'><li onClick={handleClear}>Signout</li></Link>
                    </ul>
                </div>
            </div>
        </>
    );
}