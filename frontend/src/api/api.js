// frontend/src/api.js
import axios from "axios";

const api = axios.create({
    baseURL: "https://passionate-laughter-production-5fc7.up.railway.app",
});

export default api;
