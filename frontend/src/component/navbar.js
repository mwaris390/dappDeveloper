import "../css/navbar.css"
import {Link} from "react-router-dom";
import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {clearUser} from "../reduxstates/loginslice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faUserTie,faBackward,faAddressCard,faArrowRightFromBracket,faFileLines,faUserGraduate } from '@fortawesome/free-solid-svg-icons'
export function NavBar(){
    
    const user = useSelector((state)=>state.user);
    const dis = useDispatch();
    const [isActive,setIsActive] = useState(false);
    
    function showNav(){
        setIsActive(true);
    }
    
    function hideNav(){
        setIsActive(false);
    }
    
    function handleClear(){
        dis(clearUser({id:"",name:"",role:"",jwt:""}));
        localStorage.removeItem("ld")
    }
    
    const url = window.location.href
    const regex = /http:\/\/localhost:3000\/course\//;

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
                    <h1><span>WELCOME</span><br/>{user.name} <FontAwesomeIcon icon={faUserGraduate} /></h1>
                    <ul>
                        {regex.test(url)?
                        <Link to={-1}>
                            <li><FontAwesomeIcon icon={faBackward} /> Back</li>
                        </Link>
                        :
                        ""
                        }
                        <Link to='/'>
                            <li><FontAwesomeIcon icon={faHouse} /> Home</li>
                        </Link>
                        {user.role === "admin"?
                        <Link to='/admin'>
                        <li><FontAwesomeIcon icon={faUserTie} /> Admin</li>
                        </Link>
                        :
                        ""
                        }
                        {user.role === "client"?
                        <Link to='/userprofile'>
                        <li><FontAwesomeIcon icon={faAddressCard} /> Profile</li>
                        </Link>
                        :
                        ""
                        }
                        {(window.location.href==="http://localhost:3000/admin"||window.location.href==="http://localhost:3000/coursetopic")?
                        <>
                            <Link to='/coursetopic'>
                                <li><FontAwesomeIcon icon={faFileLines} /> Courses</li>
                            </Link>
                        </>
                        :
                        ""
                        }
                        <Link to='/signin'>
                            <li onClick={handleClear}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Signout</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
}