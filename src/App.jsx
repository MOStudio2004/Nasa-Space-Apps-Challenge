
import Home from "./Component/Home/home.jsx";
import BOT from "./Component/BOT/BOT.jsx";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BOT" element={<BOT />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
