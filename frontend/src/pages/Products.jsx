import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Products.css";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                // ENDPOINT CORRETTO
                const res = await api.get("/products/products");
                setProducts(res.data);
            } catch (err) {
                console.error(err);
                setError("Errore nel caricamento prodotti");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="products-container">
            <h1 className="page-title">Prodotti</h1>

            <div className="products-grid">
                {products.map((p, index) => (
                    <div key={index} className="product-card">
                        <h3 className="product-name">{p.name}</h3>

                        <p className="product-price">
                            {p.price} €
                        </p>

                        <p className="product-code">
                            Codice: {p.code}
                        </p>

                        <button
                            className="add-to-cart-btn"
                            onClick={() => console.log("Aggiunto:", p.name)}
                        >
                            Aggiungi al carrello
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

