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

  const login = async () => {
    setError("");

    // Basic Validation
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
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.access_token)
      localStorage.setItem("refreshToken", data.refresh_token)
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
            className={`admin-input ${error ? "error-border" : ""}`}
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onKeyDown={handleEnter}
          />
        </div>

        <div className="input-group">
          <div className="password-field" style={{ position: "relative" }}>
            <input
              className={`admin-input ${error ? "error-border" : ""}`}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={handleEnter}
            />
            <span
              className="toggle-pass"
              onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPass ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
        </div>

        {/* 🔴 ERROR MESSAGE */}
        {error && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
              marginTop: "10px",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {error}
          </p>
        )}

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
            onClick={() => (window.location.href = "/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}