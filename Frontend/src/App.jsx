
import Home from "./Component/Home/home.jsx";
//import BOT from "./Component/BOT/BOT.jsx";
import { BrowserRouter, Routes, Route,useLocation } from "react-router";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { mockData } from "./Component/Home/Mockdata.js";
import Login from './Component/Auth/Login.jsx'
import Reg from './Component/Auth/Reg.jsx'
import Protect from './Component/Protect route/ProtectedRoutes.jsx'
import BotPage from './Component/BOT/BotPage.jsx'
import PageTransition from './Component/PageTransision/PageTransision.jsx'

function AnimatedRoutes({ bPm, tempe, spo2 }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route
          path="/"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route
          path="/Register"
          element={
            <PageTransition>
              <Reg />
            </PageTransition>
          }
        />

        <Route element={<Protect />}>
          <Route
            path="/Home"
            element={
              <PageTransition>
                <Home
                  bPm={bPm}
                  tempe={tempe}
                  spo2={spo2}
                />
              </PageTransition>
            }
          />

          <Route
            path="/BOT"
            element={
              <PageTransition>
                <BotPage
                  bPm={bPm}
                  tempe={tempe}
                  spo2={spo2}
                />
              </PageTransition>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
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
    <AnimatedRoutes
      bPm={bPm}
      tempe={tempe}
      spo2={spo2}
    />
  </BrowserRouter>
);
}

export default App;
