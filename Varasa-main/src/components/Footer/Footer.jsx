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
            
              <span className="brand-namee">
            V<span className="macroon">A</span>RAS<span className="macroon">A</span>
            </span> - Association for Cultural Heritage and Archaeology. 
              A non-profit organization dedicated to cultural heritage preservation, 
              archaeological research, and awareness initiatives. We work towards safeguarding tangibleand intangible heritage for future generations.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4> 
            <ul>
              <li><a href="/">Home</a></li> 
              <li><a href="/about">About Us</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/research">Research</a></li>
              <li><a href="/donations">Donate</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Details</h4>
            <p>
             
              <strong>Address:</strong> <br />
                Varasa - Association for Cultural Heritage and Archaeology <br />
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
          <span className="brand-name">
            V<span className="macron">A</span>RAS<span className="macron">A</span>
            </span> © 2025 Association for Cultural Heritage and Archaeology. {/* VW_080: Company Name Added */}
          <br /> All Rights Reserved | Designed by Laxman Dagade
        </div>
      </div>
    </>
  );
}