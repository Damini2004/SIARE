const { randomBytes, timingSafeEqual } = require('crypto');
const { SESSION_TTL_SECONDS } = require('../utils/token');

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    httpOnly: false,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: SESSION_TTL_SECONDS * 1000,
    path: '/',
  };
}

function createCsrfToken() {
  return randomBytes(32).toString('hex');
}

function issueCsrfToken(_req, res) {
  const token = createCsrfToken();

  res.cookie(CSRF_COOKIE_NAME, token, getCookieOptions());
  res.json({ csrfToken: token });
}

function csrfProtection(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const cookieToken = req.cookies?.[CSRF_COOKIE_NAME];
  const headerToken = req.get(CSRF_HEADER_NAME);

  if (!cookieToken || !headerToken || !safeEquals(cookieToken, headerToken)) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  return next();
}

function safeEquals(a, b) {
  const aBuffer = Buffer.from(String(a));
  const bBuffer = Buffer.from(String(b));

  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}

module.exports = {
  issueCsrfToken,
  csrfProtection,
};
