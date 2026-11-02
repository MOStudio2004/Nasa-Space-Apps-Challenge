
import "./Login.css";
import { Link } from "react-router";

function Login() {
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
          Login
        </button>

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
