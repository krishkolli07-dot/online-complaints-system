import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

  const { user } = useAuth();

  const [complaints, setComplaints] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchComplaints = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/complaints/my",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setComplaints(
        response.data.complaints || []
      );

    } catch (error) {

      console.error(
        "Dashboard error:",
        error
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const inProgress =
    complaints.filter(
      (c) =>
        c.status === "In Progress"
    ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <div className="dashboard-page">

      <div className="page-header">

        <div>
          <p className="section-label">
            USER DASHBOARD
          </p>

          <h1>
            Welcome, {user?.name} 👋
          </h1>

          <p>
            Here's an overview of your
            complaints.
          </p>
        </div>

        <Link
          to="/submit-complaint"
          className="primary-button"
        >
          + New Complaint
        </Link>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue">
            📋
          </div>

          <div>
            <span>Total Complaints</span>
            <strong>
              {loading ? "..." : complaints.length}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            ⏳
          </div>

          <div>
            <span>Pending</span>
            <strong>{pending}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            🔄
          </div>

          <div>
            <span>In Progress</span>
            <strong>{inProgress}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            ✓
          </div>

          <div>
            <span>Resolved</span>
            <strong>{resolved}</strong>
          </div>
        </div>

      </div>

      <div className="dashboard-actions">

        <div className="action-card">

          <div className="action-icon">
            📝
          </div>

          <div>
            <h2>Submit a Complaint</h2>

            <p>
              Report a new issue in your
              community.
            </p>
          </div>

          <Link
            to="/submit-complaint"
            className="outline-button"
          >
            Submit →
          </Link>

        </div>

        <div className="action-card">

          <div className="action-icon">
            🔎
          </div>

          <div>
            <h2>Track Complaints</h2>

            <p>
              View the current status of
              your complaints.
            </p>
          </div>

          <Link
            to="/my-complaints"
            className="outline-button"
          >
            View →
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;