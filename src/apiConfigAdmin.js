import axios from "axios";
import ngrokURL from "./ngrokURL";
const BASE_URL = "http://localhost:8080/hdga/api";
const BASE_URL_NGROK = `${ngrokURL}/hdga/api`;

const apiAdmin = axios.create({
  baseURL: BASE_URL_NGROK,
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
