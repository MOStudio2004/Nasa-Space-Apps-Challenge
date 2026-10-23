import "./chat.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
import heart from "../../assets/heart.png";
function BOT() {
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
      <div className="vital-signs-chat">
        <img className="heart-img-o" src={heart} alt="heart" />
        <p className="menu-para">Your Vital Signs</p>
          <span className="span-mission-status-p" aria-hidden="true" />
          <span className="mission-status-p">Stable</span>
          <div className="ch-heart"></div>
          <div className="ch-temp"></div>
          <div ch-spo></div>
      </div>
      <div className="chat-container">
        <div className="chat-header">
          <h1>
            {" "}
            <svg
              className="chat-icon"
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
            </svg>{" "}
            <span className="chat-title">Astro Assistant</span>
          </h1>
          <p className="chat-para">
            Your chat bot health assistant during the mission
          </p>
        </div>
        <hr />
        <div className="chat-message-center"></div>
        <hr />
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type your message..."
            className="chat-input"
          />
        </div>
      </div>
      <Link to="/" className="chat-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          stroke="#00BFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 22L24 6L43 22" />
          <path d="M10 20V40H38V20" />
          <rect x="19" y="27" width="10" height="13" rx="1" />
        </svg>
      </Link>
    </>
  );
}

export default BOT;
