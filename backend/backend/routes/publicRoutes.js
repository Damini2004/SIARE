const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const adminController = require('../controllers/adminController');
const { contactLimiter } = require('../middleware/rateLimiters');
const { validateBody } = require('../middleware/validate');
const schemas = require('../validation/schemas');
const workshopDetailController = require('../controllers/workshopDetailController');
const webinarDetailController = require('../controllers/webinarDetailController');
const conferenceDetailController = require('../controllers/conferenceDetailController');

const router = express.Router();

router.get('/conferences', asyncHandler(adminController.conferences.list));
router.get('/conferences/:id', asyncHandler(adminController.conferences.detail));
router.get('/events', asyncHandler(adminController.events.list));
router.get('/events/:id', asyncHandler(adminController.events.detail));
router.get(
  '/conferences/:eventId/content',
  asyncHandler(conferenceDetailController.publicDetail)
);
router.get('/workshops/:eventId/content', asyncHandler(workshopDetailController.publicDetail));
router.get('/webinars/:eventId/content', asyncHandler(webinarDetailController.publicDetail));
router.get('/journals', asyncHandler(adminController.journals.list));
router.get('/journals/:id', asyncHandler(adminController.journals.detail));
router.get('/membership-tiers', asyncHandler(adminController.membershipTiers.list));
router.get('/membership-tiers/:id', asyncHandler(adminController.membershipTiers.detail));
router.get('/membershiptiers', asyncHandler(adminController.membershipTiers.list));
router.get('/membershiptiers/:id', asyncHandler(adminController.membershipTiers.detail));
router.get("/members", asyncHandler(adminController.members.list));
router.get('/pricing', asyncHandler(adminController.pricingPlans.list));
router.get('/pricing/:id', asyncHandler(adminController.pricingPlans.detail));
router.get('/pricingplans', asyncHandler(adminController.pricingPlans.list));
router.get('/pricingplans/:id', asyncHandler(adminController.pricingPlans.detail));
router.get('/inquiries', (_req, res) => {
  res.status(405).json({ error: 'Use GET /api/admin/inquiries after admin login' });
});
router.post('/inquiries', contactLimiter, validateBody(schemas.inquiry), asyncHandler(adminController.inquiries.create));

module.exports = router;
