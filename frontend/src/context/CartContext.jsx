import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Aggiungi al carrello
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item._id === product._id);

            if (existing) {
                return prev.map((item) =>
                    item._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            return [...prev, { ...product, qty: 1 }];
        });
    };

    // Rimuovi completamente un prodotto
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item._id !== id));
    };

    // Svuota carrello
    const clearCart = () => setCart([]);

    // Aumenta quantità
    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, qty: item.qty + 1 } : item
            )
        );
    };

    // Diminuisci quantità
    const decreaseQty = (id) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item._id === id ? { ...item, qty: item.qty - 1 } : item
                )
                .filter((item) => item.qty > 0) // se qty = 0 → rimuovi
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQty,
                decreaseQty,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
