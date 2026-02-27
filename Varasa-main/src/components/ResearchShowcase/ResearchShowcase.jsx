import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import  {getSection} from "../../api/contentApi";
import { getImageUrl } from "../../utils/imageUtils";
import "./ResearchShowcase.css";  


export default function ResearchShowcase() {
  const [publications, setPublications] = useState([]);
  const [seminars, setSeminars] = useState([]);
  const [training, setTraining] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      try {
        const pub = await getSection("research_publications");
        const sem = await getSection("research_seminars");
        const train = await getSection("research_training");

        setPublications(Array.isArray(pub) ? pub : []);
        setSeminars(Array.isArray(sem) ? sem : []);
        setTraining(Array.isArray(train) ? train : []);
      } catch {
        setPublications([]);
        setSeminars([]);
        setTraining([]);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  const sections = [
    { title: "Publications", items: publications },
    { title: "Learning & Seminars", items: seminars },
    { title: "Training & Workshop", items: training }
  ];

  if (loading)
    return <h2 className="loading-text">Loading Research...</h2>;

  return (
    <>
      <Header />

      <section className="research-showcase-section">
        <div className="research-showcase-container">

          {sections.map((sec, index) => (
            <div key={index} className="showcase-block">

              <h3 className="showcase-title">{sec.title}</h3>

              <div className="showcase-grid">
                {Array.isArray(sec.items) && sec.items.map(item => (
                  <div key={item.id} className="showcase-card">

                    {item.img && (
                      <img
                        src={getImageUrl(item.img)}
                        alt={item.title}
                        className="showcase-img"
                      />
                    )}

                    <div className="showcase-content">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>

                      {sec.title === "Publications" && (item.author || item.year) && (
                        <p className="showcase-meta">
                          {item.author && <>Author: {item.author}</>}
                          {item.author && item.year && " | "}
                          {item.year && <>Year: {item.year}</>}
                        </p>
                      )}

                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      </section>

      <Footer />
    </>
  );
}