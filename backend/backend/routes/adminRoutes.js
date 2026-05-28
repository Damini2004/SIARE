const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { requireAuth } = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const uploadController = require('../controllers/uploadController');
const authRoutes = require('./authRoutes');
const { validateBody } = require('../middleware/validate');
const { upload } = require('../middleware/upload');
const schemas = require('../validation/schemas');
const conferenceDetailController = require('../controllers/conferenceDetailController');
const workshopDetailController = require('../controllers/workshopDetailController');
const webinarDetailController = require('../controllers/webinarDetailController');

const router = express.Router();

router.use('/', authRoutes);
router.use(requireAuth);

router.post('/upload', upload.single('file'), uploadController.uploadFile);

router.route('/conferences')
  .get(asyncHandler(adminController.conferences.list))
  .post(validateBody(schemas.conference), asyncHandler(adminController.conferences.create));
router.route('/conferences/:id')
  .get(asyncHandler(adminController.conferences.detail))
  .put(validateBody(schemas.conference, { partial: true }), asyncHandler(adminController.conferences.update))
  .delete(asyncHandler(adminController.conferences.remove));

router.route('/events')
  .get(asyncHandler(adminController.events.list))
  .post(validateBody(schemas.event), asyncHandler(adminController.events.create));
router.route('/events/:id')
  .get(asyncHandler(adminController.events.detail))
  .put(validateBody(schemas.event, { partial: true }), asyncHandler(adminController.events.update))
  .delete(asyncHandler(adminController.events.remove));

router.get('/workshops/:eventId/content', asyncHandler(workshopDetailController.adminDetail));
router.put('/workshops/:eventId/content', validateBody(schemas.workshopDetail), asyncHandler(workshopDetailController.upsert));
router.get('/webinars/:eventId/content', asyncHandler(webinarDetailController.adminDetail));
router.put('/webinars/:eventId/content', validateBody(schemas.webinarDetail), asyncHandler(webinarDetailController.upsert));
router.get('/conferences/:eventId/content',asyncHandler(conferenceDetailController.adminDetail));
router.put('/conferences/:eventId/content',validateBody(schemas.conferenceDetail),asyncHandler(conferenceDetailController.upsert));

router.route('/inquiries')
  .get(asyncHandler(adminController.inquiries.list));
router.route('/inquiries/:id')
  .put(validateBody(schemas.inquiryStatus), asyncHandler(adminController.updateInquiryStatus))
  .delete(asyncHandler(adminController.inquiries.remove));

router.route('/journals')
  .get(asyncHandler(adminController.journals.list))
  .post(validateBody(schemas.journal), asyncHandler(adminController.journals.create));
router.route('/journals/:id')
  .put(validateBody(schemas.journal, { partial: true }), asyncHandler(adminController.journals.update))
  .delete(asyncHandler(adminController.journals.remove));

router.route('/members')
  .get(asyncHandler(adminController.members.list))
  .post(validateBody(schemas.member), asyncHandler(adminController.members.create));
router.route('/members/:id')
  .put(validateBody(schemas.member, { partial: true }), asyncHandler(adminController.members.update))
  .delete(asyncHandler(adminController.members.remove));

router.route('/membership-tiers')
  .get(asyncHandler(adminController.membershipTiers.list))
  .post(validateBody(schemas.membershipTier), asyncHandler(adminController.membershipTiers.create));
router.route('/membership-tiers/:id')
  .put(validateBody(schemas.membershipTier, { partial: true }), asyncHandler(adminController.membershipTiers.update))
  .delete(asyncHandler(adminController.membershipTiers.remove));
router.route('/membershiptiers')
  .get(asyncHandler(adminController.membershipTiers.list))
  .post(validateBody(schemas.membershipTier), asyncHandler(adminController.membershipTiers.create));
router.route('/membershiptiers/:id')
  .put(validateBody(schemas.membershipTier, { partial: true }), asyncHandler(adminController.membershipTiers.update))
  .delete(asyncHandler(adminController.membershipTiers.remove));

router.route('/pricing')
  .get(asyncHandler(adminController.pricingPlans.list))
  .post(validateBody(schemas.pricingPlan), asyncHandler(adminController.pricingPlans.create));
router.route('/pricing/:id')
  .put(validateBody(schemas.pricingPlan, { partial: true }), asyncHandler(adminController.pricingPlans.update))
  .delete(asyncHandler(adminController.pricingPlans.remove));
router.route('/pricingplans')
  .get(asyncHandler(adminController.pricingPlans.list))
  .post(validateBody(schemas.pricingPlan), asyncHandler(adminController.pricingPlans.create));
router.route('/pricingplans/:id')
  .put(validateBody(schemas.pricingPlan, { partial: true }), asyncHandler(adminController.pricingPlans.update))
  .delete(asyncHandler(adminController.pricingPlans.remove));

module.exports = router;
