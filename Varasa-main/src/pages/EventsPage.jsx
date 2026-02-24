import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { getSection } from "../api/contentApi";
import "./EventsPage.css";

const BACKEND_URL = "https://varasa-backend.onrender.com";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  // 🔥 Fetch Events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getSection("events_page");
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load events", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // ⭐ Auto Slider with Pause
  useEffect(() => {
    if (!events.length || paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [events, paused]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="coming-section">
          <div className="coming-card">
            <h2>Loading Events...</h2>
          </div>
        </div>
      </>
    );
  }

  if (!events.length) {
    return (
      <>
        <Header />
        <div className="coming-section">
          <div className="coming-card">
            <h2>🚧 Events Coming Soon 🚧</h2>
            <p>Stay connected for upcoming cultural and heritage events.</p>
          </div>
        </div>
      </>
    );
  }

  const event = events[index];

  return (
    <>
      <Header />
      <section
        className="event-slider-section"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="event-feature-card fade-in" key={index}>
          {event.img && event.img !== "" && (
            <div className="event-feature-image">
              <img
                src={`${BACKEND_URL}${event.img}`}
                alt={event.title}
              />
            </div>
          )}

          <div className="event-feature-content">
            <h2>{event.title}</h2>
            <p className="event-desc">{event.desc}</p>

            <div className="event-meta">
              {event.date && <span>📅 {event.date}</span>}
              {event.location && <span>📍 {event.location}</span>}
            </div>
          </div>
        </div>

        {/* Slider Buttons */}
        <div className="slider-buttons">
          <button onClick={prevSlide}>‹</button>
          <button onClick={nextSlide}>›</button>
        </div>

        {/* Dots */}
        <div className="slider-dots">
          {events.map((_, i) => (
            <span
              key={i}
              className={i === index ? "dot active" : "dot"}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </section>
    </>
  );
}