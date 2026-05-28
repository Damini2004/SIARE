// src/api/publicationApi.js
// Conferences / Publications API — public + admin CRUD
import API from "./axios";

/**
 * Get list of conferences (public)
 * GET /api/conferences?featured=true&active=true&status=...&country=...
 */
export const getConferences = async (params = {}) => {
  const { data } = await API.get("/conferences", { params });
  return data; // { rows: [...], count: N }
};

/**
 * Get single conference detail (public)
 * GET /api/conferences/:id
 */
export const getConferenceById = async (id) => {
  const { data } = await API.get(`/conferences/${id}`);
  return data;
};

/**
 * Get featured conferences
 */
export const getFeaturedConferences = async () =>
  getConferences({ featured: "true", active: "true" });

// --- Admin APIs ---

export const createConference = async (payload) => {
  const { data } = await API.post("/admin/conferences", payload);
  return data;
};

export const updateConference = async (id, payload) => {
  const { data } = await API.put(`/admin/conferences/${id}`, payload);
  return data;
};

export const deleteConference = async (id) => {
  const { data } = await API.delete(`/admin/conferences/${id}`);
  return data;
};
