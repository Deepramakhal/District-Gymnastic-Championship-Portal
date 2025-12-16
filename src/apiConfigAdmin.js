import axios from "axios";

const apiAdmin = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE}/hdga/api`,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// ✅ Attach token dynamically
apiAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token_secret21122025");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiAdmin;
