import { NavBar } from "./navbar"
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/admin.css";
export function Admin (){
    const[notify,setNotify] = useState(0);
    const [msg,setMsg] = useState("");

    const [username,setUsername]=useState("");
    const [password,setPass]=useState("");
    const [admins,setAdmins]=useState([]);

    const [revSug,setRevSug]=useState([]);

    
    const [selectedFile, setSelectedFile] = useState(null);

    const [changeSelectedFile, setChangeSelectedFile] = useState(null);
    const [courseCode,setCourseCode] = useState(0);
    const [courseName,setCourseName] = useState("");
    const [courseDesc,setCourseDesc] = useState("");
    const [courses,setCourses]=useState([]);
    
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
            axios.post("http://localhost:3001/course/courseadd",{image:selectedFile,courseCode:courseCode,courseName:courseName,courseDesc:courseDesc}).catch((err)=>{
                console.log(err);
            })
        }
    }

    function courseHandleDelete(e){
        const id = e.target.value;
        axios.delete(`http://localhost:3001/course/coursedelete/${id}`).catch((err)=>{
            console.log(err);
        })
    }

    function courseHandleUpdate(e){
        const id = e.target.value;
        const cc = document.getElementById(`cc${id}`).value.trim();
        const cn= document.getElementById(`cn${id}`).value.trim();
        const cd= document.getElementById(`cd${id}`).value.trim();
        if(changeSelectedFile!=null){
            axios.put(`http://localhost:3001/course/courseupdate/${id}`,{image:changeSelectedFile,courseCode:cc,courseName:cn,courseDesc:cd}).catch((err)=>{
            console.log(err);
        })
        }else{
            axios.put(`http://localhost:3001/course/courseupdate/${id}`,{courseCode:cc,courseName:cn,courseDesc:cd}).catch((err)=>{
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
        setUsername(e.target.value.trim())
    }
    function handlechangepass(e){
        setPass(e.target.value.trim())
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
            axios.post("http://localhost:3001/adminuser/useradd",{username:username,password:password}).catch((err)=>{
                console.log(err);
            })
        }
    }
    function handleUpdate(e){
        const id = e.target.value;
        const un = document.getElementById(`usn${id}`).value.trim();
        const ps= document.getElementById(`pas${id}`).value.trim();
        axios.put(`http://localhost:3001/adminuser/userupdate/${id}`,{username:un,password:ps}).catch((err)=>{
            console.log(err);
        })
    }
    function handleDelete(e){
        const id = e.target.value;
        axios.delete(`http://localhost:3001/adminuser/userdelete/${id}`).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        axios.get("http://localhost:3001/adminuser/userread").then((result1)=>{
            setAdmins(result1.data);
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

    },[])
    const user = useSelector((state)=>state.user);
    const nav = useNavigate();
    if(user.role !== "admin"){
        nav("/signin")
    }
    return(
        <>
        <div className={notify===0?"notification":"notification notif"}>
                <h3>{msg}</h3>
        </div>
        <NavBar/>
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
                            <input type="text" defaultValue={val.password} id={`pas${val._id}`}/>
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

                    <input type="number" value={courseCode} onChange={(e)=>{setCourseCode(e.target.value.trim())}} placeholder="Course code" />
                    <input type="text" value={courseName} onChange={(e)=>{setCourseName(e.target.value.trim())}} placeholder="Please Enter New Course name" />
                    <input type="text" value={courseDesc} onChange={(e)=>{setCourseDesc(e.target.value.trim())}} placeholder="Please Enter New Course description" />
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
                            <label htmlFor="changeFileInput" className="custom-file-label">Select</label>

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
        </div>
        </>
    )
}