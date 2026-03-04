import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import "./Products.css";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
        });
    }, []);

    const handleAdd = (product, safeId) => {
        addToCart({ ...product, _id: safeId });

        if (window.showAddNotification) {
            window.showAddNotification(product.name);
        }

        const btn = document.getElementById("btn-" + safeId);
        if (btn) {
            btn.classList.add("added");
            setTimeout(() => btn.classList.remove("added"), 300);
        }
    };

    return (
        <div className="products-container">
            <h1 className="page-title">Prodotti</h1>

            <div className="products-grid">
                {products.map((product, index) => {
                    const safeId = product.id || String(index);

                    return (
                        <div key={safeId} className="product-card">
                            <h3 className="product-name">{product.name}</h3>

                            <p className="product-price">
                                {Number(product.price)
                                    .toFixed(2)
                                    .replace(".", ",")} €
                            </p>

                            <p className="product-code">
                                ID: {product.id}
                            </p>

                            <button
                                id={"btn-" + safeId}
                                className="add-to-cart-btn"
                                onClick={() => handleAdd(product, safeId)}
                            >
                                Aggiungi al carrello
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
