// src/api/userApi.js
// Members API — admin-only CRUD (requires auth)
import API from "./axios";

/**
 * Get list of members (admin)
 * GET /api/admin/members?status=active&tier=...
 */
export const getMembers = async (params = {}) => {
  const { data } = await API.get("/admin/members", { params });
  return data; // { rows: [...], count: N }
};

/**
 * Get single member (admin)
 * GET /api/admin/members/:id
 */
export const getMemberById = async (id) => {
  const { data } = await API.get(`/admin/members/${id}`);
  return data;
};

/**
 * Create member (admin)
 * POST /api/admin/members
 */
export const createMember = async (payload) => {
  const { data } = await API.post("/admin/members", payload);
  return data;
};

/**
 * Update member (admin)
 * PUT /api/admin/members/:id
 */
export const updateMember = async (id, payload) => {
  const { data } = await API.put(`/admin/members/${id}`, payload);
  return data;
};

/**
 * Delete member (admin)
 * DELETE /api/admin/members/:id
 */
export const deleteMember = async (id) => {
  const { data } = await API.delete(`/admin/members/${id}`);
  return data;
};

/**
 * Get inquiries list (admin)
 * GET /api/admin/inquiries
 */
export const getInquiries = async (params = {}) => {
  const { data } = await API.get("/admin/inquiries", { params });
  return data;
};

/**
 * Update inquiry status (admin)
 * PUT /api/admin/inquiries/:id
 */
export const updateInquiryStatus = async (id, status) => {
  const { data } = await API.put(`/admin/inquiries/${id}`, { status });
  return data;
};

/**
 * Delete inquiry (admin)
 * DELETE /api/admin/inquiries/:id
 */
export const deleteInquiry = async (id) => {
  const { data } = await API.delete(`/admin/inquiries/${id}`);
  return data;
};
