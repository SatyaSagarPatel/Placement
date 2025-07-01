import React, { useEffect, useState } from "react";
import axios from "axios";

function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    city: "",
  });
  const [subscriptionEmail, setSubscriptionEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data));
    axios
      .get("http://localhost:5000/api/clients")
      .then((res) => setClients(res.data));
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/contacts", contactForm)
      .then(() => alert("Contact submitted"))
      .catch(() => alert("Error submitting contact"));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/subscriptions", {
        email: subscriptionEmail,
      })
      .then(() => alert("Subscribed"))
      .catch(() => alert("Subscription failed"));
  };

  return (
    <div>
      <section className="contact-section">
        <div className="contact-bg-image"></div>
        <div className="contact-form-container">
          <h2 className="contact-title">Get a Free Consultation</h2>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={contactForm.fullName}
              onChange={(e) =>
                setContactForm({ ...contactForm, fullName: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={contactForm.email}
              onChange={(e) =>
                setContactForm({ ...contactForm, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Mobile Number"
              required
              value={contactForm.mobileNumber}
              onChange={(e) =>
                setContactForm({ ...contactForm, mobileNumber: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              required
              value={contactForm.city}
              onChange={(e) =>
                setContactForm({ ...contactForm, city: e.target.value })
              }
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>

      <section className="projects-section">
        <h2 className="projects-title">Our Projects</h2>
        <p className="projects-subtitle">
          We know what buyers are looking for and suggest projects that will
          bring clients top dollar for the sale of their homes.
        </p>
        <div className="projects-grid">
          {projects.map((p) => (
            <div className="project-card" key={p._id}>
              <img
                className="project-image"
                src={`http://localhost:5000${p.imageUrl}`}
                alt={p.name}
              />
              <div className="project-info">
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.description}</p>
                <button className="project-btn" disabled>
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="clients-section">
        <h2 className="clients-title">Happy Clients</h2>
        <div className="clients-grid">
          {clients.map((c) => (
            <div className="client-card" key={c._id}>
              <img
                className="client-avatar"
                src={`http://localhost:5000${c.imageUrl}`}
                alt={c.name}
              />
              <p className="client-desc">{c.description}</p>
              <div className="client-name">{c.name}</div>
              <div className="client-designation">{c.designation}</div>
            </div>
          ))}
        </div>
      </section>

      {/* <h2>Contact Us</h2>
      <form onSubmit={handleContactSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={contactForm.fullName}
          onChange={(e) =>
            setContactForm({ ...contactForm, fullName: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={contactForm.email}
          onChange={(e) =>
            setContactForm({ ...contactForm, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Mobile Number"
          required
          value={contactForm.mobileNumber}
          onChange={(e) =>
            setContactForm({ ...contactForm, mobileNumber: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="City"
          required
          value={contactForm.city}
          onChange={(e) =>
            setContactForm({ ...contactForm, city: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form> */}
      <footer>
        <div className="landing-header-image">
          <img
            src="/images/Rectangle.svg"
            alt="Landing Header"
            className="header-img"
          />
        </div>

        <div className="newsletter-bar">
          <nav className="newsletter-nav">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
            <span className="subscribe-label">Subscribe Us</span>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter Email Address"
                required
                value={subscriptionEmail}
                onChange={(e) => setSubscriptionEmail(e.target.value)}
              />
              <button type="submit">Subscribe</button>
            </form>
          </nav>
        </div>
        <div className="footer-navbar">
          <div className="footer-left">© 2025 Your Company</div>
          <div className="footer-center">
            <img src="/images/logo.svg" alt="Logo" className="footer-logo" />
            {/* Replace /logo192.png with your actual logo path */}
          </div>
          <div className="footer-right">
            <img
              src="/images/Group-1.svg"
              alt="Icon 1"
              className="footer-icon"
            />
            <img src="/images/Group.svg" alt="Icon 2" className="footer-icon" />
            <img src="/images/Frame.svg" alt="Icon 3" className="footer-icon" />
            <img
              src="/images/Linkedin.svg"
              alt="Icon 4"
              className="footer-icon"
            />
            {/* Replace /iconX.png with your actual icon paths */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
