// src/api/authApi.js
// Authentication API — login, logout, session check
import API from "./axios";

/**
 * Login admin user
 * POST /api/admin/login
 */
export const login = async ({ email, password }) => {
  const { data } = await API.post("/admin/login", { email, password });
  return data; // { success, user: { id, email, name, role } }
};

/**
 * Logout admin user
 * POST /api/admin/logout
 */
export const logout = async () => {
  const { data } = await API.post("/admin/logout");
  return data;
};

/**
 * Check current session
 * GET /api/admin/session
 */
export const getSession = async () => {
  const { data } = await API.get("/admin/session");
  return data; // { user: { ... } | null }
};
