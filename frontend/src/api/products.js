// frontend/src/api/products.js
import api from "./api";

export const fetchProducts = () => api.get("/products");
export const uploadProductsFile = (formData) =>
    api.post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

