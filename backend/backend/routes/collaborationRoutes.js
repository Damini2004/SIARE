const express = require("express");
const router = express.Router();
const collaborationController = require("../controllers/collaborationController");

router.get("/collaborations", collaborationController.getAllCollaborations);
router.post("/collaborations", collaborationController.createCollaboration);
router.put("/collaborations/:id", collaborationController.updateCollaboration);
router.delete("/collaborations/:id", collaborationController.deleteCollaboration);

module.exports = router;