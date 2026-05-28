// src/api/companyApi.js
// Membership Tiers and Pricing Plans API
import API from "./axios";

/**
 * Get all membership tiers (public)
 * GET /api/membership-tiers
 */
export const getMembershipTiers = async (params = {}) => {
  const { data } = await API.get("/membership-tiers", { params });
  return data; // { rows: [...], count: N }
};

/**
 * Get single membership tier (public)
 * GET /api/membership-tiers/:id
 */
export const getMembershipTierById = async (id) => {
  const { data } = await API.get(`/membership-tiers/${id}`);
  return data;
};

/**
 * Get all pricing plans (public)
 * GET /api/pricing
 */
export const getPricingPlans = async (params = {}) => {
  const { data } = await API.get("/pricing", { params });
  return data; // { rows: [...], count: N }
};

/**
 * Get single pricing plan (public)
 * GET /api/pricing/:id
 */
export const getPricingPlanById = async (id) => {
  const { data } = await API.get(`/pricing/${id}`);
  return data;
};

// --- Admin APIs ---

export const createMembershipTier = async (payload) => {
  const { data } = await API.post("/admin/membership-tiers", payload);
  return data;
};

export const updateMembershipTier = async (id, payload) => {
  const { data } = await API.put(`/admin/membership-tiers/${id}`, payload);
  return data;
};

export const deleteMembershipTier = async (id) => {
  const { data } = await API.delete(`/admin/membership-tiers/${id}`);
  return data;
};

export const createPricingPlan = async (payload) => {
  const { data } = await API.post("/admin/pricing", payload);
  return data;
};

export const updatePricingPlan = async (id, payload) => {
  const { data } = await API.put(`/admin/pricing/${id}`, payload);
  return data;
};

export const deletePricingPlan = async (id) => {
  const { data } = await API.delete(`/admin/pricing/${id}`);
  return data;
};
