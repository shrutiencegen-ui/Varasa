import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./AdminLogin.css";
import logoSymbol from "../assets/logo-symbol.png";

export default function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const USER_MAX = 30;
  const PASS_MIN = 8;
  const PASS_MAX = 12;

  const validate = () => {
    const newErrors = {};

    // Username validation
    if (!user.trim()) {
      newErrors.user = "Username is required";
    } else if (!/^[A-Za-z]+$/.test(user)) {
      newErrors.user = "Only alphabets allowed";
    } else if (user.length > USER_MAX) {
      newErrors.user = "Maximum 30 alphabets allowed";
    }

    // Password validation
    if (!pass.trim()) {
      newErrors.pass = "Password is required";
    } else if (pass.length < PASS_MIN || pass.length > PASS_MAX) {
      newErrors.pass = "Password must be 8 to 12 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch("https://varasa-1.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.trim(),
          password: pass.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ api: data.message || "Invalid credentials" });
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      window.location.href = "/admin-dashboard";
    } catch (err) {
      setErrors({ api: "Network error: Cannot connect to server" });
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
          <h2>Admin Log In</h2>
        </div>

        {/* Username */}
        <div className="input-group">
          <input
            className={`admin-input ${errors.user ? "error-border" : ""}`}
            placeholder="Username"
            value={user}
            maxLength={USER_MAX}
            onChange={(e) => setUser(e.target.value)}
            onKeyDown={handleEnter}
          />
          {errors.user && <p className="error-message">{errors.user}</p>}
        </div>

        {/* Password */}
        <div className="input-group">
          <div className="password-field">
            <input
              className={`admin-input ${errors.pass ? "error-border" : ""}`}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={pass}
              maxLength={PASS_MAX}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={handleEnter}
            />
            <span
              className="toggle-pass"
              onClick={() => setShowPass((prev) => !prev)}
            >
              {showPass ? (
                <AiOutlineEye size={22} color="#5a2d1a" />
              ) : (
                <AiOutlineEyeInvisible size={22} color="#5a2d1a" />
              )}
            </span>
          </div>
          {errors.pass && <p className="error-message">{errors.pass}</p>}
        </div>

        {/* API Error */}
        {errors.api && <p className="error-message">{errors.api}</p>}

        <button
          className="login-btn"
          onClick={login}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Logging in..." : " Log In "}
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