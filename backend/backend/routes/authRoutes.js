const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { optionalAuth } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiters');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authLimiter, asyncHandler(authController.login));
router.post('/logout', asyncHandler(authController.logout));
router.get('/session', optionalAuth, asyncHandler(authController.session));

module.exports = router;
