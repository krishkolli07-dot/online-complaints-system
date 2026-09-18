import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

const SubmitComplaint = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      category: "Roads",
      location: "",
      priority: "Medium",
    });

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.post(
          "/complaints",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setMessage(
        response.data.message
      );

      setFormData({
        title: "",
        description: "",
        category: "Roads",
        location: "",
        priority: "Medium",
      });

      setTimeout(() => {
        navigate("/my-complaints");
      }, 1200);

    } catch (error) {

      setError(
        error.response?.data?.message ||
          "Failed to submit complaint"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">

      <div className="form-header">

        <p className="section-label">
          REPORT AN ISSUE
        </p>

        <h1>Submit a Complaint</h1>

        <p>
          Provide accurate information so
          the issue can be reviewed quickly.
        </p>

      </div>

      <div className="complaint-form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Complaint Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Street light not working"
              required
            />

          </div>

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the problem in detail..."
              rows="6"
              required
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >

                <option value="Roads">
                  Roads
                </option>

                <option value="Water">
                  Water
                </option>

                <option value="Electricity">
                  Electricity
                </option>

                <option value="Sanitation">
                  Sanitation
                </option>

                <option value="Public Safety">
                  Public Safety
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

              </select>

            </div>

          </div>

          <div className="form-group">

            <label>
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the location of the issue"
              required
            />

          </div>

          <button
            type="submit"
            className="primary-button full-button"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Complaint →"}
          </button>

        </form>

        {message && (
          <div className="success-message">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

      </div>

    </div>
  );
};

export default SubmitComplaint;