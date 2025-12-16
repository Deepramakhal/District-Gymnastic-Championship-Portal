import axios from 'axios';
import ngrokURL from './ngrokURL';
const BASE_URL = "http://localhost:8080/hdga/api";
const BASE_URL_NGROK = `${ngrokURL}/hdga/api`;

const api = axios.create({
  baseURL: BASE_URL_NGROK,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  },
});

export default api;