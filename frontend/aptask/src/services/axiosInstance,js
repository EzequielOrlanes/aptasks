// src/services/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://aptasks-production.up.railway.app", // ou use API_URL
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
