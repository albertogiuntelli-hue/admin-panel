import api from "../api/api";

export const getProducts = async () => {
    const res = await api.get("/products/products");
    return res.data;
};

export const uploadCSV = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/products/upload-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
};
