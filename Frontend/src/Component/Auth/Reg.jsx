
import "./Login.css";
import { Link } from "react-router";
import { useState } from "react";
function Reg() {
const [crewId, setUsername] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const [status, setStatus] = useState("")
async function handleRegister(e) {
  e.preventDefault();

  try {
    const response = await fetch(
      "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ crewId, password })
      }
    );

    const data = await response.json();

if (!response.ok) {
  setStatus("error");
  setMessage(data.message);
  return;
}

setStatus("success");
setMessage(data.message);

  } catch (error) {
  console.error("Network error:", error);
  setStatus("error");
  setMessage("Connection failed. Please try again.");
}
}
  return (
    <>
    <div className="auth-page">
      <div className="login-header">
        <h1 className="login-title">
          <span className="star">✧</span> Astro{" "}
          <span className="health">Health</span>
        </h1>

        <p className="para-login">MISSION INTELLIGENCE</p>
        <h2 className="login-subhead">Register</h2>
        <p className="welcome-message">Join the mission</p>
      </div>

      <div className="login-box">
        <form onSubmit={handleRegister}>
        <input
          className="Username-input"
          type="text"
          required
          placeholder="CrewId"
            value={crewId}
  onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="password"
          type="password"
          required
          placeholder="Password"
            value={password}
  onChange={(e) => setPassword(e.target.value)}
        />

        <button className="Login-btn" type="submit">
          Create Account
        </button>
                <p className={status === "success"? "success":"error"}>{message}</p>

        </form>
        <p className="new-acc">Already Have Account?</p>
        <Link className="reg-link" to="/login">
         Login →
       </Link>
      </div>
      </div>
    </>
  );
}

export default Reg;
