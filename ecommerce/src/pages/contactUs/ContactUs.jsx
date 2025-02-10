import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Button, CircularProgress, Typography } from "@mui/material";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      // Show Thank You message for 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      {!submitted ? (
        <div className={styles.contactContainer}>
          <div className={styles.contactInfo}>
            <h2>Contact Us</h2>
            <p>We’d love to hear from you! Reach out to us anytime.</p>
            <div className={styles.contactDetails}>
              <p>
                <FaEnvelope className={styles.icon} /> support@ebazaar.com
              </p>
              <p>
                <FaPhoneAlt className={styles.icon} /> +19 234 567 8900
              </p>
              <p>
                <FaMapMarkerAlt className={styles.icon} /> Bengaluru, Karnataka,
                IN
              </p>
            </div>
          </div>

          <div className={styles.formContainer}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className={styles.textarea}
              ></textarea>
              <Button
                type="submit"
                className={styles.submitButton}
                variant="contained"
                color={loading ? "secondary" : "primary"}
                disabled={loading}
                sx={{
                  backgroundColor: loading ? "#aaa" : "#4a99e8",
                  "&:hover": { backgroundColor: loading ? "#aaa" : "#3a87d8" },
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "10px",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Typography
          className={styles.thankYouMessage}
          sx={{
            fontSize: { xs: 24, sm: 32, md: 40 },
            fontWeight: "bold",
            textAlign: "center",
            color: "#000",
          }}
          variant="h6"
        >
          Thank you for your Feedback 🙏🏼
        </Typography>
      )}
    </div>
  );
};

export default ContactUs;
