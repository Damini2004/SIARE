import API from "./axios";

// PUBLIC - for Clients page
export const getMembers = async (params = {}) => {
  const { data } = await API.get("/members", { params });
  return data;
};

// ADMIN - for dashboard/member admin page
export const getAdminMembers = async (params = {}) => {
  const { data } = await API.get("/admin/members", { params });
  return data;
};

export const createMember = async (payload) => {
  const { data } = await API.post("/admin/members", payload);
  return data;
};

export const updateMember = async (id, payload) => {
  const { data } = await API.put(`/admin/members/${id}`, payload);
  return data;
};

export const deleteMember = async (id) => {
  const { data } = await API.delete(`/admin/members/${id}`);
  return data;
};