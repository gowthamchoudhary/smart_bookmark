import { useState } from "react";

import { loginUser } from "../../api/authAPI";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function handlelogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      alert("Login successful");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert(error.message || "Backend connection failed");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <form className="folder" onSubmit={handlelogin}>
        <div className="folder_tab"></div>
        <div className="folder_papers"></div>
        <div className="folder_front"></div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
