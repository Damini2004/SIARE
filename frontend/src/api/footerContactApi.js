import API from "./axios";

export const getFooterContacts = async () => {
  const { data } = await API.get("/footer-contact");
  return data;
};