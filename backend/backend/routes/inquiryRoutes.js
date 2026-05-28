const express = require("express");
const router = express.Router();

const inquiryController = require("../controllers/inquiryController");

const { requireAuth } = require("../middleware/auth");
const { csrfProtection } = require("../middleware/csrf");


// =========================
// PUBLIC ROUTE
// =========================

// Contact form submission
router.post(
  "/inquiries",
  inquiryController.createInquiry
);


// =========================
// ADMIN ROUTES
// =========================

// Get all inquiries
router.get(
  "/admin/inquiries",
  csrfProtection,
  requireAuth,
  inquiryController.getAllInquiries
);

// Get single inquiry
router.get(
  "/admin/inquiries/:id",
  csrfProtection,
  requireAuth,
  inquiryController.getInquiryById
);

// Update inquiry
router.put(
  "/admin/inquiries/:id",
  csrfProtection,
  requireAuth,
  inquiryController.updateInquiryStatus
);

// Delete inquiry
router.delete(
  "/admin/inquiries/:id",
  csrfProtection,
  requireAuth,
  inquiryController.deleteInquiry
);

module.exports = router;