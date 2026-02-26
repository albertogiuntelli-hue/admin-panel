import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './ProductsPage.css';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const loadProducts = async () => {
        try {
            const { data } = await api.get('/products/products');
            setProducts(data);
        } catch (err) {
            console.error(err);
            setMessage('Errore nel caricamento prodotti');
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImport = async () => {
        if (!file) {
            setMessage('Seleziona un file CSV prima di importare');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);

        try {
            const { data } = await api.post('/products/upload-csv', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMessage(`Importazione completata: ${data.imported} prodotti`);
            loadProducts();
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || 'Errore durante importazione';
            setMessage(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="products-container">
            <h1 className="page-title">Prodotti</h1>

            <div className="import-box">
                <input type="file" accept=".csv" onChange={handleFileChange} />
                <button onClick={handleImport} disabled={loading}>
                    {loading ? 'Importazione...' : 'Importa CSV'}
                </button>
            </div>

            {message && <p className="message">{message}</p>}

            <div className="products-grid">
                {products.map((p, index) => (
                    <div key={index} className="product-card">
                        <div className="product-name">{p.name}</div>
                        <div className="product-price">{p.price} €</div>
                        <div className="product-code">Codice: {p.code}</div>

                        <button
                            className="add-to-cart-btn"
                            onClick={() => console.log('Aggiunto:', p.name)}
                        >
                            Aggiungi al carrello
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;
<h1 style={{ color: "red" }}>TEST BUILD</h1>
