import "./TopBar.css";

const TopBar = ({ active, onChange }) => {
  return (
    <header className="topbar">
      <div className="logo">
        Memory<span id="OS_part">OS</span>
      </div>
      <div className="toggle-btn">
        <div className={`slider ${active === "demo" ? "slider-right" : ""}`}/>
          <button
            className={active === "getStarted" ? "active" : ""}
            onClick={() => onChange("getStarted")}
          >
            Get Started
          </button>
          <button
            className={active === "demo" ? "active" : ""}
            onClick={() => onChange("demo")}
          >
            Demo
          </button>
        </div>
      
    </header>
  );
};

export default TopBar;
