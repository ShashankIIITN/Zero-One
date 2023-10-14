import React, { useEffect, useState, useContext } from 'react';
import './App.css'
import Navbar from './components/Navbar.js';
import Tabs from './components/Tabs';
import Modal from './components/Modal.js';
import NewContext from './context/NewContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Auth from './components/Login';
import Signup from './components/SignUp';
import About from './components/About';


const demoChatData =
[{
  "me": "Hii",
  "bot": "hello! i am botalina",
},
{
  "me": "how can you help me?",
  "bot": "i can provide information or assistance on a variety of topics",
},
{
  "me": "what kind of information?",
    "bot": "anykind you just have to ask"
  }
]

function App() {
  const navigate = useNavigate()
    const Contexts = useContext(NewContext)
    const [ChatData, setChatData] = useState(demoChatData)
    const [AlertStatus, setAlertStatus] = useState({
      status: "success", msg: "successfully updated", show: false
    });
    const showAlert = (status, msg) => {

      setAlertStatus({
        status: status,
        msg: msg,
        show: true
      })
  
      setInterval(() => {
        setAlertStatus({ ...AlertStatus, show: false })
      }, 10000);
    }

    useEffect(() => {
      if (localStorage.getItem("Token")) {
        Contexts.FetchTabs();
      }else{
        navigate("/Login")
      }
      // eslint-disable-next-line
    }, []);

    
    const navdata = {   
    name: "ChatBot",
  }
  const URL = "http://localhost:5000/"
  const FetchData = async () => {
    const data = await fetch(`${URL + 'ask'}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: {

      }
    }
    );

    let GotData = data.json();
    console.log(GotData);
  }
  return (
    <>
      <Navbar data={navdata} />
      {/* <div className="App">
        {Contexts.Tabs && <Tabs chatdata = {ChatData} />}
      </div> */}
      
      <Routes>
      <Route path='/' element={Contexts.Tabs &&  <Tabs ChatData = {ChatData}/>}/>
      <Route path='/Signup' element={<Signup showAlert={showAlert} />} />
      <Route path='/Login' element={<Auth showAlert={showAlert} />} />
      <Route path='/About' element={<About showAlert={showAlert} />} />
      </Routes>
    </>
  );
}

export default App;
