import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setUser} from "../reduxstates/loginslice";
import axios from 'axios';
import '../css/signin.css';
import {Link,useNavigate} from 'react-router-dom';
export function Signin (){
    const[notify,setNotify] = useState(0);
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [isadmin,setIsAdmin] = useState(false);
    const [msg,setMsg] = useState("")
    const user = useSelector((state)=>state.user);
    const dis = useDispatch();
    const nav = useNavigate();

    function handleChangeUser(e){
        setUserName(e.target.value.trim())
    }
    function handleChangePass(e){
        setPassword(e.target.value.trim())
    }
    function handleChangeadmin(){
        const checked = document.getElementById("admincheckbox");
        if(checked.checked){
            setIsAdmin(true);
        }else{
            setIsAdmin(false);
        }
    }
    function validateInput(e){
        e.preventDefault()
        if(username === "" || password===""){
            setMsg("Please Fill both username and password")
            setNotify(1);
            setTimeout(()=>{
                setNotify(0)
            },5000)
        }else{
            axios.post("http://localhost:3001/authuser/loginauth",{username:username,password:password,isadmin:isadmin})
            .then(async(result)=>{
                // console.log(result.data);
                dis(setUser(result.data));
            })
            .catch((err)=>{
                // console.log(err.response.data.msg);
                setMsg(err.response.data.msg)
                setNotify(1);
                setTimeout(()=>{
                    setNotify(0)
                },5000)
            })

            setMsg("")
            setUserName("");
            setPassword("")
            setIsAdmin(false)
        }
    }
    if(user.role === "admin"){
        nav("/admin")
    }
    else if(user.role === "client"){
        nav("/")
    }
    return(
        <>
        <div className={notify===0?"notification":"notification notif"}>
                <h3>{msg}</h3>
        </div>
        <div id="box">
            <div className="card">
                <div className="head"><h3>Login By <span>Dapp</span><span>Developer</span></h3></div>
                <div className="form">
                    <form autoComplete='off'>
                        <div className="inputbox">
                            <h4>UserName:</h4>
                            <input type="text" value={username} name="username" id="username" onChange={handleChangeUser}/>
                        </div>
                        <div className="inputbox">
                            <h4>Password:</h4>
                            <input type="password" value={password} name="password" id="password" onChange={handleChangePass}/>
                        </div>
                        <div className='checkinputbox'>
                            <h4>Login as Admin</h4>
                            <input type="checkbox" checked={isadmin===true?true:false} id="admincheckbox" onChange={handleChangeadmin} />
                        </div>
                        <div className="inputbox">
                            <button onClick={validateInput}>Login</button>
                            <Link to='/signup'>Need an account? register Now!</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}