import React from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!user) {
      navigate("/register");
    } else if (
      user.role === "admin"
    ) {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="home-page">

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            🏛️ Smart Complaint Management
          </div>

          <h1>
            Report Problems.
            <br />
            <span>Get Them Resolved.</span>
          </h1>

          <p>
            A simple and transparent platform
            to submit complaints, track their
            progress, and communicate with
            administrators.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={handleGetStarted}
            >
              {user
                ? "Go to Dashboard"
                : "Get Started →"}
            </button>

            {!user && (
              <Link
                to="/login"
                className="secondary-button"
              >
                Sign In
              </Link>
            )}

          </div>

        </div>

        <div className="hero-card">

          <div className="hero-card-icon">
            ✓
          </div>

          <h3>Complaint Tracking</h3>

          <p>
            Stay updated on every complaint
            you submit.
          </p>

          <div className="mini-status">
            <span>●</span>
            In Progress
          </div>

          <div className="mini-status resolved">
            <span>●</span>
            Resolved
          </div>

        </div>

      </section>

      <section className="features-section">

        <div className="section-heading">
          <p className="section-label">
            HOW IT WORKS
          </p>

          <h2>
            Simple. Transparent. Efficient.
          </h2>

          <p>
            Everything you need to manage
            complaints in one place.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">
              📝
            </div>

            <h3>Submit Complaint</h3>

            <p>
              Quickly report issues with
              detailed information and
              location.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              🔎
            </div>

            <h3>Track Progress</h3>

            <p>
              Monitor your complaint status
              from submission to resolution.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              💬
            </div>

            <h3>Get Responses</h3>

            <p>
              Receive responses and updates
              from administrators.
            </p>
          </div>

        </div>

      </section>

      <section className="cta-section">

        <h2>
          Have a problem to report?
        </h2>

        <p>
          Help improve your community by
          reporting issues today.
        </p>

        <button
          className="primary-button"
          onClick={handleGetStarted}
        >
          Submit a Complaint →
        </button>

      </section>

      <footer className="footer">
        <p>
          © 2026 ComplaintCare. Online
          Complaints Management System.
        </p>
      </footer>

    </div>
  );
};

export default Home;