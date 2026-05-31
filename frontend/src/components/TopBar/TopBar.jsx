import React, { useState } from "react";
import "./TopBar.css";
const TopBar = () => {
  const [active, setActive] = useState("getStarted");
  return (
    <header className="topbar">
      <div className="logo">
        Memory<span id="OS_part">OS</span>
      </div>
      <div className="toggle-btn">
        <div className={`slider ${active === "demo" ? "slider-right" : ""}`}/>
          <button
            className={active === "getStarted" ? "active" : ""}
            onClick={() => setActive("getStarted")}
          >
            Get Started
          </button>
          <button
            className={active === "demo" ? "active" : ""}
            onClick={() => setActive("demo")}
          >
            Demo
          </button>
        </div>
      
    </header>
  );
};

export default TopBar;
