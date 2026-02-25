import React from "react";

import footerLogo from "../../assets/footerLogo.png";
export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo">
            <img src={footerLogo} alt="Varasa Logo" className="logo-img" />
            <p>
              {/* VW_078 & VW_079: Full Organization Name */}
              VĀRASĀ - Association for Cultural Heritage and Archaeology. 
              A non-profit organization dedicated to cultural heritage preservation, 
              archaeological research, and awareness initiatives. We work towards safeguarding tangibleand intangible heritage for future generations.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4> {/* VW_077: Proper Case */}
            <ul>
              <li><a href="/">Home</a></li> {/* VW_076: Added Home link */}
              <li><a href="#about">About Us</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#research">Research</a></li>
              <li><a href="#donate">Donate</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Details</h4>
            <p>
              {/* VW_079: Added 'Address:' label and full name */}
              <strong>Address:</strong> <br />
              Association for Cultural Heritage and Archaeology <br />
              A-903 Ruturang Society, behind Paranjape School, <br />
              Pune, Maharashtra – 411038, India
            </p>
            <p><strong>Phone:</strong> +91-9881409532</p>
            <p><strong>Email:</strong> varasa.acha@gmail.com</p>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="/">Facebook</a></li>
              <li><a href="/">Instagram</a></li>
              <li><a href="/">Twitter</a></li>
              <li><a href="/">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="footer-bottom-bar">
        <div className="footer-bottom">
          <span className="brand-highlight">VĀRASĀ</span> © 2025 Association for Cultural Heritage and Archaeology. {/* VW_080: Company Name Added */}
          <br /> All Rights Reserved | Designed by Laxman Dagade
        </div>
      </div>
    </>
  );
}