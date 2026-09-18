import React, {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const MyComplaints = () => {

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

  const filteredComplaints =
    complaints.filter((complaint) => {

      const matchesSearch =
        complaint.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        complaint.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        complaint.location
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

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
        <p>Loading complaints...</p>
      </div>
    );
  }

  return (
    <div className="complaints-page">

      <div className="page-header">

        <div>
          <p className="section-label">
            COMPLAINT HISTORY
          </p>

          <h1>My Complaints</h1>

          <p>
            Track and manage all your
            submitted complaints.
          </p>
        </div>

      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="filter-bar">

        <input
          type="text"
          placeholder="🔎 Search complaints..."
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
            {complaints.length === 0
              ? "You haven't submitted any complaints yet."
              : "Try changing your search or filter."}
          </p>

        </div>

      ) : (

        <div className="complaints-grid">

          {filteredComplaints.map(
            (complaint) => (

              <div
                className="complaint-card modern-card"
                key={complaint._id}
              >

                <div className="complaint-top">

                  <span
                    className={`status-badge ${complaint.status
                      .toLowerCase()
                      .replace(
                        " ",
                        "-"
                      )}`}
                  >
                    {complaint.status}
                  </span>

                  <span
                    className={`priority-badge ${complaint.priority.toLowerCase()}`}
                  >
                    {complaint.priority}
                  </span>

                </div>

                <h2>
                  {complaint.title}
                </h2>

                <p className="complaint-description">
                  {complaint.description}
                </p>

                <div className="complaint-info">

                  <p>
                    📁{" "}
                    <strong>
                      Category:
                    </strong>{" "}
                    {complaint.category}
                  </p>

                  <p>
                    📍{" "}
                    <strong>
                      Location:
                    </strong>{" "}
                    {complaint.location}
                  </p>

                  <p>
                    📅{" "}
                    <strong>
                      Submitted:
                    </strong>{" "}
                    {new Date(
                      complaint.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                {complaint.adminResponse && (
                  <div className="admin-response">

                    <strong>
                      💬 Admin Response
                    </strong>

                    <p>
                      {complaint.adminResponse}
                    </p>

                  </div>
                )}

                <button
                  className="delete-button"
                  onClick={() =>
                    deleteComplaint(
                      complaint._id
                    )
                  }
                >
                  Delete Complaint
                </button>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
};

export default MyComplaints;