const Complaint = require("../models/Complaint");

// ==========================================
// CREATE COMPLAINT
// POST /api/complaints
// ==========================================

const createComplaint = async (req, res) => {
  try {
    console.log("1. Complaint request received");

    const {
      title,
      description,
      category,
      location,
      priority
    } = req.body;

    console.log("2. Request body:", req.body);

    // Check required fields
    if (!title || !description || !category || !location) {
      return res.status(400).json({
        message:
          "Please provide title, description, category and location"
      });
    }

    console.log("3. User from JWT:", req.user);

    // Create complaint
    const complaint = await Complaint.create({
      title,
      description,
      category,
      location,
      priority: priority || "Medium",
      user: req.user.userId
    });

    console.log("4. Complaint saved successfully");

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint
    });

  } catch (error) {
    console.error("Create complaint error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ==========================================
// GET MY COMPLAINTS
// GET /api/complaints/my
// ==========================================

const getMyComplaints = async (req, res) => {
  try {
    console.log(
      "Getting complaints for user:",
      req.user.userId
    );

    const complaints = await Complaint.find({
      user: req.user.userId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Complaints retrieved successfully",
      count: complaints.length,
      complaints
    });

  } catch (error) {
    console.error("Get complaints error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ==========================================
// GET ALL COMPLAINTS - ADMIN
// GET /api/complaints
// ==========================================

const getAllComplaints = async (req, res) => {
  try {
    console.log("Admin requesting all complaints");

    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All complaints retrieved successfully",
      count: complaints.length,
      complaints
    });

  } catch (error) {
    console.error("Get all complaints error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ==========================================
// UPDATE COMPLAINT - ADMIN
// PUT /api/complaints/:id
// ==========================================

const updateComplaint = async (req, res) => {
  try {
    const {
      status,
      priority,
      adminResponse
    } = req.body;

    // Find complaint
    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    // Update status if provided
    if (status !== undefined) {
      complaint.status = status;
    }

    // Update priority if provided
    if (priority !== undefined) {
      complaint.priority = priority;
    }

    // Update admin response if provided
    if (adminResponse !== undefined) {
      complaint.adminResponse = adminResponse;
    }

    // Save changes
    await complaint.save();

    // Get user information
    await complaint.populate(
      "user",
      "name email"
    );

    res.status(200).json({
      message: "Complaint updated successfully",
      complaint
    });

  } catch (error) {
    console.error("Update complaint error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ==========================================
// DELETE COMPLAINT
// DELETE /api/complaints/:id
// ==========================================

const deleteComplaint = async (req, res) => {
  try {
    // Find complaint
    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    // Admin can delete any complaint
    if (req.user.role === "admin") {
      await complaint.deleteOne();

      return res.status(200).json({
        message: "Complaint deleted successfully"
      });
    }

    // Normal user can delete only their own complaint
    if (
      complaint.user.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message:
          "You can only delete your own complaints"
      });
    }

    // Delete complaint
    await complaint.deleteOne();

    res.status(200).json({
      message: "Complaint deleted successfully"
    });

  } catch (error) {
    console.error("Delete complaint error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaint,
  deleteComplaint
};