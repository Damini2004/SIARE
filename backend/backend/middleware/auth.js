const { COOKIE_NAME, verifySession } = require('../utils/token');

async function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME] || getBearerToken(req);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    req.session = await verifySession(token);
    req.user = req.session.user;
    return next();
  } catch (_error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

async function optionalAuth(req, _res, next) {
  const token = req.cookies?.[COOKIE_NAME] || getBearerToken(req);

  if (token) {
    try {
      req.session = await verifySession(token);
      req.user = req.session.user;
    } catch (_error) {
      req.session = null;
      req.user = null;
    }
  }

  next();
}

function getBearerToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

module.exports = {
  optionalAuth,
  requireAuth,
};
