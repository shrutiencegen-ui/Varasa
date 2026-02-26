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

  // Validation Limits
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 15;

  const login = async () => {
    setError("");

    // 1. Basic Empty Validation
    if (!user.trim() || !pass.trim()) {
      setError("Username and Password are required");
      return;
    }

    // 2. Length Validation for Username
    if (user.length < MIN_LENGTH || user.length > MAX_LENGTH) {
      setError(`Username must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters`);
      return;
    }

    // 3. Length Validation for Password
    if (pass.length < MIN_LENGTH || pass.length > MAX_LENGTH) {
      setError(`Password must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters`);
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
        // Backend कडून येणारा एरर मेसेज (उदा. Wrong password)
        setError(data.message || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      // Success
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
            style={{ width: "80px", marginBottom: "15px" }}
          />
          <h2>Admin Login</h2>
        </div>

        <div className="input-group">
          <input
            className={`admin-input ${error.includes("Username") ? "error-border" : ""}`}
            placeholder="Username"
            value={user}
            maxLength={MAX_LENGTH + 1} // Limit typing
            onChange={(e) => setUser(e.target.value)}
            onKeyDown={handleEnter}
          />
        </div>

        <div className="input-group">
          <div className="password-field" style={{ position: "relative" }}>
            <input
              className={`admin-input ${error.includes("Password") || error.includes("credentials") ? "error-border" : ""}`}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={pass}
              maxLength={MAX_LENGTH + 1} // Limit typing
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={handleEnter}
            />
            <span
              className="toggle-pass"
              onClick={() => setShowPass((prev) => !prev)}
            >
              {/* Logic Fix: Visible = Eye Open, Hidden = Eye Invisible */}
              {showPass ? <AiOutlineEye size={22} color="#5a2d1a" /> : <AiOutlineEyeInvisible size={22} color="#ccc" />}
            </span>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          className="login-btn"
          onClick={login}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="admin-footer" style={{ marginTop: "20px" }}>
          <button
            className="back-btn"
            style={{ background: "none", border: "none", color: "#5a2d1a", cursor: "pointer", fontFamily: 'Cinzel' }}
            onClick={() => (window.location.href = "/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
