import React, { useEffect, useState } from "react";
import { getSection } from "../../api/contentApi";
import { getImageUrl } from "../../utils/image";
const IMG_BASE = "https://varasa-1.onrender.com";

function getImageUrl(path) {
  if (!path) return "";

  if (path.startsWith("http")) return path;

  return IMG_BASE + path;
}

export default function EventsSection() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSection("events");
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setEvents([]);
      }
    }

    load();
  }, []);

  return (
    <section id="events" className="events-section">
      <h3 className="section-title">Events</h3>

      <div className="events-grid">
        {events.map(e => (
          <div className="event-card" key={e.id}>
            {e.img && (
              <img
                src={getImageUrl(e.img)}
                alt={e.title}
              />
            )}

            <div className="event-content">
              <h5>{e.title}</h5>
              <p>{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}