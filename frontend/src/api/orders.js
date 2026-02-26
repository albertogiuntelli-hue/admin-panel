// src/api/orders.js
import apiClient from './axios';

// Lista ordini (opzionale filtro per stato)
export const fetchOrders = async (status) => {
    const params = {};
    if (status) params.status = status;

    const response = await apiClient.get('/orders', { params });
    return response.data;
};

// Dettaglio singolo ordine
export const fetchOrderById = async (orderId) => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
};

// Aggiorna solo lo stato dell'ordine
export const updateOrderStatus = async (orderId, status) => {
    const response = await apiClient.put(`/orders/${orderId}/status`, { status });
    return response.data;
};

// Crea un nuovo ordine (usato da checkout lato cliente)
export const createOrder = async (orderData) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
};

// Elimina ordine
export const deleteOrder = async (orderId) => {
    const response = await apiClient.delete(`/orders/${orderId}`);
    return response.data;
};
