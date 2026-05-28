const express = require("express");
const router = express.Router();

const inquiryController = require("../controllers/inquiryController");
const { requireAuth } = require("../middleware/auth");
const { csrfProtection } = require("../middleware/csrf");

// PUBLIC: contact form submission
router.post("/inquiries", inquiryController.createInquiry);

// ADMIN ONLY: get all inquiries
router.get(
  "/admin/inquiries",
  csrfProtection,
  requireAuth,
  inquiryController.getAllInquiries
);

// ADMIN ONLY: delete inquiry
router.delete(
  "/admin/inquiries/:id",
  csrfProtection,
  requireAuth,
  inquiryController.deleteInquiry
);

module.exports = router;