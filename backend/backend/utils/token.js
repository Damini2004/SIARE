const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');
const AdminSession = require('../models/AdminSession');

const COOKIE_NAME = 'admin_session';
const SESSION_TTL_SECONDS = 10 * 60;

function getJwtSecret() {
  if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is required');
  }

  return process.env.SESSION_SECRET;
}

async function signSession(admin) {
  const jti = randomUUID();
  const token = jwt.sign(
    {
      jti,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    },
    getJwtSecret(),
    { expiresIn: SESSION_TTL_SECONDS }
  );

  await AdminSession.create({
    jti,
    adminId: admin.id,
    expiresAt: new Date(Date.now() + SESSION_TTL_SECONDS * 1000),
  });

  return token;
}

async function verifySession(token) {
  const session = jwt.verify(token, getJwtSecret());
  const storedSession = session.jti
    ? await AdminSession.findOne({ where: { jti: session.jti } })
    : null;

  if (!storedSession || storedSession.revokedAt || storedSession.expiresAt <= new Date()) {
    throw new Error('Session has been revoked');
  }

  return session;
}

async function revokeSessionToken(token) {
  if (!token) return;

  const session = jwt.verify(token, getJwtSecret());

  if (session.jti) {
    await AdminSession.update(
      { revokedAt: new Date() },
      { where: { jti: session.jti, revokedAt: null } }
    );
  }
}

module.exports = {
  COOKIE_NAME,
  SESSION_TTL_SECONDS,
  signSession,
  verifySession,
  revokeSessionToken,
};
