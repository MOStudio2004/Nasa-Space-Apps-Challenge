import "./Home.css";
import heart from "../../assets/heart.png";
import BBM from "../../assets/BBM.png";

import temp from "../../assets/temp.png";
import spo from "../../assets/spo.png";
import astro from "../../assets/astro.png";
import { Link } from "react-router";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router";
function Home({ bPm, tempe, spo2 }) {

const [user, setUser] = useState(null);

useEffect(() => {
  async function getUser() {
    try{
     const response = await fetch("/api/auth/me" , {credentials:"include"});
     if(!response.ok){
      return
     }

     const data = await response.json()

     setUser(data.user)
    }catch (error){
     console.error(error)
    }
  }
  getUser()
}, []);

const navigate = useNavigate();
async function handleLogout() {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error while logging out");
    }

    setUser(null);
    navigate("/", { replace: true });
  } catch (error) {
    console.error(error);
  }
}

  return (
    <>
      <header className="arvin-nav-h">
        <Link to="/" className="arvin-brand-h">
          <span className="arvin-brand-mark-h">✧</span> Astro<span>Health</span>
        </Link>
        <span className="arvin-nav-context-h">MISSION INTELLIGENCE</span>
        <button type="button" onClick={handleLogout} className="log-out">Log out</button>
      </header>

      <section className="sub-section">
        <h2 className="sub-head">
          Hello, {user?.username.toUpperCase() || "Astro"} <span>Mission health dashboard.</span>
        </h2>
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
          <h3 className="heart-title"> Heart Rate</h3>

          <p className="BPM">
            {bPm} <span className="bbm-span">BPM</span>
          </p>
          <svg
            className="heart-line"
            viewBox="0 0 300 100"
            role="img"
            aria-label="Illustrative heartbeat animation"
          >
            <path
              className="heart-line-path"
              pathLength="100"
              d="
      M 0 55
      H 32
      C 38 55, 40 48, 46 48
      C 52 48, 54 55, 60 55
      H 75
      L 81 62
      L 90 18
      L 99 82
      L 107 55
      H 125
      C 137 55, 140 39, 151 39
      C 162 39, 166 55, 179 55
      H 211
      C 217 55, 219 49, 225 49
      C 231 49, 233 55, 239 55
      H 250
      L 256 61
      L 265 20
      L 274 80
      L 282 55
      H 300
    "
            />
          </svg>
        </div>
        <div className="oxygen-level">
          <img className="spo-img" src={spo} alt="spo" />
          <h3 className="oxygen-title">Oxygen level</h3>
          <p className="spo">{spo2}%</p>
          <svg
            className="oxygen-wave"
            viewBox="0 0 300 100"
            role="img"
            aria-label="Illustrative oxygen waveform"
          >
            <path
              className="oxygen-line"
              d="M0 75 H20 C35 75 35 20 50 20 C65 20 60 75 80 75 H100 C115 75 115 20 130 20 C145 20 140 75 160 75 H180 C195 75 195 20 210 20 C225 20 220 75 240 75 H260 C275 75 275 20 290 20 L300 75"
            />
          </svg>
        </div>
        <div className="body-temp">
          <img src={temp} alt="temp" className="temp-img" />
          <h3 className="temperature-title">Body temperature</h3>
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
          <p className="para-heart-astro"><img src={BBM} alt="BBM" className="astro-reading-icon" /> {bPm} BPM</p>
          <p className="para-temp-astro"><img src={temp} alt="temp" className="astro-reading-icon" /> {tempe}°C</p>
          <p className="para-spo-astro"> <img className="astro-reading-icon" src={spo} alt="spo" /> {spo2}%</p>
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
