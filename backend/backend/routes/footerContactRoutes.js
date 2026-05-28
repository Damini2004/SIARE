const express = require("express");
const router = express.Router();

const footerContactController = require("../controllers/footerContactController");
const { requireAuth } = require("../middleware/auth");
const { csrfProtection } = require("../middleware/csrf");

// PUBLIC GET
router.get("/footer-contact", footerContactController.getFooterContacts);

// ADMIN ONLY
router.post(
  "/admin/footer-contact",
  csrfProtection,
  requireAuth,
  footerContactController.createFooterContact
);

router.put(
  "/admin/footer-contact/:id",
  csrfProtection,
  requireAuth,
  footerContactController.updateFooterContact
);

router.delete(
  "/admin/footer-contact/:id",
  csrfProtection,
  requireAuth,
  footerContactController.deleteFooterContact
);

module.exports = router;