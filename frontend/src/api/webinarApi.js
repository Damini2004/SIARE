import API from "./axios";

export const getWebinarContent = async (eventId) => {
  const { data } = await API.get(`/webinars/${eventId}/content`);
  return data;
};

export const getAdminWebinarContent = async (eventId) => {
  const { data } = await API.get(`/admin/webinars/${eventId}/content`);
  return data;
};

export const updateAdminWebinarContent = async (eventId, payload) => {
  const { data } = await API.put(`/admin/webinars/${eventId}/content`, payload);
  return data;
};
