// src/api/contactApi.js
// Contact / Inquiry API — public inquiry submission
import API from "./axios";

/**
 * Submit a contact/inquiry form
 * POST /api/inquiries
 * @param {object} formData - { name, email, phone, institution, subject, purpose, message }
 */
export const submitInquiry = async (formData) => {
  const { data } = await API.post("/inquiries", formData);
  return data;
};
