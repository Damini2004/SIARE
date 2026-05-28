const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { COOKIE_NAME, SESSION_TTL_SECONDS, revokeSessionToken, signSession } = require('../utils/token');

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const admin = await Admin.findOne({ where: { email: String(email).toLowerCase().trim() } });
  const isValidPassword = admin ? await bcrypt.compare(password, admin.password) : false;

  if (!admin || !isValidPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = await signSession(admin);

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: SESSION_TTL_SECONDS * 1000,
    path: '/',
  });

  res.json({ success: true, user: { id: admin.id, email: admin.email, name: admin.name, role: admin.role } });
}

async function logout(req, res) {
  try {
    await revokeSessionToken(req.cookies?.[COOKIE_NAME] || getBearerToken(req));
  } catch (_error) {
    // Clearing the cookie is still useful even if the token is already invalid.
  }

  res.clearCookie(COOKIE_NAME, {
    path: '/',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({ success: true });
}

async function session(req, res) {
  res.json({ user: req.user || null });
}

function getBearerToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

module.exports = {
  login,
  logout,
  session,
};
