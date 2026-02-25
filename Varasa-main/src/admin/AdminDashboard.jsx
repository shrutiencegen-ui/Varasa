import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./AdminLogin.css";
import logoSymbol from "../assets/logo-symbol.png";

export default function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUsername = (e) => {
    const value = e.target.value;

    if (value.length > 8) {
      setError("Username maximum 8 characters allowed");
      return;
    }

    setError("");
    setUser(value);
  };

  const handlePassword = (e) => {
    const value = e.target.value;

    if (value.length > 34) {
      setError("Password maximum 34 characters allowed");
      return;
    }

    setError("");
    setPass(value);
  };

  const login = async () => {
    setError("");

    if (!user.trim() && !pass.trim()) {
      setError("Username and Password are required");
      return;
    }

    if (!user.trim()) {
      setError("Username is required");
      return;
    }

    if (!pass.trim()) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://varasa-1.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.trim(),
          password: pass.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      window.location.href = "/admin-dashboard";
    } catch (err) {
      setError("Network error: Cannot connect to server");
      setLoading(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box">
        <div className="login-header">
          <img
            src={logoSymbol}
            alt="Varasa logo"
            className="admin-login-logo"
          />
          <h2>Admin Login</h2>
        </div>

        <div className="input-group">
          <input
            className={`admin-input ${error ? "error-border" : ""}`}
            placeholder="Username"
            value={user}
            onChange={handleUsername}
            onKeyDown={handleEnter}
            maxLength={8}
          />
        </div>

        <div className="input-group">
          <div className="password-field">
            <input
              className={`admin-input ${error ? "error-border" : ""}`}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={pass}
              onChange={handlePassword}
              onKeyDown={handleEnter}
              maxLength={34}
            />
            <span
              className="toggle-pass"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && <p className="error-message">{error}</p>}

        <button
          className="login-btn"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="admin-footer">
          <button
            className="back-btn"
            onClick={() => (window.location.href = "/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}