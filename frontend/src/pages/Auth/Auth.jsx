import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./Auth.css";
import sub_img from "../../assets/bg_sub.png";
const Auth = () => {
  const [mode, setMode] = useState("login");
  return (
    <div>
      <div className="background"></div>
      <div className="auth-page">
        <div className="logo_auth logo">
          Memory<span id="OS_part">OS</span>
        </div>
        <div className="container_box">
          <div className="auth-tabs">
            <button onClick={() => setMode("login")}>Login</button>
            <button onClick={() => setMode("register")}>Register</button>
          </div>
          <h2>{mode === "login" ? "welcome Back" : "Create Account"}</h2>
          <form>
            {mode === "register" && (
              <input type="text" placeholder="full name" />
            )}
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Pasword" />
            <button type="submit">
              {mode === "login" ? "Login" : "Register"}
            </button>
          </form>
          {mode === "login" && (
            <p className="footter">
              doesn't have an Account?
              <span>
                <button onClick={() => setMode("register")} className="register-option">Register</button>
              </span>
            </p>
          )}
          {mode==="register" &&(
            <p className="footter">
              Already have an Account?
              <span>
                <button onClick={() => setMode("login")} className="register-option">login</button>
              </span>
            </p>
          )}
        </div>
        <div className="sub_img">
          <img src={sub_img} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
