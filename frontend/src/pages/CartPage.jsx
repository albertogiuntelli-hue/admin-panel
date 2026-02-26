import { useCart } from "../context/CartContext";
import "./Products.css";

export default function CartPage() {
    const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } =
        useCart();

    // Calcolo totale
    const total = cart.reduce(
        (sum, item) => sum + item.prezzo * item.qty,
        0
    );

    return (
        <div className="products-container">
            <h1 className="page-title">Carrello</h1>

            {cart.length === 0 && <p>Il carrello è vuoto.</p>}

            {cart.map((item) => (
                <div key={item._id} className="product-card">
                    <h3 className="product-name">{item.nome}</h3>

                    <p className="product-price">
                        {(item.prezzo / 100).toFixed(2).replace(".", ",")} €
                    </p>

                    <p className="product-code">Quantità: {item.qty}</p>

                    {/* Pulsanti quantità */}
                    <div style={{ marginTop: "10px" }}>
                        <button
                            className="add-to-cart-btn"
                            style={{ padding: "5px 10px", marginRight: "5px" }}
                            onClick={() => decreaseQty(item._id)}
                        >
                            -
                        </button>

                        <button
                            className="add-to-cart-btn"
                            style={{ padding: "5px 10px" }}
                            onClick={() => increaseQty(item._id)}
                        >
                            +
                        </button>
                    </div>

                    {/* Pulsante rimuovi */}
                    <button
                        className="add-to-cart-btn"
                        style={{
                            marginTop: "10px",
                            backgroundColor: "#dc3545",
                        }}
                        onClick={() => removeFromCart(item._id)}
                    >
                        Rimuovi
                    </button>
                </div>
            ))}

            {cart.length > 0 && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <h2>
                        Totale: {(total / 100).toFixed(2).replace(".", ",")} €
                    </h2>

                    <button
                        className="add-to-cart-btn"
                        style={{
                            marginTop: "10px",
                            backgroundColor: "#555",
                        }}
                        onClick={clearCart}
                    >
                        Svuota carrello
                    </button>

                    <a
                        href="/checkout"
                        className="add-to-cart-btn"
                        style={{
                            marginTop: "10px",
                            display: "inline-block",
                            textDecoration: "none",
                        }}
                    >
                        Vai al checkout
                    </a>
                </div>
            )}
        </div>
    );
}
