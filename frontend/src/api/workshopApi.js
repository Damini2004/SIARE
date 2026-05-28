import API from "./axios";

export const getWorkshopContent = async (eventId) => {
  const { data } = await API.get(`/workshops/${eventId}/content`);
  return data;
};

export const getAdminWorkshopContent = async (eventId) => {
  const { data } = await API.get(`/admin/workshops/${eventId}/content`);
  return data;
};

export const updateAdminWorkshopContent = async (eventId, payload) => {
  const { data } = await API.put(`/admin/workshops/${eventId}/content`, payload);
  return data;
};
