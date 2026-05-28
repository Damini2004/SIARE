// src/api/uploadApi.js
// File upload API (admin only) — uses multer on the backend
import API from "./axios";

/**
 * Upload a single file (image or PDF)
 * POST /api/admin/upload
 * Returns: { url: "http://localhost:5000/uploads/filename.ext" }
 */
export const uploadFile = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await API.post("/admin/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
  return data; // { url: "..." }
};
