import { NavBar } from "./navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector ,useDispatch} from "react-redux"
import { useParams,useNavigate } from "react-router-dom"
import {setUser} from "../reduxstates/loginslice";
import "../css/coursepage.css"
// import chatlogo from "../asset/robot-solid.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'

export function Coursepage (){

    const[notify,setNotify] = useState(0);
    const [msg,setMsg] = useState("");

    const [isActive,setIsActive] = useState(false);

    const [content, setContent] = useState([]);
    const [trueAns, setTrueAns] = useState([]);
    const [option1, setOption1] = useState([]);
    const [option2, setOption2] = useState([]);
    const [option3, setOption3] = useState([]);
    const [option4, setOption4] = useState([]);
    const [option5, setOption5] = useState([]);

    const [evt, setEvt] = useState([]);
    const [btnallow,setBtnallow] = useState(0)


    function showNav(){
        setIsActive(true);
    }
    function hideNav(){
        setIsActive(false);
    }
    
    const url = useParams();
    const uid = url.id
    
    function testbtn(){
        let wrongAns = 0 ;
        let msg = "";
        if(trueAns[0] !== option1){
            wrongAns++;
            msg +="1,";
        }
        if(trueAns[1] !== option2){
            wrongAns++;
            msg +="2,";
        }if(trueAns[2] !== option3){
            wrongAns++;
            msg +="3,";
        }if(trueAns[3] !== option4){
            wrongAns++;
            msg +="4,";
        }if(trueAns[4] !== option5){
            wrongAns++;
            msg +="5,";
        }
        if(wrongAns<=2){
            const evalt = url.id;
            const obj = {
                coursename:url.ch,
                coursetopic:content[0].ctopic,
            }
            axios.post("http://localhost:3001/clientuser/addeval",{uid:user.id,jwt:user.jwt,evt:evalt,evc:obj}).catch((err)=>{
                console.log(err);
            })
            wrongAns!==0?setMsg("You have passed the exam BUT! Question "+msg+" are Wrong"):setMsg("You have passed the exam");
            setNotify(1);
            setTimeout(()=>{
                setNotify(0)
                setMsg("")
            },5000)
        }else{
            setMsg("You haven't passed! Question "+msg+" are Wrong")
            setNotify(1);
            setTimeout(()=>{
                setNotify(0)
                setMsg("")
            },5000)
        }
    }
    
    const user = useSelector((state)=>state.user);
    const dis = useDispatch();
    const nav = useNavigate();
    
    useEffect(()=>{
        if(user.role==='admin'||user.role==='client'){
            axios.get(`http://localhost:3001/course/topicread?id=${url.id}`).then((result1)=>{
            setContent(result1.data);
            setTrueAns(result1.data[0].ctrueans)
        }).catch((err)=>{
            console.log(err);
        })
        if(user.role==='client'){
            axios.get(`http://localhost:3001/clientuser/readeval/${user.id}`).then((result1)=>{
            setEvt(result1.data);
            }).catch((err)=>{
                console.log(err);
            })
        }
        
        let i;
        for(i=0;i<evt.length;i++){
        if(evt[i] === uid && btnallow === 0){
            setBtnallow(1)
        }
        }
        }else{
            nav("/signin")
        }
    },[evt,btnallow,uid,url,user,nav,dis])
    
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
        {user.role!==""?<>
        <div className={notify===0?"notification":"notification notif"}>
                <h3>{msg}</h3>
        </div>
        <NavBar/>
        <div className={isActive?"chatbot active-chatbot":"chatbot"}>
                <div id="cross" onClick={hideNav}>
                    <span></span>
                    <span></span>
                </div>
                <div>
                <iframe title="chatbot" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/d93dce12-8bad-4909-89f7-9f3b42bae366">
                </iframe>
                </div>
            </div>

            {content.map((val,key)=>{
                return(
                    <>
                        <div id="coursecontentbox">
                            <div className="coursecontentcard">
                                <div className="coursecontenthead">
                                    <h3>{url.ch} : {val.ctopic}</h3>
                                    <div className="chatbtn" onClick={showNav}>
                                        {/* <img src={chatlogo} alt="chat" /> */}
                                        <FontAwesomeIcon icon={faRobot} />
                                    </div>
                                </div>
                                <div className="coursecontent">
                                    <p>{val.ccontent}</p>
                                    <p className="code">
                                        <br></br>
                                        CODE:
                                        <br></br>
                                        <br></br>
                                        {val.ccode}
                                    </p>
                                </div>
                            </div>
                            <div className="coursetest">
                                <div className="coursetesthead">
                                    <h3>Content Evaluation Test</h3>
                                </div>
                            <div className="coursetestcontent">
                                <h5>1. {val.cquestion[0].question1}</h5>
                                <div className="coursetestcontentoption">

                                    <input type="radio"value={val.cquestion[0].option1[0]} name="o1" onChange={(e)=>{setOption1(e.target.value)}}/>
                                    <h6>{val.cquestion[0].option1[0]}</h6>

                                    <input type="radio" value={val.cquestion[0].option1[1]} name="o1"onChange={(e)=>{setOption1(e.target.value)}}/>
                                    <h6>{val.cquestion[0].option1[1]}</h6>

                                    <input type="radio" value={val.cquestion[0].option1[2]} name="o1"onChange={(e)=>{setOption1(e.target.value)}}/>
                                    <h6>{val.cquestion[0].option1[2]}</h6>

                                    <input type="radio" value={val.cquestion[0].option1[3]} name="o1"onChange={(e)=>{setOption1(e.target.value)}}/>
                                    <h6>{val.cquestion[0].option1[3]}</h6>
                                </div> 

                                <h5>2. {val.cquestion[1].question1}</h5>
                                <div className="coursetestcontentoption">
                                    
                                    <input type="radio"value={val.cquestion[1].option2[0]} name="o2" onChange={(e)=>{setOption2(e.target.value)}}/>
                                    <h6>{val.cquestion[1].option2[0]}</h6>

                                    <input type="radio" value={val.cquestion[1].option2[1]} name="o2" onChange={(e)=>{setOption2(e.target.value)}}/>
                                    <h6>{val.cquestion[1].option2[1]}</h6>

                                    <input type="radio" value={val.cquestion[1].option2[2]} name="o2" onChange={(e)=>{setOption2(e.target.value)}}/>
                                    <h6>{val.cquestion[1].option2[2]}</h6>

                                    <input type="radio" value={val.cquestion[1].option2[3]} name="o2" onChange={(e)=>{setOption2(e.target.value)}}/>
                                    <h6>{val.cquestion[1].option2[3]}</h6>
                                </div> 

                                <h5>3. {val.cquestion[2].question3}</h5>
                                <div className="coursetestcontentoption">
                                    
                                    <input type="radio"value={val.cquestion[2].option2[0]} name="o3" onChange={(e)=>{setOption3(e.target.value)}}/>
                                    <h6>{val.cquestion[2].option2[0]}</h6>

                                    <input type="radio" value={val.cquestion[2].option2[1]} name="o3" onChange={(e)=>{setOption3(e.target.value)}}/>
                                    <h6>{val.cquestion[2].option2[1]}</h6>

                                    <input type="radio" value={val.cquestion[2].option2[2]} name="o3" onChange={(e)=>{setOption3(e.target.value)}}/>
                                    <h6>{val.cquestion[2].option2[2]}</h6>

                                    <input type="radio" value={val.cquestion[2].option2[3]} name="o3" onChange={(e)=>{setOption3(e.target.value)}}/>
                                    <h6>{val.cquestion[2].option2[3]}</h6>
                                </div>

                                <h5>4. {val.cquestion[3].question4}</h5>
                                <div className="coursetestcontentoption">
                                    
                                    <input type="radio"value={val.cquestion[3].option3[0]} name="o4" onChange={(e)=>{setOption4(e.target.value)}}/>
                                    <h6>{val.cquestion[3].option3[0]}</h6>

                                    <input type="radio" value={val.cquestion[3].option3[1]} name="o4" onChange={(e)=>{setOption4(e.target.value)}}/>
                                    <h6>{val.cquestion[3].option3[1]}</h6>

                                    <input type="radio" value={val.cquestion[3].option3[2]} name="o4" onChange={(e)=>{setOption4(e.target.value)}}/>
                                    <h6>{val.cquestion[3].option3[2]}</h6>

                                    <input type="radio" value={val.cquestion[3].option3[3]} name="o4" onChange={(e)=>{setOption4(e.target.value)}}/>
                                    <h6>{val.cquestion[3].option3[3]}</h6>
                                </div> 

                                <h5>5. {val.cquestion[4].question5}</h5>
                                <div className="coursetestcontentoption">
                                    
                                    <input type="radio"value={val.cquestion[4].option4[0]} name="o5" onChange={(e)=>{setOption5(e.target.value)}}/>
                                    <h6>{val.cquestion[4].option4[0]}</h6>

                                    <input type="radio" value={val.cquestion[4].option4[4]} name="o5" onChange={(e)=>{setOption5(e.target.value)}}/>
                                    <h6>{val.cquestion[4].option4[1]}</h6>

                                    <input type="radio" value={val.cquestion[4].option4[2]} name="o5" onChange={(e)=>{setOption5(e.target.value)}}/>
                                    <h6>{val.cquestion[4].option4[2]}</h6>

                                    <input type="radio" value={val.cquestion[4].option4[3]} name="o5" onChange={(e)=>{setOption5(e.target.value)}}/>
                                    <h6>{val.cquestion[4].option4[3]}</h6>
                                </div>  
                                
                                
                            </div>
                            {user.role === 'client'&& btnallow !== 1?<div className="coursetestbtn">
                                <button onClick={testbtn} >Submit</button>
                            </div>:"" }
                            
                        </div>
                        </div>
                    </>
                )
            })}</>:''}
        </>
    )
}