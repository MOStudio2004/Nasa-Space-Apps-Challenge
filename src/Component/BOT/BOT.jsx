import "./chat.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
import heart from "../../assets/heart.png";
import { useState } from "react";
function BOT({ bPm, tempe, spo2 }) {
  const [input , setInput] = useState("")

   
function handleResponse() {

  const message = input.trim().toLowerCase();

  // 1. Prevent empty messages
  if (!message) {
    return "Please enter a question.";
  }

  // 2. Greetings
  if (/^(hi|hello|hey)[!. ]*$/.test(message)) {
    return "Hello, astronaut! How can I assist you today?";
  }

  // 3. Health summary — check this BEFORE individual vital signs
  const asksForSummary =
    message.includes("health summary") ||
    message.includes("overall health") ||
    message.includes("summarize my health") ||
    message.includes("full health report") ||
    message.includes("health status") ||
    message.includes("how is my health") ||
    message.includes("analyze my health") ||
    message.includes("analyze my vitals") ||
    message.includes("overall condition") ||
    message.includes("check my health");

  if (asksForSummary) {
    const heartStatus =
      bPm < 60
        ? "below the typical adult resting heart-rate range"
        : bPm <= 100
        ? "within the typical adult resting heart-rate range"
        : "above the typical adult resting heart-rate range";

    const tempStatus =
      tempe < 36.1
        ? "below the selected typical adult temperature range"
        : tempe <= 37.2
        ? "within the selected typical adult temperature range"
        : tempe < 38
        ? "slightly above the selected typical adult temperature range"
        : "elevated and may indicate fever";

    const oxygenStatus =
      spo2 < 95
        ? "below the typical range for most healthy adults at sea level"
        : "within the typical range for most healthy adults at sea level";

    const lines =
      `Health Summary:\n` +
      `Heart Rate: ${bPm} BPM — ${heartStatus}.\n` +
      `Body Temperature: ${tempe}°C — ${tempStatus}.\n` +
      `Blood Oxygen (SpO2): ${spo2}% — ${oxygenStatus}.\n\n`;

    // Check whether any reading is outside the selected ranges
    const abnormal =
      bPm < 60 ||
      bPm > 100 ||
      tempe < 36.1 ||
      tempe > 37.2 ||
      spo2 < 95;

    if (!abnormal) {
      return (
        lines +
        "Overall Assessment: All three readings are within the selected typical adult reference ranges. This does not establish overall health or fitness for spaceflight. Consider symptoms, personal baseline, measurement quality, and mission-specific medical criteria."
      );
    }

    return (
      lines +
      "Overall Assessment: At least one reading is outside the selected typical adult reference ranges. Recheck the measurements and consider symptoms and personal baseline. Follow the mission's medical protocol and notify the medical team when indicated, especially if an abnormal reading persists or symptoms occur."
    );
  }

  // 4. Heart rate
  if (
    message.includes("heart rate") ||
    message.includes("heartbeat") ||
    message.includes("pulse") ||
    message.includes("bpm")
  ) {
    return `Your current heart rate is ${bPm} BPM.`;
  }

  // 5. Body temperature
  if (
    message.includes("temperature") ||
    message.includes("body temp") ||
    message.includes("fever")
  ) {
    return `Your current body temperature is ${tempe}°C.`;
  }

  // 6. Blood oxygen
  if (
    message.includes("oxygen") ||
    message.includes("spo2") ||
    message.includes("blood oxygen")
  ) {
    return `Your current blood oxygen level is ${spo2}%.`;
  }
//7. thanks
if(message.includes("thanks") || message.includes("thank you") || message.includes("thx")){
  return "Your welcome astro , enjoy your journey"
}
  // 7. Unknown question
  return "I'm your Astronaut Health Assistant. Ask me about your heart rate, body temperature, blood oxygen, or general health summary.";
}

const [messages , setMessages] = useState([]);

function sendMessage (){
  const userMessage = input.trim();
  if(!userMessage){
    return
  }
  const botReply = handleResponse();
  setMessages((prev) => [...prev , {text:userMessage , sender:"user"}, {text:botReply,sender:"bot"}]);
  setInput("")
}
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
          <div className="ch-spo"></div>
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
        <div className="chat-message-center">
         {messages.map((message , index) => (
          <p key={index} className={message.sender === "user" ? "user-message" : "bot-message"}>{message.text}</p>
         ))}
        </div>
        <hr />
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type your message..."
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} className="send-btn-chat" type="button">Send</button>
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
