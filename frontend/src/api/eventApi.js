// src/api/eventApi.js
// Events API — public + admin CRUD for workshops and webinars
import API from "./axios";

/**
 * Get list of events (public)
 * GET /api/events?type=workshop|webinar&featured=true&status=...
 */
export const getEvents = async (params = {}) => {
  const { data } = await API.get("/events", { params });
  return data; // { rows: [...], count: N }
};

/**
 * Get single event detail (public)
 * GET /api/events/:id
 */
export const getEventById = async (id) => {
  const { data } = await API.get(`/events/${id}`);
  return data;
};

export const getAdminEvents = async (params = {}) => {
  const { data } = await API.get("/admin/events", { params });
  return data;
};

export const getAdminEventById = async (id) => {
  const { data } = await API.get(`/admin/events/${id}`);
  return data;
};

/**
 * Get workshops (convenience wrapper)
 */
export const getWorkshops = async (params = {}) =>
  getEvents({ type: "workshop", ...params });

/**
 * Get webinars (convenience wrapper)
 */
export const getWebinars = async (params = {}) =>
  getEvents({ type: "webinar", ...params });

// --- Admin APIs (require auth) ---

/**
 * Create event (admin)
 * POST /api/admin/events
 */
export const createEvent = async (payload) => {
  const { data } = await API.post("/admin/events", payload);
  return data;
};

/**
 * Update event (admin)
 * PUT /api/admin/events/:id
 */
export const updateEvent = async (id, payload) => {
  const { data } = await API.put(`/admin/events/${id}`, payload);
  return data;
};

/**
 * Delete event (admin)
 * DELETE /api/admin/events/:id
 */
export const deleteEvent = async (id) => {
  const { data } = await API.delete(`/admin/events/${id}`);
  return data;
};
