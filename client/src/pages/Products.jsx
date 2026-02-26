import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useCart } from '../context/CartContext.jsx';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Errore nel caricamento prodotti:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Caricamento prodotti...</p>;
    }

    if (!products || products.length === 0) {
        return <p>Nessun prodotto disponibile.</p>;
    }

    return (
        <div>
            <h1>Prodotti</h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '16px',
                }}
            >
                {products.map((p) => (
                    <div
                        key={p._id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '12px',
                            boxShadow: 'var(--pm-shadow)',
                            background: 'white',
                        }}
                    >
                        <h3 style={{ marginTop: 0 }}>{p.name}</h3>
                        {p.description && <p>{p.description}</p>}
                        <p><strong>€ {p.price}</strong></p>
                        <button
                            onClick={() =>
                                addItem({
                                    _id: p._id,
                                    name: p.name,
                                    price: p.price,
                                })
                            }
                            style={{
                                marginTop: '8px',
                                padding: '8px 12px',
                                background: 'var(--pm-green)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Aggiungi al carrello
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
