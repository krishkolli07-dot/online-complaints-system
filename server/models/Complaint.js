const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    // Complaint title
    title: {
      type: String,
      required: true,
      trim: true
    },

    // Complaint description
    description: {
      type: String,
      required: true,
      trim: true
    },

    // Complaint category
    category: {
      type: String,
      required: true,
      enum: [
        "Roads",
        "Water",
        "Electricity",
        "Sanitation",
        "Public Safety",
        "Other"
      ]
    },

    // Complaint location
    location: {
      type: String,
      required: true,
      trim: true
    },

    // Complaint status
    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved",
        "Rejected"
      ],
      default: "Pending"
    },

    // Complaint priority
    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High"
      ],
      default: "Medium"
    },

    // User who submitted complaint
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Admin response
    adminResponse: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Complaint = mongoose.model(
  "Complaint",
  complaintSchema
);

module.exports = Complaint;