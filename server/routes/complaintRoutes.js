const express = require("express");

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaint,
  deleteComplaint
} = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();


// ==========================================
// USER ROUTES
// ==========================================

// Create complaint
// POST /api/complaints
router.post(
  "/",
  protect,
  createComplaint
);


// Get logged-in user's complaints
// GET /api/complaints/my
router.get(
  "/my",
  protect,
  getMyComplaints
);


// ==========================================
// ADMIN ROUTES
// ==========================================

// Get all complaints
// GET /api/complaints
router.get(
  "/",
  protect,
  admin,
  getAllComplaints
);


// Update complaint
// PUT /api/complaints/:id
router.put(
  "/:id",
  protect,
  admin,
  updateComplaint
);


// ==========================================
// DELETE ROUTE
// ==========================================

// Delete complaint
// DELETE /api/complaints/:id
router.delete(
  "/:id",
  protect,
  deleteComplaint
);


module.exports = router;