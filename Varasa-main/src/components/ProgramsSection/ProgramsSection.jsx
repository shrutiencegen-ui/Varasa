import React, { useEffect, useState } from "react";
import { getSection } from "../../api/contentApi";

export default function ProgramsSection() {
  const [programs, setPrograms] = useState([]);
  
  

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
      <h3 className="section-title">Projects</h3>

      <div className="events-grid">
        {programs.map(p => (
  <div className="event-card" key={p.id}>
    <div className="event-img-box">
      {p.img ? (
        <img
          src={p.img}
          alt={p.title || "Program Image"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/300x200?text=Image+Not+Found";
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
))}
      </div>
    </section>
  );
}