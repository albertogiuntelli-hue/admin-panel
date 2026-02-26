import axios from "axios";

const api = axios.create({
    baseURL: "http://plusmarket.ddns.net:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
