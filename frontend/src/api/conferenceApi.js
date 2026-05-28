import API from "./axios";

export const getConferences = async (params = {}) => {
  const { data } = await API.get("/conferences", { params });
  return data;
};

export const getConferenceById = async (id) => {
  const { data } = await API.get(`/conferences/${id}`);
  return data;
};

export const getAdminConferenceById = async (id) => {
  const { data } = await API.get(`/admin/conferences/${id}`);
  return data;
};

export const updateAdminConference = async (id, payload) => {
  const { data } = await API.put(`/admin/conferences/${id}`, payload);
  return data;
};

export const getConferenceContent = async (eventId) => {
  const { data } = await API.get(
    `/conferences/${eventId}/content`
  );

  return data;
};

export const getAdminConferenceContent = async (eventId) => {
  const { data } = await API.get(
    `/admin/conferences/${eventId}/content`
  );

  return data;
};

export const updateAdminConferenceContent = async (
  eventId,
  payload
) => {
  const { data } = await API.put(
    `/admin/conferences/${eventId}/content`,
    payload
  );

  return data;
};