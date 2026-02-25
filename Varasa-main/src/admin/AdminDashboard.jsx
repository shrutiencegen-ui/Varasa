import React, { useEffect, useState } from "react";
import {
  getSection,
  createItem,
  updateItem,
  deleteItem as deleteAPI,
  uploadImage
} from "../api/contentApi";
import "./admin.css";
import logoSymbol from "../assets/logo-symbol.png";

const IMG_BASE_URL = "https://varasa-1.onrender.com";
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const pageSections = {
  home: [
    { key: "programs", label: "Programs (Home)", limit: 4 },
    { key: "events", label: "Events (Home)", limit: 4 },
    { key: "researchHome", label: "Research Highlights (Home)", limit: 4 }
  ],
  research: [
    { key: "research_publications", label: "Publications", limit: 4 },
    { key: "research_seminars", label: "Learning & Seminars", limit: 4 },
    { key: "research_training", label: "Training & Workshop", limit: 4 }
  ],
  eventsPage: [
    { key: "events_page", label: "Events Page Slider", limit: 10 }
  ],
  about: [
    { key: "about_team", label: "About Page – Team Members", limit: 8 }
  ]
};

export default function AdminDashboard() {
  const [page, setPage] = useState("home");
  const [section, setSection] = useState("programs");
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    title: "",
    desc: "",
    img: "",
    date: ""
  });

  const currentSectionObj = pageSections[page].find(sec => sec.key === section);
  const cardLimit = currentSectionObj?.limit || 4;

  const isEventSection =
    section === "events" || section === "events_page";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/admin-login";
  }, []);

  useEffect(() => {
    setSection(pageSections[page][0].key);
    setSelected(null);
    setPreviewOpen(false);
  }, [page]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSection(section);
        setItems(data || []);
      } catch {
        alert("Failed to load data.");
      }
    }
    load();
  }, [section]);

  const validateFields = () => {
    let errors = { title: "", desc: "", img: "", date: "" };
    let valid = true;

    if (!selected.title?.trim()) {
      errors.title = "Title is required";
      valid = false;
    }

    if (!selected.desc?.trim()) {
      errors.desc = "Description is required";
      valid = false;
    }

    if (!selected.img) {
      errors.img = "Image is required";
      valid = false;
    }

    if (isEventSection && !selected.date) {
      errors.date = "Date is required";
      valid = false;
    }

    setFieldErrors(errors);
    return valid;
  };

  const addNew = async () => {
    if (items.length >= cardLimit) {
      alert(`Limit reached! Only ${cardLimit} cards allowed.`);
      return;
    }

    await createItem(section, {
      title: "",
      desc: "",
      img: "",
      date: ""
    });

    const refreshed = await getSection(section);
    setItems(refreshed);
  };

  const deleteItem = async id => {
    if (window.confirm("Are you sure?")) {
      await deleteAPI(id);
      const refreshed = await getSection(section);
      setItems(refreshed);
      setSelected(null);
      setPreviewOpen(false);
    }
  };

  const saveItem = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      await updateItem(selected.id, selected);
      const refreshed = await getSection(section);
      setItems(refreshed);
      alert("Saved successfully!");
    } catch {
      alert("Save failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div>
          <div className="admin-logo-box">
            <img src={logoSymbol} alt="Logo" />
          </div>

          <button
            className="back-btn"
            onClick={() => (window.location.href = "/")}
          >
            Back to Website
          </button>

          <h3>Content Manager</h3>

          <label>Select Page</label>
          <select value={page} onChange={e => setPage(e.target.value)}>
            <option value="home">Home</option>
            <option value="about">About</option>
            <option value="research">Research</option>
            <option value="eventsPage">Events Page</option>
          </select>

          <label>Select Section</label>
          <select value={section} onChange={e => setSection(e.target.value)}>
            {pageSections[page].map(sec => (
              <option key={sec.key} value={sec.key}>
                {sec.label}
              </option>
            ))}
          </select>

          <div className="card-limit">
            Cards: {items.length}/{cardLimit}
          </div>

          <button
            onClick={addNew}
            className="admin-add-btn"
            disabled={items.length >= cardLimit}
          >
            {items.length >= cardLimit ? "Limit Reached" : "+ Add New Card"}
          </button>

          <ul className="admin-list">
            {items.map(item => (
              <li
                key={item.id}
                className={selected?.id === item.id ? "active" : ""}
              >
                <span onClick={() => setSelected(item)}>
                  {item.title || "Untitled"}
                </span>
                <button onClick={() => deleteItem(item.id)}>🗑</button>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/admin-login";
          }}
        >
          Logout
        </button>
      </div>

      <div className="admin-editor">
        {selected ? (
          <div className="editor-card">
            <h3>Edit Card</h3>

            <label>Title</label>
            <input
              value={selected.title || ""}
              onChange={e =>
                setSelected({ ...selected, title: e.target.value })
              }
            />
            {fieldErrors.title && (
              <p className="field-error">{fieldErrors.title}</p>
            )}

            <label>Description</label>
            <textarea
              value={selected.desc || ""}
              onChange={e =>
                setSelected({ ...selected, desc: e.target.value })
              }
            />
            {fieldErrors.desc && (
              <p className="field-error">{fieldErrors.desc}</p>
            )}

            {/* 🔥 Date Picker Only For Events */}
            {isEventSection && (
              <>
                <label>Select Event Date</label>
                <input
                  type="date"
                  value={selected.date || ""}
                  onChange={e =>
                    setSelected({ ...selected, date: e.target.value })
                  }
                  onKeyDown={e => e.preventDefault()}
                />
                {fieldErrors.date && (
                  <p className="field-error">{fieldErrors.date}</p>
                )}
              </>
            )}

            <label>Upload Image (Max 2MB)</label>

            <input
              type="file"
              accept="image/*"
              onChange={async e => {
                const file = e.target.files[0];
                if (!file) return;

                if (file.size > MAX_IMAGE_SIZE) {
                  setFieldErrors(prev => ({
                    ...prev,
                    img: "Image must be under 2MB"
                  }));
                  return;
                }

                const url = await uploadImage(file);
                setSelected({ ...selected, img: url });
                setFieldErrors(prev => ({ ...prev, img: "" }));
              }}
            />

            <button
              className="save-btn"
              onClick={saveItem}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <div className="empty-state">
            <h3>Select a card to edit</h3>
          </div>
        )}
      </div>
    </div>
  );
}