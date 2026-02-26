import { useCart } from "../context/CartContext.jsx";
import api from "../api/axios";
import { useState } from "react";

function Checkout() {
    const { items, clearCart } = useCart();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [sent, setSent] = useState(false);

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const sendOrder = async () => {
        try {
            await api.post("/orders", {
                name,
                address,
                items,
                total,
            });

            clearCart();
            setSent(true);
        } catch (error) {
            console.error("Errore invio ordine:", error);
        }
    };

    if (sent) {
        return <h2>Ordine inviato con successo! Grazie!</h2>;
    }

    return (
        <div>
            <h1>Conferma Ordine</h1>

            <p>Totale: € {total.toFixed(2)}</p>

            <input
                type="text"
                placeholder="Nome e Cognome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ display: "block", marginBottom: "10px" }}
            />

            <input
                type="text"
                placeholder="Indirizzo"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ display: "block", marginBottom: "10px" }}
            />

            <button
                onClick={sendOrder}
                style={{
                    padding: "10px 20px",
                    background: "var(--pm-green)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                }}
            >
                Invia Ordine
            </button>
        </div>
    );
}

export default Checkout;
