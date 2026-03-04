import React, { useState } from "react";
import "./ContactPage.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import logoSymbol from "../assets/logo-symbol.jpg";
import bg from "../assets/heritageBg.png";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateField = (key, value) => {
    let error = "";

    if (key === "fullName") {
      if (!value) error = "Full Name is required";
      else if (!/^[a-zA-Z\s]*$/.test(value))
        error = "Only alphabets are allowed";
      else if (value.length > 50)
        error = "Maximum 50 characters allowed";
    }

    if (key === "email") {
      if (!value) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value))
        error = "Invalid email format";
    }

    if (key === "phone") {
      if (!value) error = "Phone number is required";
      else if (!/^\d*$/.test(value))
        error = "Only numbers allowed";
      else if (value.length !== 10)
        error = "Phone number must be 10 digits";
    }

    if (key === "message") {
      if (!value) error = "Message cannot be empty";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", formData);

      setSuccess(true);

      // Optional: reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      setSuccess(false);
    }
  };

  return (
    <>
      <Header />
      <section className="contact-page">
        <div className="contact-card">
          <div className="contact-top">
            <img
              src={logoSymbol}
              alt="Varasa Logo"
              className="contact-logo"
            />
            <p className="contact-subtitle">
              Association for Cultural Heritage and Archaeology
            </p>
          </div>

          <div className="contact-title-bar">Contact Us</div>

          <div className="contact-content">
            <div
              className="contact-left"
              style={{ backgroundImage: `url(${bg})` }}
            >
              <div className="contact-left-circle">
                <h2>Experience Varasa’s</h2>
                <p>Research & Knowledge Corner</p>
                <p>Cultural Heritage & Archaeology</p>
              </div>
            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <span className="error-text">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                />
                {errors.email && (
                  <span className="error-text">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 digit number"
                  maxLength="10"
                />
                {errors.phone && (
                  <span className="error-text">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                ></textarea>
                {errors.message && (
                  <span className="error-text">
                    {errors.message}
                  </span>
                )}
              </div>

              <p className="privacy-note">
                * I consent to the processing of my personal data (Privacy Policy)
              </p>

              <button type="submit" className="submit-btn">
                SUBMIT
              </button>

              {success && (
                <p className="success-text">
                  ✅ Thank you! Your message has been sent.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}