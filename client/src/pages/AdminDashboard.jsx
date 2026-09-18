import React, {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AdminDashboard = () => {

  const [complaints, setComplaints] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchComplaints = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/complaints",
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

      setError(
        error.response?.data?.message ||
          "Failed to load complaints"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateComplaint = async (
    id,
    status,
    priority,
    adminResponse
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await api.put(
        `/complaints/${id}`,
        {
          status,
          priority,
          adminResponse,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      await fetchComplaints();

    } catch (error) {

      setError(
        error.response?.data?.message ||
          "Failed to update complaint"
      );

    }
  };

  const deleteComplaint = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this complaint?"
      );

    if (!confirmed) return;

    try {

      const token =
        localStorage.getItem("token");

      await api.delete(
        `/complaints/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setComplaints(
        complaints.filter(
          (complaint) =>
            complaint._id !== id
        )
      );

    } catch (error) {

      setError(
        error.response?.data?.message ||
          "Failed to delete complaint"
      );

    }
  };

  const total = complaints.length;

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

  const filteredComplaints =
    complaints.filter((complaint) => {

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        complaint.title
          .toLowerCase()
          .includes(searchText) ||
        complaint.description
          .toLowerCase()
          .includes(searchText) ||
        complaint.location
          .toLowerCase()
          .includes(searchText) ||
        complaint.user?.name
          ?.toLowerCase()
          .includes(searchText) ||
        complaint.user?.email
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>
        <p>
          Loading admin dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="admin-page">

      <div className="page-header">

        <div>

          <p className="section-label">
            ADMIN PANEL
          </p>

          <h1>
            Complaint Management
          </h1>

          <p>
            Review, update and manage
            complaints.
          </p>

        </div>

      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon blue">
            📋
          </div>

          <div>
            <span>Total</span>
            <strong>{total}</strong>
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

      <div className="filter-bar">

        <input
          type="text"
          placeholder="🔎 Search by title, user, email or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >

          <option value="All">
            All Statuses
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Resolved">
            Resolved
          </option>

          <option value="Rejected">
            Rejected
          </option>

        </select>

      </div>

      {filteredComplaints.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            📋
          </div>

          <h2>
            No complaints found
          </h2>

          <p>
            There are no complaints matching
            your filters.
          </p>

        </div>

      ) : (

        <div className="admin-complaints">

          {filteredComplaints.map(
            (complaint) => (

              <AdminComplaintCard
                key={complaint._id}
                complaint={complaint}
                onUpdate={
                  updateComplaint
                }
                onDelete={
                  deleteComplaint
                }
              />

            )
          )}

        </div>

      )}

    </div>
  );
};

const AdminComplaintCard = ({
  complaint,
  onUpdate,
  onDelete,
}) => {

  const [status, setStatus] =
    useState(complaint.status);

  const [priority, setPriority] =
    useState(complaint.priority);

  const [adminResponse, setAdminResponse] =
    useState(
      complaint.adminResponse || ""
    );

  const [updating, setUpdating] =
    useState(false);

  const handleUpdate = async () => {

    setUpdating(true);

    await onUpdate(
      complaint._id,
      status,
      priority,
      adminResponse
    );

    setUpdating(false);
  };

  return (
    <div className="admin-complaint-card">

      <div className="admin-card-header">

        <div>

          <span className="complaint-id">
            #{complaint._id.slice(-6)}
          </span>

          <h2>
            {complaint.title}
          </h2>

        </div>

        <span
          className={`status-badge ${status
            .toLowerCase()
            .replace(
              " ",
              "-"
            )}`}
        >
          {status}
        </span>

      </div>

      <div className="user-details">

        <div>
          <strong>
            👤 User
          </strong>

          <span>
            {complaint.user?.name ||
              "Unknown"}
          </span>
        </div>

        <div>
          <strong>
            ✉ Email
          </strong>

          <span>
            {complaint.user?.email ||
              "Unknown"}
          </span>
        </div>

        <div>
          <strong>
            📁 Category
          </strong>

          <span>
            {complaint.category}
          </span>
        </div>

        <div>
          <strong>
            📍 Location
          </strong>

          <span>
            {complaint.location}
          </span>
        </div>

      </div>

      <div className="admin-description">

        <strong>
          Description
        </strong>

        <p>
          {complaint.description}
        </p>

      </div>

      <div className="admin-controls">

        <div className="form-group">

          <label>Status</label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Resolved">
              Resolved
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

        </div>

        <div className="form-group">

          <label>Priority</label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
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
          Admin Response
        </label>

        <textarea
          value={adminResponse}
          onChange={(e) =>
            setAdminResponse(
              e.target.value
            )
          }
          placeholder="Write a response to the user..."
          rows="4"
        />

      </div>

      <div className="admin-actions">

        <button
          className="primary-button"
          onClick={handleUpdate}
          disabled={updating}
        >
          {updating
            ? "Updating..."
            : "✓ Update Complaint"}
        </button>

        <button
          className="delete-button"
          onClick={() =>
            onDelete(complaint._id)
          }
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default AdminDashboard;