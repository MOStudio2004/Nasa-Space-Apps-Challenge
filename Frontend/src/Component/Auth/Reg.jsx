
import "./Login.css";
import { Link } from "react-router";
function Reg() {
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
        <input
          className="Username-input"
          type="text"
          required
          placeholder="Username"
        />

        <input
          className="password"
          type="password"
          required
          placeholder="Password"
        />

        <button className="Login-btn" type="submit">
          Create Account
        </button>
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
