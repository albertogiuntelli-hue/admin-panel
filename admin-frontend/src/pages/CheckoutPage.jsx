// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const ordine = {
            customerName: name,
            address,
            note,
            items,
            total,
        };

        try {
            await api.post("/api/orders", ordine);
            clearCart();
            setStatus(null);
            navigate("/ordine-completato");
        } catch (err) {
            console.error("Errore invio ordine", err);
            setStatus("Errore nell'invio dell'ordine.");
        }
    }

    if (items.length === 0) {
        return <p>Il carrello è vuoto.</p>;
    }

    return (
        <div>
            <h2>Checkout</h2>
            <p>Totale: {total.toFixed(2)} €</p>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Nome e cognome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Indirizzo"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Note per la consegna"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />

                <button type="submit">Conferma ordine</button>
            </form>

            {status && <p>{status}</p>}
        </div>
    );
}

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "300px",
    },
};
