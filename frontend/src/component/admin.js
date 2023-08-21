import { NavBar } from "./navbar"
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setUser} from "../reduxstates/loginslice";
import refBtn from '../asset/rotate-solid.svg'
import "../css/admin.css";

export function Admin (){
    
    const user = useSelector((state)=>state.user);

    const[notify,setNotify] = useState(0);
    const [msg,setMsg] = useState("");

    const [username,setUsername]=useState("");
    const [password,setPass]=useState("");
    const [admins,setAdmins]=useState([]);
    const [users,setUsers]=useState([]);

    const [revSug,setRevSug]=useState([]);

    const [selectedFile, setSelectedFile] = useState(null);

    const [changeSelectedFile, setChangeSelectedFile] = useState(null);
    const [courseCode,setCourseCode] = useState(0);
    const [courseName,setCourseName] = useState("");
    const [courseDesc,setCourseDesc] = useState("");
    const [courses,setCourses]=useState([]);
    const [ispasschanged,setIspasschanged] = useState("");
    const [rel,setRel] = useState(0);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
      
            reader.onload = (e) => {
              setSelectedFile(e.target.result);
            };
      
            reader.readAsDataURL(file);
          }
    };

    const changeHandleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
      
            reader.onload = (e) => {
              setChangeSelectedFile(e.target.result);
            };
      
            reader.readAsDataURL(file);
          }
    };

    function handlecourseadd(e){
        e.preventDefault()
        if(selectedFile === null || courseCode === 0 || courseName ===""|| courseDesc=== ""){
            setMsg("Please Fill All Inputs")
            setNotify(1);
            setTimeout(()=>{
                setNotify(0)
            },5000)
        }else{
            setMsg("")
            setCourseCode(0);
            setCourseName("");
            setCourseDesc("");
            setSelectedFile(null)
            axios.post("http://localhost:3001/course/courseadd",{uid:user.id,image:selectedFile,courseCode:courseCode.trim().toLowerCase(),courseName:courseName.trim().toLowerCase(),courseDesc:courseDesc.trim().toLowerCase(),jwt:user.jwt}).catch((err)=>{
                console.log(err);
            })
        }
    }

    function courseHandleDelete(e){
        const id = e.target.value;
        const data = {uid:user.id,jwt:user.jwt}
        axios.delete(`http://localhost:3001/course/coursedelete/${id}`,{data}).catch((err)=>{
            console.log(err);
        })
    }

    function courseHandleUpdate(e){
        const id = e.target.value;
        const cc = document.getElementById(`cc${id}`).value.trim();
        const cn= document.getElementById(`cn${id}`).value.trim();
        const cd= document.getElementById(`cd${id}`).value.trim();
        if(changeSelectedFile!=null){
            axios.put(`http://localhost:3001/course/courseupdate/${id}`,{uid:user.id,image:changeSelectedFile,courseCode:cc,courseName:cn,courseDesc:cd,jwt:user.jwt}).catch((err)=>{
            console.log(err);
        })
        }else{
            axios.put(`http://localhost:3001/course/courseupdate/${id}`,{uid:user.id,courseCode:cc,courseName:cn,courseDesc:cd,jwt:user.jwt}).catch((err)=>{
            console.log(err);
        })
        }
    }

    function handleDeleteRevSug(e){
        const id = e.target.value;
        axios.delete(`http://localhost:3001/clientuser/revsugdelete/${id}`).catch((err)=>{
            console.log(err);
        })
    }


    function handlechangeuser(e){
        setUsername(e.target.value)
    }
    function handlechangepass(e){
        setPass(e.target.value)
    }

    function handleAddUser(e){
        e.preventDefault()
        if(username === "" || password===""){
            setMsg("Please Fill both username and password")
            setNotify(1);
            setTimeout(()=>{
                setNotify(0)
            },5000)
        }else{
            setMsg("")
            setUsername("")
            setPass("")
            axios.post("http://localhost:3001/adminuser/useradd",{uid:user.id,username:username.trim().toLowerCase(),password:password.trim().toLowerCase(),jwt:user.jwt}).catch((err)=>{
                console.log(err);
            })
        }
    }
    function handleUpdate(e){
        const id = e.target.value;
        const un = document.getElementById(`usn${id}`).value.trim();
        const ps= document.getElementById(`pas${id}`).value.trim();

        if(ps === ispasschanged){
            axios.put(`http://localhost:3001/adminuser/userupdate/${id}`,{uid:user.id,username:un,password:ps,jwt:user.jwt,ispas:true}).catch((err)=>{
            console.log(err);
            })
        }else{
            axios.put(`http://localhost:3001/adminuser/userupdate/${id}`,{uid:user.id,username:un,password:ps,jwt:user.jwt,ispas:false}).catch((err)=>{
            console.log(err);
            })
        }
    }
    function handleDelete(e){
        const id = e.target.value;
        const data = {uid:user.id,jwt:user.jwt}
        axios.delete(`http://localhost:3001/adminuser/userdelete/${id}`,{data}).catch((err)=>{
            console.log(err);
        })
    }

    const nav = useNavigate();
    const dis = useDispatch();

    useEffect(()=>{
        if(user.role==='admin'){
            axios.get("http://localhost:3001/adminuser/userread").then((result1)=>{
            setAdmins(result1.data);
            }).catch((err)=>{
                console.log(err);
            })

            axios.get("http://localhost:3001/clientuser/userclread").then((result1)=>{
            setUsers(result1.data);
            }).catch((err)=>{
                console.log(err);
            })

            axios.get("http://localhost:3001/course/courseread").then((result2)=>{
                setCourses(result2.data);
            }).catch((err)=>{
                console.log(err);
            })

            axios.get("http://localhost:3001/clientuser/revsugread").then((result3)=>{
                setRevSug(result3.data);
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            nav("/")
        }
    },[user,nav,dis,rel])
    
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
    
    function pagereload(){
        setRel(rel+1);
    }
    
    return(
        <>
        {user.role === "admin"?<>
        <div className={notify===0?"notification":"notification notif"}>
                <h3>{msg}</h3>
        </div>
        <NavBar/>
        <div id="refreshbtn" onClick={pagereload}><img src={refBtn} alt="rotate" /></div>
        <div id="adminbox">
        <div className="adminhead">
                <h2>Admin</h2>
            </div>
            <div className="admincard">
                <div className="admininput">
                    <input type="text" value={username}  placeholder="Please Enter New username" onChange={handlechangeuser}/>
                    <input type="text" value={password}  placeholder="Please Enter New password" onChange={handlechangepass}/>
                    <button className="adminbtn" onClick={handleAddUser}>Add User</button>
                </div>
            </div>
            
            <div className="admincard1">
                    {admins.map((val,key)=>{
                        return(
                            <>
                            <div className="admininput1">
                            <h4>{key+1}</h4>
                            <input type="text" defaultValue={val.name}  id={`usn${val._id}`} />
                            <input type="text" defaultValue={val.password} onChange={(e)=>{setIspasschanged(e.target.value)}} id={`pas${val._id}`}/>
                            <button  value={val._id} className="updatebtn" onClick={handleUpdate}>Update</button>
                            <button value={val._id} className="delbtn" onClick={handleDelete}>Delete</button>
                            </div>  
                            </>
                        )
                    })}           
            </div>
            <div className="adminhead">
                <h2>Courses</h2>
            </div>
            <div className="admincard add">
                <div className="admininput">
                    <input type="file" id="fileInput" onChange={handleFileChange}/>
                    <label htmlFor="fileInput" className="custom-file-label">{selectedFile !== null?"Selected":"Select img"}</label>

                    <input type="number" value={courseCode} onChange={(e)=>{setCourseCode(e.target.value)}} placeholder="Course code" />
                    <input type="text" value={courseName} onChange={(e)=>{setCourseName(e.target.value)}} placeholder="Please Enter New Course name" />
                    <input type="text" value={courseDesc} onChange={(e)=>{setCourseDesc(e.target.value)}} placeholder="Please Enter New Course description" />
                    <button className="adminbtn" onClick={handlecourseadd}>Add Course</button>
                </div>
            </div>
    
            <div className="admincard1">
                {courses.map((val,key)=>{
                    return(
                        <>
                        <div className="admininput1">
                            <h4>{key+1}</h4>
                            <img src={val.image} alt="courseimg" />
                            <input type="file" id="changeFileInput" onChange={changeHandleFileChange}/>
                            <label htmlFor="changeFileInput" className="custom-file-label">{changeSelectedFile !== null?"Selected":"Select img"}</label>

                            <input type="number" defaultValue={val.courseCode} id={`cc${val._id}`}/>
                            <input type="text" defaultValue={val.courseName}id={`cn${val._id}`}/>
                            <input type="text" defaultValue={val.courseDescription} id={`cd${val._id}`}/>
                            <button value={val._id} className="updatebtn" onClick={courseHandleUpdate}>Update</button>
                            <button value={val._id} className="delbtn" onClick={courseHandleDelete}>Delete</button>
                        </div>
                        </>
                    );
                })}
              
            </div>
            
            <div className="adminhead">
                <h2>Suggestions And Review</h2>
            </div>
            <div className="admincard1">
                {revSug.map((val,key)=>{
                    return(
                        <>
                        <div className="admininput1">
                            <h4>{val.category} From {val.userName}</h4>
                            <textarea name="revmsg" id="revmsg" defaultValue={val.userMsg} disabled></textarea>
                            <button value={val._id} className="delbtn" onClick={handleDeleteRevSug}>Delete</button>
                        </div> 
                        </>
                    )
                })}
            </div>

            <div className="adminhead">
                <h2>Client Users</h2>
            </div>
            <div className="admincard1">
                    {users.map((val,key)=>{
                        return(
                            <>
                            <div className="admininput1">
                            <h4>{key+1}</h4>
                            <input type="text" defaultValue={val._id} disabled/>
                            <input type="text" defaultValue={val.username} disabled/>
                            <input type="text" defaultValue={val.email} disabled/>
                            <input type="text" defaultValue={val.age} disabled/>
                            <input type="text" defaultValue={val.gender} disabled/>
                            </div>  
                            </>
                        )
                    })}           
            </div>

        </div></>:""}
        </>
    )
}