import logo from "../../assets/logo.png";
import "./Home.css";
import heart from "../../assets/heart.png"

function Home() {
  return (
    <>
    <header className="head-home">
      <div className="brand">
        <img className="title-img" src={logo} alt="" />
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
      <div className="heart-rate-card"></div>
      <div className="oxygen-level"></div>
      <div className="body-temp"></div>
    </section>
    </>
  );
}

export default Home;
