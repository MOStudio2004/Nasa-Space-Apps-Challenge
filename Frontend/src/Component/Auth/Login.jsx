
import "./Login.css";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
function Login() {
const [crewId, setUsername] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const navigate = useNavigate();
const [status , setStatus] = useState("");
  async function handleLogin(e) {
  e.preventDefault();

  try {
const response = await fetch(
  "/api/auth/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ crewId, password })
  }
);

    const data = await response.json();

if (!response.ok) {
  setMessage(data.message);
  setStatus("error");
  return;
}

setMessage(data.message);
setStatus("success");
navigate("/Home", { replace: true });

  } catch (error) {
    console.error("Network error:", error);
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
        <h2 className="login-subhead">Login</h2>
        <p className="welcome-message">Welcome back, astronaut</p>
      </div>

      <div className="login-box">
        <form onSubmit={handleLogin}>
        <input
          className="Username-input"
          type="text"
          required
          placeholder="Username"
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
          Login
        </button>
        <p className={status === "success"? "success":"error"}>{message}</p>
         </form>
        <p className="new-acc">Need an Account?</p>
 
        <Link to="/Register" className="reg-link" href="">
          Create Account ----&gt;
        </Link>
      </div>
      </div>
    </>
  );
}

export default Login;
