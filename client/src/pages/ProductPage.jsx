import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";
import { useCart } from "../context/CartContext.jsx";

function ProductPage() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Errore nel caricamento prodotto:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <p>Caricamento prodotto...</p>;
    }

    if (!product) {
        return <p>Prodotto non trovato.</p>;
    }

    const handleAdd = () => {
        addToCart(product);
    };

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Prezzo: €{product.price}</p>
            {product.onSale && (
                <p style={{ color: "red", fontWeight: "bold" }}>IN OFFERTA!</p>
            )}
            {product.description && <p>{product.description}</p>}

            <button onClick={handleAdd} style={{ marginTop: "20px" }}>
                Aggiungi al carrello
            </button>
        </div>
    );
}

export default ProductPage;
