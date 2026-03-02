import axios from "axios";

const api = axios.create({
    // Backend in locale: assicurati che il server giri su http://localhost:5000
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
