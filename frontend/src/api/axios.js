// src/api/axios.js
// Base Axios instance for all API calls
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
let csrfToken = null;

const API = axios.create({
  baseURL,
  withCredentials: true, // Required for cookie-based auth sessions
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(async (config) => {
  const method = String(config.method || "get").toLowerCase();
  const requiresCsrf = ["post", "put", "patch", "delete"].includes(method);

  if (requiresCsrf && !csrfToken) {
    const { data } = await axios.get(`${baseURL}/csrf-token`, {
      withCredentials: true,
    });

    csrfToken = data.csrfToken;
  }

  if (requiresCsrf && csrfToken) {
    config.headers["x-csrf-token"] = csrfToken;
  }

  return config;
});

// Response interceptor for unified error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default API;
