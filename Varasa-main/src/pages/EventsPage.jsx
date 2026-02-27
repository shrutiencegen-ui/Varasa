import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { getSection } from "../api/contentApi";
import { getImageUrl } from "../utils/imageUtils";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSection("events");
        setEvents(Array.isArray(data) ? data : []);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  useEffect(() => {
    if (!events.length || paused) return;

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [events, paused]);

  const nextSlide = () => {
    setIndex(prev => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setIndex(prev => (prev - 1 + events.length) % events.length);
  };

  if (loading)
    return (
      <>
        <Header />
        <h2 className="loading-text">Loading Events...</h2>
      </>
    );

  if (!events.length)
    return (
      <>
        <Header />
        <h2 className="empty-text">🚧 Events Coming Soon</h2>
        <Footer />
      </>
    );

  const event = events[index];

  return (
    <>
      <Header />

     <section
  className="event-slider-section"
  onMouseEnter={() => setPaused(true)}
  onMouseLeave={() => setPaused(false)}
>

  <div className="event-feature-card fade-in">

    <div className="event-feature-image">
      {event.img && (
        <img
          src={getImageUrl(event.img)}
          alt={event.title}
        />
      )}
    </div>

    <div className="event-feature-content">
      <h2>{event.title}</h2>
      <p className="event-desc">{event.desc}</p>

      <div className="slider-buttons">
        <button onClick={prevSlide}>‹</button>
        <button onClick={nextSlide}>›</button>
      </div>

      <div className="slider-dots">
        {events.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

    </div>

  </div>

</section>

      <Footer />
    </>
  );
}