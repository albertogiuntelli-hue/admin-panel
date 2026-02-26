import { useCart } from "../context/CartContext.jsx";

function Cart() {
    const { items, addItem, removeItem, clearCart } = useCart();

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (items.length === 0) {
        return <h2>Il carrello è vuoto.</h2>;
    }

    return (
        <div>
            <h1>Carrello</h1>

            {items.map((item) => (
                <div
                    key={item._id}
                    style={{
                        borderBottom: "1px solid #ddd",
                        padding: "10px 0",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <strong>{item.name}</strong>
                        <p>€ {item.price}</p>
                    </div>

                    <div>
                        <button onClick={() => removeItem(item._id)}>-</button>
                        <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                        <button onClick={() => addItem(item)}>+</button>
                    </div>
                </div>
            ))}

            <h2>Totale: € {total.toFixed(2)}</h2>

            <button
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    background: "var(--pm-green)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                }}
                onClick={() => (window.location.href = "/checkout")}
            >
                Procedi all’ordine
            </button>
        </div>
    );
}

export default Cart;

