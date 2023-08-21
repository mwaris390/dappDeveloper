import { NavBar } from "./navbar"
import { useState,useEffect } from "react";
import { setUser } from "../reduxstates/loginslice";
import axios from "axios";
import "../css/coursetopic.css";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import refBtn from '../asset/rotate-solid.svg'

export function Coursetopic (){
    
    const user = useSelector((state)=>state.user);
    
    const[notify,setNotify] = useState(0);
    const [msg,setMsg] = useState("");

    const [cid,setCid] = useState(0);
    const [ctopic,setCtopic] = useState("");
    const [ccontent,setCcontent] = useState("");
    const [ccode,setCcode] = useState("");

    const [ctrueans,setCtrueans] = useState([]);
    const [ans1,setAns1] = useState("");
    const [ans2,setAns2] = useState("");
    const [ans3,setAns3] = useState("");
    const [ans4,setAns4] = useState("");
    const [ans5,setAns5] = useState("");

    const [cques,setCques] = useState([]);

    const [q1,setQ1] = useState("");
    const [q1o1,setQ1o1] = useState("");
    const [q1o2,setQ1o2] = useState("");
    const [q1o3,setQ1o3] = useState("");
    const [q1o4,setQ1o4] = useState("");

    const [q2,setQ2] = useState("");
    const [q2o1,setQ2o1] = useState("");
    const [q2o2,setQ2o2] = useState("");
    const [q2o3,setQ2o3] = useState("");
    const [q2o4,setQ2o4] = useState("");

    const [q3,setQ3] = useState("");
    const [q3o1,setQ3o1] = useState("");
    const [q3o2,setQ3o2] = useState("");
    const [q3o3,setQ3o3] = useState("");
    const [q3o4,setQ3o4] = useState("");

    const [q4,setQ4] = useState("");
    const [q4o1,setQ4o1] = useState("");
    const [q4o2,setQ4o2] = useState("");
    const [q4o3,setQ4o3] = useState("");
    const [q4o4,setQ4o4] = useState("");

    const [q5,setQ5] = useState("");
    const [q5o1,setQ5o1] = useState("");
    const [q5o2,setQ5o2] = useState("");
    const [q5o3,setQ5o3] = useState("");
    const [q5o4,setQ5o4] = useState("");

    const [topic,setTopic] = useState([]);
    const [relo,setRelo] = useState(0);

    function handleSubmit(e){
        e.preventDefault();
        if(cid === 0 || ctopic === "" || ccontent === "" || ccode === "" || q1 === ""|| q1o1 === ""|| q1o2 === ""|| q1o3 === ""|| q1o4 === ""|| ans1 === ""|| q2 === ""|| q2o1 === ""|| q2o2 === ""|| q2o3 === ""|| q2o4 === ""|| ans2 === ""|| q3 === ""|| q3o1 === ""|| q3o2 === ""|| q3o3 === ""|| q3o4 === ""|| ans3 === ""|| q4 === ""|| q4o1 === ""|| q4o2 === ""|| q4o3 === ""|| q4o4 === ""|| ans4 === ""|| q5 === ""|| q5o1 === ""|| q5o2 === ""|| q5o3 === ""|| q5o4 === ""|| ans5 === ""){
            setMsg("Please Fill ALL INPUTS")
            setNotify(1);
            setTimeout(()=>{
                setNotify(0)
            },5000)
        }else{
            setMsg("")
            axios.post("http://localhost:3001/course/coursetopicadd",{uid:user.id,jwt:user.jwt,cid:cid.trim(),ctopic:ctopic.trim(),ccontent:ccontent.trim(),ccode:ccode.trim(),ctrueans:ctrueans,cques:cques}).catch((err)=>{
                console.log(err);
            })
            setCid("")
            setCtopic("")
            setCcontent("")
            setCcode("")
            setAns1("")
            setAns2("")
            setAns3("")
            setAns4("")
            setAns5("")
            setQ1("")
            setQ2("")
            setQ3("")
            setQ4("")
            setQ5("")
            setQ1o1("")
            setQ1o2("")
            setQ1o3("")
            setQ1o4("")
            setQ2o1("")
            setQ2o2("")
            setQ2o3("")
            setQ2o4("")
            setQ3o1("")
            setQ3o2("")
            setQ3o3("")
            setQ3o4("")
            setQ4o1("")
            setQ4o2("")
            setQ4o3("")
            setQ4o4("")
            setQ5o1("")
            setQ5o2("")
            setQ5o3("")
            setQ5o4("")
        }
    }

    function delHandle(e){
        const id = e.target.value;
        const data = {uid:user.id,jwt:user.jwt}
        axios.delete(`http://localhost:3001/course/coursetopicdelete/${id}`,{data}).catch((err)=>{
            console.log(err);
        })
    }
    
    function upHandle(e){
        const id = e.target.value;
        const cid = document.getElementById(`cid${id}`).value.trim();
        const ctopic = document.getElementById(`ctopic${id}`).value.trim();
        const ccontent = document.getElementById(`ccontent${id}`).value.trim();
        const ccode = document.getElementById(`ccode${id}`).value.trim();

        const cq1 = document.getElementById(`cq1${id}`).value.trim();
        const cq2 = document.getElementById(`cq2${id}`).value.trim();
        const cq3 = document.getElementById(`cq3${id}`).value.trim();
        const cq4 = document.getElementById(`cq4${id}`).value.trim();
        const cq5 = document.getElementById(`cq5${id}`).value.trim();

        const ans1 = document.getElementById(`ans1${id}`).value.trim();
        const ans2 = document.getElementById(`ans2${id}`).value.trim();
        const ans3 = document.getElementById(`ans3${id}`).value.trim();
        const ans4 = document.getElementById(`ans4${id}`).value.trim();
        const ans5 = document.getElementById(`ans5${id}`).value.trim();

        const cq1o1 = document.getElementById(`cq1o1${id}`).value.trim();
        const cq1o2 = document.getElementById(`cq1o2${id}`).value.trim();
        const cq1o3 = document.getElementById(`cq1o3${id}`).value.trim();
        const cq1o4 = document.getElementById(`cq1o4${id}`).value.trim();

        const cq2o1 = document.getElementById(`cq2o1${id}`).value.trim();
        const cq2o2 = document.getElementById(`cq2o2${id}`).value.trim();
        const cq2o3 = document.getElementById(`cq2o3${id}`).value.trim();
        const cq2o4 = document.getElementById(`cq2o4${id}`).value.trim();

        const cq3o1 = document.getElementById(`cq3o1${id}`).value.trim();
        const cq3o2 = document.getElementById(`cq3o2${id}`).value.trim();
        const cq3o3 = document.getElementById(`cq3o3${id}`).value.trim();
        const cq3o4 = document.getElementById(`cq3o4${id}`).value.trim();

        const cq4o1 = document.getElementById(`cq4o1${id}`).value.trim();
        const cq4o2 = document.getElementById(`cq4o2${id}`).value.trim();
        const cq4o3 = document.getElementById(`cq4o3${id}`).value.trim();
        const cq4o4 = document.getElementById(`cq4o4${id}`).value.trim();

        const cq5o1 = document.getElementById(`cq5o1${id}`).value.trim();
        const cq5o2 = document.getElementById(`cq5o2${id}`).value.trim();
        const cq5o3 = document.getElementById(`cq5o3${id}`).value.trim();
        const cq5o4 = document.getElementById(`cq5o4${id}`).value.trim();

        const trueAns = [ans1,ans2,ans3,ans4,ans5]
        const questions = [{
            question1:cq1,option1:[cq1o1,cq1o2,cq1o3,cq1o4]},{question1:cq2,option2:[cq2o1,cq2o2,cq2o3,cq2o4]},{question3:cq3,option2:[cq3o1,cq3o2,cq3o3,cq3o4]},{question4:cq4,option3:[cq4o1,cq4o2,cq4o3,cq4o4]},{question5:cq5,option4:[cq5o1,cq5o2,cq5o3,cq5o4]
            }];

        axios.put(`http://localhost:3001/course/coursetopicupdate/${id}`,{uid:user.id,jwt:user.jwt,cid:cid,ctopic:ctopic,ccontent:ccontent,ccode:ccode,ctrueans:trueAns,cques:questions}).catch((err)=>{
            console.log(err);
        })
    }
    const nav = useNavigate();
    const dis = useDispatch();
    
    function pagerel(){
        setRelo(relo+1);
    }
    
    useEffect(()=>{
        if(user.role==='admin'){
            axios.get("http://localhost:3001/course/coursetopicread").then((result1)=>{
            setTopic(result1.data);
            }).catch((err)=>{
            console.log(err);
        })
        }else{
            nav("/")
        }
    },[user,nav,dis,relo])

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
        {user.role === "admin"?<>
        <div className={notify===0?"notification":"notification notif"}>
                <h3>{msg}</h3>
        </div>
        <NavBar/>
        <div id="refreshbtn" onClick={pagerel}><img src={refBtn} alt="rotate" /></div>
        <div id="topicbox">
            <div className="topiccard">
                <h2>Course Topic</h2>
                <div className="topicinput">

                    <input type="number" placeholder="courseID" value={cid} onChange={(e)=>{setCid(e.target.value)}} />
                    <input type="text" placeholder="courseTopic/Step"  value={ctopic} onChange={(e)=>{setCtopic(e.target.value)}} />
                    <textarea placeholder="Course Content" value={ccontent} onChange={(e)=>{setCcontent(e.target.value)}}></textarea>
                    <textarea placeholder="Code Example" value={ccode} onChange={(e)=>{setCcode(e.target.value)}}></textarea>

                    <input type="text" placeholder="Question:1" value={q1} onChange={(e)=>{setQ1(e.target.value)}}/>
                    <input type="text" placeholder="Q1option1" value={q1o1} onChange={(e)=>{setQ1o1(e.target.value)}}/>
                    <input type="text" placeholder="Q1option2" value={q1o2} onChange={(e)=>{setQ1o2(e.target.value)}}/>
                    <input type="text" placeholder="Q1option3" value={q1o3} onChange={(e)=>{setQ1o3(e.target.value)}}/>
                    <input type="text" placeholder="Q1option4" value={q1o4} onChange={(e)=>{setQ1o4(e.target.value)}}/>
                    <input type="text" placeholder="Q1 true answer" value={ans1}onChange={(e)=>{setAns1(e.target.value)}}/>

                    <input type="text" name="coursequestion" id="coursequestion" placeholder="Question:2" value={q2} onChange={(e)=>{setQ2(e.target.value)}}/>
                    <input type="text" placeholder="Q2option1" value={q2o1} onChange={(e)=>{setQ2o1(e.target.value)}}/>
                    <input type="text" placeholder="Q2option2" value={q2o2} onChange={(e)=>{setQ2o2(e.target.value)}}/>
                    <input type="text" placeholder="Q2option3" value={q2o3} onChange={(e)=>{setQ2o3(e.target.value)}}/>
                    <input type="text" placeholder="Q2option4" value={q2o4} onChange={(e)=>{setQ2o4(e.target.value)}}/>
                    <input type="text"placeholder="Q2 true answer" value={ans2}onChange={(e)=>{setAns2(e.target.value)}}/>

                    <input type="text" name="coursequestion" id="coursequestion" placeholder="Question:3" value={q3} onChange={(e)=>{setQ3(e.target.value)}}/>
                    <input type="text" placeholder="Q3option1" value={q3o1} onChange={(e)=>{setQ3o1(e.target.value)}}/>
                    <input type="text" placeholder="Q3option2" value={q3o2} onChange={(e)=>{setQ3o2(e.target.value)}}/>
                    <input type="text" placeholder="Q3option3" value={q3o3} onChange={(e)=>{setQ3o3(e.target.value)}}/>
                    <input type="text" placeholder="Q3option4" value={q3o4} onChange={(e)=>{setQ3o4(e.target.value)}}/>
                    <input type="text" placeholder="Q3 true answer" value={ans3}onChange={(e)=>{setAns3(e.target.value)}}/>

                    <input type="text" name="coursequestion" id="coursequestion" placeholder="Question:4" value={q4} onChange={(e)=>{setQ4(e.target.value)}}/>
                    <input type="text" placeholder="Q4option1" value={q4o1} onChange={(e)=>{setQ4o1(e.target.value)}}/>
                    <input type="text" placeholder="Q4option2" value={q4o2} onChange={(e)=>{setQ4o2(e.target.value)}}/>
                    <input type="text" placeholder="Q4option3" value={q4o3} onChange={(e)=>{setQ4o3(e.target.value)}}/>
                    <input type="text" placeholder="Q4option4" value={q4o4} onChange={(e)=>{setQ4o4(e.target.value)}}/>
                    <input type="text" placeholder="Q4 true answer" value={ans4}onChange={(e)=>{setAns4(e.target.value)}}/>

                    <input type="text" name="coursequestion" id="coursequestion" placeholder="Question:5" value={q5} onChange={(e)=>{setQ5(e.target.value)}}/>
                    <input type="text" placeholder="Q5option1" value={q5o1} onChange={(e)=>{setQ5o1(e.target.value)}}/>
                    <input type="text" placeholder="Q5option2" value={q5o2} onChange={(e)=>{setQ5o2(e.target.value)}}/>
                    <input type="text" placeholder="Q5option3" value={q5o3} onChange={(e)=>{setQ5o3(e.target.value)}}/>
                    <input type="text" placeholder="Q5option4" value={q5o4} onChange={(e)=>{setQ5o4(e.target.value)}}/>
                    <input type="text" placeholder="Q5 true answer" value={ans5}onChange={(e)=>{setAns5(e.target.value)}}onBlur={()=>{
                        setCtrueans([ans1.trim(),ans2.trim(),ans3.trim(),ans4.trim(),ans5.trim()]); 
                        setCques([
                            {question1:q1.trim(),option1:[q1o1.trim(),q1o2.trim(),q1o3.trim(),q1o4.trim()]},{question1:q2.trim(),option2:[q2o1.trim(),q2o2.trim(),q2o3.trim(),q2o4.trim()]},{question3:q3.trim(),option2:[q3o1.trim(),q3o2.trim(),q3o3.trim(),q3o4.trim()]},{question4:q4.trim(),option3:[q4o1.trim(),q4o2.trim(),q4o3.trim(),q4o4.trim()]},{question5:q5.trim(),option4:[q5o1.trim(),q5o2.trim(),q5o3.trim(),q5o4.trim()]}])
                        }
                    }
                    />
                    
                    <button onClick={handleSubmit} className="topicaddbtn">Add Course topic</button>
                    
                </div>
            </div>

            <div className="existcoursehead">
                <h3>Courses</h3>
            </div>

            <div className="existcoursecard">
                {topic.map((val,key)=>{
                    return(
                        <>
                        <div className="topicinput1">
                        <input type="number" id={`cid${val._id}`}defaultValue={val.cid}/>
                        <input type="text" id={`ctopic${val._id}`}defaultValue={val.ctopic}/>
                        <textarea id={`ccontent${val._id}`} defaultValue={val.ccontent}></textarea>
                        <textarea id={`ccode${val._id}`} defaultValue={val.ccode}></textarea>

                        <input type="text" id={`cq1${val._id}`}defaultValue={val.cquestion[0].question1}/>
                        <input type="text" id={`cq1o1${val._id}`}  defaultValue={val.cquestion[0].option1[0]}/>
                        <input type="text" id={`cq1o2${val._id}`}  defaultValue={val.cquestion[0].option1[1]}/>
                        <input type="text" id={`cq1o3${val._id}`}  defaultValue={val.cquestion[0].option1[2]}/>
                        <input type="text" id={`cq1o4${val._id}`}  defaultValue={val.cquestion[0].option1[3]}/>
                        <input type="text" id={`ans1${val._id}`}   defaultValue={val.ctrueans[0]}/>

                        <input type="text" id={`cq2${val._id}`}defaultValue={val.cquestion[1].question1}/>
                        <input type="text" id={`cq2o1${val._id}`}  defaultValue={val.cquestion[1].option2[0]}/>
                        <input type="text" id={`cq2o2${val._id}`}  defaultValue={val.cquestion[1].option2[1]}/>
                        <input type="text" id={`cq2o3${val._id}`}  defaultValue={val.cquestion[1].option2[2]}/>
                        <input type="text" id={`cq2o4${val._id}`}  defaultValue={val.cquestion[1].option2[3]}/>
                        <input type="text" id={`ans2${val._id}`}   defaultValue={val.ctrueans[1]}/>

                        <input type="text" id={`cq3${val._id}`} defaultValue={val.cquestion[2].question3}/>
                        <input type="text" id={`cq3o1${val._id}`}  defaultValue={val.cquestion[2].option2[0]}/>
                        <input type="text" id={`cq3o2${val._id}`}  defaultValue={val.cquestion[2].option2[1]}/>
                        <input type="text" id={`cq3o3${val._id}`}  defaultValue={val.cquestion[2].option2[2]}/>
                        <input type="text" id={`cq3o4${val._id}`}  defaultValue={val.cquestion[2].option2[3]}/>
                        <input type="text" id={`ans3${val._id}`}   defaultValue={val.ctrueans[2]}/>

                        <input type="text" id={`cq4${val._id}`}defaultValue={val.cquestion[3].question4}/>
                        <input type="text" id={`cq4o1${val._id}`}  defaultValue={val.cquestion[3].option3[0]}/>
                        <input type="text" id={`cq4o2${val._id}`}  defaultValue={val.cquestion[3].option3[1]}/>
                        <input type="text" id={`cq4o3${val._id}`}  defaultValue={val.cquestion[3].option3[2]}/>
                        <input type="text" id={`cq4o4${val._id}`}  defaultValue={val.cquestion[3].option3[3]}/>
                        <input type="text" id={`ans4${val._id}`}   defaultValue={val.ctrueans[3]}/>

                        <input type="text" id={`cq5${val._id}`}defaultValue={val.cquestion[4].question5}/>
                        <input type="text" id={`cq5o1${val._id}`}  defaultValue={val.cquestion[4].option4[0]}/>
                        <input type="text" id={`cq5o2${val._id}`}  defaultValue={val.cquestion[4].option4[1]}/>
                        <input type="text" id={`cq5o3${val._id}`}  defaultValue={val.cquestion[4].option4[2]}/>
                        <input type="text" id={`cq5o4${val._id}`}  defaultValue={val.cquestion[4].option4[3]}/>
                        <input type="text" id={`ans5${val._id}`}   defaultValue={val.ctrueans[4]}/>

                        <button value={val._id} onClick={upHandle}>Update</button>
                        <button value={val._id} onClick={delHandle}>Delete</button>
                        </div>
                        </>
                    )
                })}
            </div>
            
        </div></>:""}
        </>
    )
}