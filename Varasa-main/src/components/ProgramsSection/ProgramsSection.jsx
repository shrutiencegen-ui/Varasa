import React, { useEffect, useState } from "react";
import { getSection } from "../../api/contentApi";

export default function ProgramsSection() {
  const [programs, setPrograms] = useState([]);
  
  // LOCALHOST URL पोर्टसह
  const BASE_URL = "https://varasa-1.onrender.com/";

  useEffect(() => {
    async function load() {
      try {
        const data = await getSection("programs");
        setPrograms(data);
      } catch (error) {
        console.error("Error loading programs:", error);
      }
    }
    load();
  }, []);

  return (
    <section id="programs" className="programs-section">
      <h3 className="section-title">Programs</h3>

      <div className="events-grid">
        {programs.map(p => {
          // इमेज पाथ तयार करताना स्लॅश नीट तपासा
          const imagePath = p.img && (p.img.startsWith('/') ? p.img : `/${p.img}`);
          const fullImageUrl = p.img ? `${BASE_URL}${imagePath}` : null;

          return (
            <div className="event-card" key={p.id}>
              <div className="event-img-box">
                {p.img ? (
                  <img
                    src={fullImageUrl}
                    alt={p.title || "Program Image"}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                    }}
                  />
                ) : (
                  <div className="placeholder-box">No Image Available</div>
                )}
              </div>

              <div className="event-content">
                <h5>{p.title || "Untitled Program"}</h5>
                <p>{p.desc || "No description available."}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}