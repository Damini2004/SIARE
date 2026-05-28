const express = require("express");
const router = express.Router();

const {
  publicDetail,
  adminDetail,
  upsert,
} = require("../controllers/webinarDetailController");

router.get("/webinars/:eventId/content", publicDetail);
router.get("/admin/webinars/:eventId/content", adminDetail);
router.put("/admin/webinars/:eventId/content", upsert);

module.exports = router;