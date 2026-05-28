import React from "react";

const TopBar = () => {
  return (
    <div>
      <div className="topbar">
        <div className="roundball"></div>
        <div className="auth_btn">
          <div className="login_btn">LOGIN</div>
          <div className="register_btn">REGISTER</div>
        </div>
        <div className="title">MEMORYOS</div>
      </div>
    </div>
  );
};

export default TopBar;
