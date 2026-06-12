import { useEffect, useState } from "react";
import "./Auth.css";
import sub_img from "../../assets/bg_sub.png";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../api/authAPI";
const Auth = () => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(
    () => () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
    },
    [profilePreview],
  );

  const handleSubmit = async (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    try {
      if (mode === "register") {
        await registerUser(email, username, password, profilePicture);
        setMode("login");
        setUsername("");
        setPassword("");
        setProfilePicture(null);
        setProfilePreview("");
      } else {
        await loginUser(email, password);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
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
          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <>
                <input
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  minLength={3}
                  maxLength={50}
                  required
                />
                <label className="profile-picture-field">
                  Profile picture
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setProfilePicture(file);
                      setProfilePreview(
                        file ? URL.createObjectURL(file) : "",
                      );
                    }}
                  />
                </label>
                {profilePreview && (
                  <img
                    className="profile-picture-preview"
                    src={profilePreview}
                    alt="Profile preview"
                  />
                )}
              </>
            )}
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              value={password}
              placeholder="Pasword"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Login"
                  : "Register"}
            </button>
          </form>
          {error && <p className="auth-error">{error}</p>}
          {mode === "login" && (
            <p className="footter">
              doesn't have an Account?
              <span>
                <button
                  onClick={() => setMode("register")}
                  className="register-option"
                >
                  Register
                </button>
              </span>
            </p>
          )}
          {mode === "register" && (
            <p className="footter">
              Already have an Account?
              <span>
                <button
                  onClick={() => setMode("login")}
                  className="register-option"
                >
                  login
                </button>
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
