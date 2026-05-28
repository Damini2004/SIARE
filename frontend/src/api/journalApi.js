// src/api/journalApi.js
// Journals API — public + admin CRUD
import API from "./axios";

/**
 * Get list of journals (public)
 * GET /api/journals?featured=true&domain=...
 */
export const getJournals = async (params = {}) => {
  const { data } = await API.get("/journals", { params });
  return data; // { rows: [...], count: N }
};

/**
 * Get single journal detail (public)
 * GET /api/journals/:id
 */
export const getJournalById = async (id) => {
  const { data } = await API.get(`/journals/${id}`);
  return data;
};

// --- Admin APIs ---

export const createJournal = async (payload) => {
  const { data } = await API.post("/admin/journals", payload);
  return data;
};

export const updateJournal = async (id, payload) => {
  const { data } = await API.put(`/admin/journals/${id}`, payload);
  return data;
};

export const deleteJournal = async (id) => {
  const { data } = await API.delete(`/admin/journals/${id}`);
  return data;
};
