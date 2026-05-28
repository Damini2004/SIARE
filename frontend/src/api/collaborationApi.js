import API from "./axios";

export const getCollaborations = async () => {
  const { data } = await API.get("/collaborations");
  return data;
};

export const createCollaboration = async (formData) => {
  const { data } = await API.post("/collaborations", formData);
  return data;
};

export const updateCollaboration = async (id, formData) => {
  const { data } = await API.put(`/collaborations/${id}`, formData);
  return data;
};

export const deleteCollaboration = async (id) => {
  const { data } = await API.delete(`/collaborations/${id}`);
  return data;
};