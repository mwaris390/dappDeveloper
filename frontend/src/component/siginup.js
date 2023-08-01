import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {setUser} from "../reduxstates/loginslice";
import { useState,useEffect } from 'react';
import '../css/signup.css';
export function Signup (){
    const[notify,setNotify] = useState(0);
    const [msg,setMsg] = useState("")

    const [username,setUserName] = useState("")
    const [firstname,setFirstName] = useState("")
    const [gender,setGender] = useState("")
    const [email,setEmail] = useState("")
    const [lastname,setLastName] = useState("")
    const [Age,setAge] = useState(null)
    const [password,setPassword] = useState("")

    function handleChangeUser(e){
        setUserName(e.target.value.trim())
    }
    function handleChangePass(e){
        setPassword(e.target.value.trim())
    }
    function handleChangeFn(e){
        setFirstName(e.target.value.trim())
    }
    function handleChangeLn(e){
        setLastName(e.target.value.trim())
    }
    function handleChangeEmail(e){
        setEmail(e.target.value.trim())
    }
    function handleChangeGen(e){
        setGender(e.target.value.trim())
    }
    function handleChangeAge(e){
        setAge(e.target.value.trim())
    }



    function validateInput(e){
        e.preventDefault()
        if(username === "" || password===""||firstname===""||lastname===""||Age===null||email===""||gender===""){
            setMsg("Please Fill All Required Inputs")
            setNotify(1);
            setTimeout(()=>{
                setNotify(0)
            },5000)
        }else{
            setMsg("You are registered! Please GOTO Login Page")
            setNotify(1);
            setTimeout(()=>{
                setNotify(0)
                setMsg("")
            },5000)
            axios.post("http://localhost:3001/clientuser/useradd",{username:username,firstname:firstname,lastname:lastname,password:password,age:Age,gender:gender,email:email}).catch((err)=>{
                console.log(err);
            })
            setUserName("");
            setFirstName("");
            setLastName("");
            setPassword("");
            setAge(null);
            setGender("")
            setEmail("")
        }
    }
    const data = JSON.parse(localStorage.getItem("ld"))
    // console.log(data);
    useEffect(()=>{
        if(data !== null){
            nav("/")
        }
    },[])
    const user = useSelector((state)=>state.user);
    const dis = useDispatch();
    const nav = useNavigate();
    useEffect(()=>{

        if(user.role==='admin'||user.role==='client'){
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
    return(
        <>
        {user.role === ""?<>
        <div className={notify===0?"notification":"notification notif"}>
                <h3>{msg}</h3>
        </div>
        <div id="regbox">
            <div className="regcard">
                <div className="head"><h3>Registration By <span>Dapp</span><span>Developer</span></h3></div>
                <div className="form">
                    <form autoComplete='off'>
                        <div className="inputbox">
                            <h4>FirstName:</h4>
                            <input type="text" name="firstname" id="firstname" value={firstname} onChange={handleChangeFn}/>
                        </div>
                        <div className="inputbox">
                            <h4>LastName:</h4>
                            <input type="text" name="lastname" id="lastname" value={lastname} onChange={handleChangeLn}/>
                        </div>
                        <div className="inputbox">
                            <h4>Age:</h4>
                            <input type="number" name="Age" id="Age" onChange={handleChangeAge} value={Age}/>
                        </div>
                        <div className="inputbox">
                            <h4>Gender:</h4>
                            <div className="radiobtn">
                                <h5>Male:</h5>
                                <input type="radio" name="age" id="age1" value="male" onChange={handleChangeGen}/>
                                <h5>Female:</h5>
                                <input type="radio" name="age" id="age2" value="female" onChange={handleChangeGen}/>
                            </div>
                        </div>
                        <div className="inputbox">
                            <h4>UserName:</h4>
                            <input type="text" name="Username" id="username" value={username} onChange={handleChangeUser}/>
                        </div>
                        <div className="inputbox">
                            <h4>Email:</h4>
                            <input type="text" name="email" id="email" onChange={handleChangeEmail} value={email}/>
                        </div>
                        <div className="inputbox">
                            <h4>Password:</h4>
                            <input type="text" name="password" id="password" onChange={handleChangePass} value={password}/>
                        </div>
                        <div className="inputbox">
                            <button onClick={validateInput}>Get yourself register</button>
                            <Link to='/signin'>Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div></>:""}
        </>
    )
}