// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    function addToCart(product) {
        setItems((prev) => {
            const existing = prev.find((p) => p._id === product._id);
            if (existing) {
                return prev.map((p) =>
                    p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }

    function removeFromCart(id) {
        setItems((prev) => prev.filter((p) => p._id !== id));
    }

    function clearCart() {
        setItems([]);
    }

    const total = items.reduce(
        (sum, item) => sum + item.prezzo * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{ items, addToCart, removeFromCart, clearCart, total }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CCartContext);
}
