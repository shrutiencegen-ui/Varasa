import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoSymbol from "../../assets/logo-symbol.jpg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 Hidden admin trigger logic
  const clickCount = useRef(0);
  const timer = useRef(null);

  const handleLogoClick = () => {
    clickCount.current += 1;

    if (clickCount.current === 3) {
      navigate("/admin-login"); // ✅ React Router navigation
    }

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 1500);
  };

  return (
    <header className="header">
      <div className="top-bar">
        <div className="top-bar-inner">
          <span className="brand-highlight">VĀRASĀ</span>
          Association for Cultural Heritage and Archaeology
        </div>
      </div>

      <div className="nav-bar">
        <div className="nav-inner container">
          <div className="logo-box">
            <img
              src={logoSymbol}
              alt="Varasa logo"
              onClick={handleLogoClick}
              style={{ cursor: "pointer" }}
            />
          </div>

          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

         <nav
  className={`nav-links ${menuOpen ? "open" : ""}`}
  aria-label="Main Navigation"
>
  <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
  <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
  <NavLink to="/events" onClick={() => setMenuOpen(false)}>Events</NavLink>
  <NavLink to="/research" onClick={() => setMenuOpen(false)}>Research</NavLink>
  <NavLink to="/donations" onClick={() => setMenuOpen(false)}>Donate/Grants</NavLink>
  <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</NavLink>
</nav>
        </div>
      </div>
    </header>
  );
}
