import "./chat.css";
import { Link } from "react-router";
function BOT() {
  return (
    
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


  );
}

export default BOT;
