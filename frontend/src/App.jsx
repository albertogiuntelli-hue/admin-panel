import { useState } from "react";
import AppRouter from "./router/AppRouter";
import CartModal from "./components/CartModal";
import { useCart } from "./context/CartContext";

export default function App() {
    const [open, setOpen] = useState(false);
    const { cart } = useCart();

    // Stato per la notifica
    const [notification, setNotification] = useState("");

    // Numero totale articoli
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    // Totale in €
    const totalPrice = cart.reduce((sum, item) => sum + item.prezzo * item.qty, 0);
    const totalFormatted = (totalPrice / 100).toFixed(2).replace(".", ",");

    // Funzione per mostrare la notifica
    window.showAddNotification = (productName) => {
        setNotification(`${productName} aggiunto al carrello`);
        setTimeout(() => setNotification(""), 2000);
    };

    return (
        <>
            {/* Notifica */}
            {notification && (
                <div
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "black",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        zIndex: 99999,
                        fontSize: "16px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                >
                    {notification}
                </div>
            )}

            {/* Pulsante carrello */}
            <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}>
                <button
                    onClick={() => setOpen(true)}
                    style={{
                        background: "black",
                        color: "white",
                        padding: "10px 15px",
                        borderRadius: "50%",
                        fontSize: "20px",
                        position: "relative",
                    }}
                >
                    🛒
                </button>

                {/* Badge numero articoli */}
                {totalItems > 0 && (
                    <div
                        style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            width: "22px",
                            height: "22px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "12px",
                            fontWeight: "bold",
                        }}
                    >
                        {totalItems}
                    </div>
                )}

                {/* Totale in € */}
                {totalItems > 0 && (
                    <div
                        style={{
                            marginTop: "5px",
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "black",
                            background: "white",
                            padding: "3px 8px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                        }}
                    >
                        {totalFormatted} €
                    </div>
                )}
            </div>

            <CartModal open={open} onClose={() => setOpen(false)} />
            <AppRouter />
        </>
    );
}
