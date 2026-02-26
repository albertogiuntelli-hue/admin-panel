import { useCart } from "../context/CartContext";
import "./CartModal.css";

export default function CartModal({ open, onClose }) {
    const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } = useCart();

    if (!open) return null;

    // Calcolo totale
    const total = cart.reduce((sum, item) => sum + item.prezzo * item.qty, 0);

    // Messaggio WhatsApp
    const message = encodeURIComponent(
        cart
            .map(
                (item) =>
                    `${item.nome} x${item.qty} - ${(item.prezzo / 100).toFixed(2)}€`
            )
            .join("\n") +
        `\n\nTotale: ${(total / 100).toFixed(2)}€`
    );

    // INSERISCI QUI IL TUO NUMERO WHATSAPP
    const whatsappUrl = `https://wa.me/393491234567?text=${message}`;

    return (
        <div className="cart-overlay" onClick={onClose}>
            <div className="cart-box" onClick={(e) => e.stopPropagation()}>
                <h2>Carrello</h2>

                {cart.length === 0 && <p>Il carrello è vuoto.</p>}

                {cart.map((item) => (
                    <div key={item._id} className="cart-item">
                        <strong>{item.nome}</strong>

                        {/* Controllo quantità */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginTop: "10px",
                            }}
                        >
                            <button
                                onClick={() => decreaseQty(item._id)}
                                style={{
                                    background: "#ccc",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    fontSize: "18px",
                                }}
                            >
                                –
                            </button>

                            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                                {item.qty}
                            </span>

                            <button
                                onClick={() => increaseQty(item._id)}
                                style={{
                                    background: "#ccc",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    fontSize: "18px",
                                }}
                            >
                                +
                            </button>
                        </div>

                        {/* Pulsante rimuovi */}
                        <button
                            onClick={() => removeFromCart(item._id)}
                            className="cart-btn"
                            style={{ background: "red", marginTop: "10px" }}
                        >
                            Rimuovi
                        </button>
                    </div>
                ))}

                {cart.length > 0 && (
                    <>
                        <h3 style={{ marginTop: "15px" }}>
                            Totale: {(total / 100).toFixed(2)} €
                        </h3>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            className="cart-btn"
                            style={{ background: "#25D366", marginTop: "10px" }}
                        >
                            Invia ordine su WhatsApp
                        </a>

                        <button
                            onClick={clearCart}
                            className="cart-btn"
                            style={{ background: "#555" }}
                        >
                            Svuota carrello
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
