import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products");
                setProducts(res.data);
            } catch (error) {
                console.error("Errore caricamento prodotti:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="products-container">
            <h1>Prodotti</h1>

            {products.length === 0 && <p>Nessun prodotto disponibile</p>}

            <div className="product-grid">
                {products.map((p) => (
                    <div key={p.codice} className="product-card">

                        <h3>{p.nome}</h3>
                        <p className="desc">{p.descrizione}</p>

                        <p className="price">
                            {p.prezzoSco > 0 ? (
                                <>
                                    <span className="old-price">{p.prezzo} €</span>
                                    <span className="new-price">{p.prezzoSco} €</span>
                                </>
                            ) : (
                                <span>{p.prezzo} €</span>
                            )}
                        </p>

                        <p className="categoria">Categoria: {p.categoria}</p>
                        <p className="disp">
                            Disponibile: {p.disponibile ? "Sì" : "No"}
                        </p>

                        <button
                            className="btn-add"
                            onClick={() => addToCart(p)}
                        >
                            Aggiungi al carrello
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
