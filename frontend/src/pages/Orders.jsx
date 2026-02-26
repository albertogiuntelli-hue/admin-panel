// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";
import "./Orders.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Carica ordini dal backend
    const loadOrders = async () => {
        try {
            const response = await apiClient.get("/orders");
            setOrders(response.data);
        } catch (err) {
            console.error("Errore caricamento ordini:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    // Cambia stato ordine
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await apiClient.put(`/orders/${orderId}`, { status: newStatus });
            loadOrders();
        } catch (err) {
            console.error("Errore aggiornamento stato:", err);
        }
    };

    return (
        <div className="orders-container">
            <h1>Gestione Ordini</h1>

            {loading ? (
                <p>Caricamento ordini...</p>
            ) : (
                <div className="orders-layout">
                    {/* LISTA ORDINI */}
                    <div className="orders-list">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Totale</th>
                                    <th>Stato</th>
                                    <th>Azioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.customerName}</td>
                                        <td>{order.total} €</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="orders-view-btn"
                                            >
                                                Dettagli
                                            </button>

                                            <select
                                                value={order.status}
                                                onChange={(e) =>
                                                    updateOrderStatus(order._id, e.target.value)
                                                }
                                            >
                                                <option value="pending">In attesa</option>
                                                <option value="confirmed">Confermato</option>
                                                <option value="preparing">In preparazione</option>
                                                <option value="delivering">In consegna</option>
                                                <option value="completed">Completato</option>
                                                <option value="cancelled">Annullato</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* DETTAGLIO ORDINE */}
                    <div className="orders-details">
                        {selectedOrder ? (
                            <div>
                                <h2>Dettaglio Ordine</h2>
                                <p><strong>ID:</strong> {selectedOrder._id}</p>
                                <p><strong>Cliente:</strong> {selectedOrder.customerName}</p>
                                <p><strong>Totale:</strong> {selectedOrder.total} €</p>
                                <p><strong>Stato:</strong> {selectedOrder.status}</p>

                                <h3>Prodotti</h3>
                                <ul>
                                    {selectedOrder.items.map((item) => (
                                        <li key={item.productId}>
                                            {item.name} — {item.quantity} × {item.price} €
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className="orders-close-btn"
                                    onClick={() => setSelectedOrder(null)}
                                >
                                    Chiudi
                                </button>
                            </div>
                        ) : (
                            <p>Seleziona un ordine per vedere i dettagli.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
