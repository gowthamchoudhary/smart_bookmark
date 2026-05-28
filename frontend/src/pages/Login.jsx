import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function handlelogin(e) {
    e.preventDefault();
    setLoading(true);
    try{
    const formData = new useParams();
    formData.append("username",username);
    formData.append("password",password);
    const res = await fetch("http://127.0.0.1:8000/auth/login", {
      method: "Post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      alert("login successfull");
      windows.location.href = "/dashboard"
    } else {
      alert(data.detail||"login failed");
    }
    }
    catch (error){
      console.error(error);
      alert("Backend connection failed")
    }
    finally{
      setLoading(false)
    }
    
  }
  return (
    <div>
      <div className="login_outer_box">
        <form onSubmit={handlelogin}>
          <input
            type="email"
            value={email}
            placeholder="enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
