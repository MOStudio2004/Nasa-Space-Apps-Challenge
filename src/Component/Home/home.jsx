import logo from "../../assets/logo.png";
import "./Home.css";
import heart from "../../assets/heart.png"
import BBM from "../../assets/BBM.png"
import { mockData } from "./Mockdata"
import { useState, useEffect } from "react";
import temp from "../../assets/temp.png"
import spo from "../../assets/spo.png"
import astro from "../../assets/astro.jpg"
function Home() {
  const [bPm , setBPm] = useState(mockData.heartRate);
  
  useEffect(() => {
  const interval = setInterval(() => {
    setBPm(Math.floor(Math.random() * 21) + 60);
  }, 2000);

  return () => clearInterval(interval);
}, []);

const [tempe , setTemp] = useState(mockData.temp);

useEffect(() => {
  const tempChange = setInterval(() => {
    setTemp((Math.random() * 1.5 + 36).toFixed(1));
  }, 2000);

  return () => clearInterval(tempChange);
}, []);


const [spo2,setSpo] = useState(mockData.spo)

useEffect(() => {
  const spoChange = setInterval(() => {
    setSpo(Math.floor(Math.random() * 4) + 96);
  },2000);
  return () => clearInterval(spoChange);
},[]);

  return (
    <>
    <header className="head-home">
      <div className="brand">
        <img className="title-img" src={logo} alt="logo" />
        <h1 className="title">
          Astro<span className="title-span">Health</span>
        </h1>
      </div>
      <div className="name" aria-label="Mission status: active, Artemis II">
        <span className="span-mission-status" aria-hidden="true" />
        <span className="mission-status">Mission Active</span>
        <span className="span-mission">Artemis II</span>
      </div>
    </header>

    <section className="sub-section">
      <h2 className="sub-head">Hello, Astro</h2>
      <p className="info">Here is your health status for today,    <span className="date">Oct6,2026</span> . <span className="count">Mission Day 124</span></p>
      <div className="message">
        <img className="heart" src={heart} alt="heart" />
        <h3 className="system-message">All systems Normal</h3>
        <p className="body-signs">Your body signs are within expected ranges.</p>
      </div>
    </section>

    <section className="vital-signs">
      <div className="heart-rate-card">
        <img src={BBM} alt="BBM" className="BBM-img" />
        <p className="BPM">{bPm} BPM</p>
          <svg
    className="heart-line"
    viewBox="0 0 300 100"
    preserveAspectRatio="none"
  >
    <polyline
      className="heart-line-path"
      points="0,50 50,50 65,45 75,55 90,50 110,50 125,10 140,90 155,30 170,50 210,50 225,45 235,55 250,50 300,50"
    />
  </svg>
      </div>
      <div className="oxygen-level">
        <img className="spo-img" src={spo} alt="spo" />
        <p className="spo">{spo2}%</p>
        <svg
  className="oxygen-wave"
  viewBox="0 0 300 100"
  preserveAspectRatio="none"
>
  <path
    className="oxygen-line"
    d="M0 50 L35 50 L45 40 L55 60 L65 50 L100 50
       L115 50 L125 30 L140 70 L155 20 L170 60
       L180 50 L220 50 L230 42 L240 58 L250 50 L300 50"
  />
</svg>
      </div>
      <div className="body-temp">
       <img src={temp} alt="temp" className="temp-img" />
       <p className="temp">{tempe}°C</p>
       <svg
  className="temperature-svg"
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle
    className="temperature-track"
    cx="50"
    cy="50"
    r="40"
  />

  <circle
    className="temperature-progress"
    cx="50"
    cy="50"
    r="40"
  />

  <text
    x="50"
    y="46"
    textAnchor="middle"
    className="temperature-value"
  >
    37°
  </text>

  <text
    x="50"
    y="61"
    textAnchor="middle"
    className="temperature-unit"
  >
    TEMP
  </text>
</svg>
      </div>
    </section>

    <section className="overall">
      <div className="alerts"></div>
      <div className="astro-ov">
        <img className="astro-img" src={astro} alt="astro" />
        <p className="para-heart-astro">{bPm} BPM</p>
        <p className="para-temp-astro">{tempe}°C</p>
        <p className="para-spo-astro">{spo2}%</p>
      </div>
    </section>
    </>
  );
}

export default Home;
