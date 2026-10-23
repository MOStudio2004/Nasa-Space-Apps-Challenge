import logo from "../../assets/logo.png";
import "./Home.css";
import heart from "../../assets/heart.png";
import BBM from "../../assets/BBM.png";

import temp from "../../assets/temp.png";
import spo from "../../assets/spo.png";
import astro from "../../assets/astro.jpg";
import { Link } from "react-router";
function Home({ bPm, tempe, spo2 }) {


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
        <p className="info">
          Here is your health status for today,{" "}
          <span className="date">Oct6,2026</span> .{" "}
          <span className="count">Mission Day 124</span>
        </p>
        <div className="message">
          <img className="heart" src={heart} alt="heart" />
          <h3 className="system-message">All systems Normal</h3>
          <p className="body-signs">
            Your body signs are within expected ranges.
          </p>
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
            <circle className="temperature-track" cx="50" cy="50" r="40" />

            <circle className="temperature-progress" cx="50" cy="50" r="40" />

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
        <div className="astro-ov">
          <img className="astro-img" src={astro} alt="astro" />
          <p className="para-heart-astro">{bPm} BPM</p>
          <p className="para-temp-astro">{tempe}°C</p>
          <p className="para-spo-astro">{spo2}%</p>
        </div>
        <div className="Chat-model">
          <h3 className="chat-title">Ask me about your body signals</h3>
          <input
            placeholder="Type your message"
            type="text"
            className="message-input"
          />
        </div>
      </section>
      <div className="chat-btn-container">
      <Link to="/BOT" className="chat-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          stroke="#00BFFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M24 7V12" />
          <circle cx="24" cy="5" r="2" fill="#00BFFF" />

          <rect x="9" y="12" width="30" height="25" rx="7" />

          <path d="M9 21H5V29H9" />
          <path d="M39 21H43V29H39" />

          <circle cx="18" cy="23" r="3" fill="#00BFFF" stroke="none" />
          <circle cx="30" cy="23" r="3" fill="#00BFFF" stroke="none" />

          <path d="M18 30Q24 35 30 30" />

          <path d="M17 37V42" />
          <path d="M31 37V42" />
          <path d="M17 42H31" />
        </svg>
      </Link>
      </div>
    </>
  );
}

export default Home;
