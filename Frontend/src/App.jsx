
import Home from "./Component/Home/home.jsx";
import BOT from "./Component/BOT/BOT.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { mockData } from "./Component/Home/Mockdata.js";
import Login from './Component/Auth/Login.jsx'
import Reg from './Component/Auth/Reg.jsx'
function App() {
    const [bPm, setBPm] = useState(mockData.heartRate);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setBPm(Math.floor(Math.random() * 21) + 60);
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);
  
    const [tempe, setTemp] = useState(mockData.temp);
  
    useEffect(() => {
      const tempChange = setInterval(() => {
        setTemp((Math.random() * 1.5 + 36).toFixed(1));
      }, 2000);
  
      return () => clearInterval(tempChange);
    }, []);
  
    const [spo2, setSpo] = useState(mockData.spo);
  
    useEffect(() => {
      const spoChange = setInterval(() => {
        setSpo(Math.floor(Math.random() * 4) + 96);
      }, 2000);
      return () => clearInterval(spoChange);
    }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home bPm={bPm} tempe={tempe} spo2={spo2} />} />
        <Route path="/BOT" element={<BOT bPm={bPm} tempe={tempe} spo2={spo2} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Reg />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
