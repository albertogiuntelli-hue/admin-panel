// src/pages/OrderSuccessPage.jsx
import { Link } from "react-router-dom";

export default function OrderSuccessPage() {
    return (
        <div style={styles.container}>
            <h2>Ordine completato</h2>
            <p>Grazie! Il tuo ordine è stato ricevuto correttamente.</p>
            <p>Ti contatteremo al più presto per la conferma.</p>

            <div style={styles.actions}>
                <Link to="/prodotti">Torna ai prodotti</Link>
                <Link to="/carrello">Vai al carrello</Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
    },
    actions: {
        marginTop: "20px",
        display: "flex",
        gap: "10px",
        justifyContent: "center",
    },
};
