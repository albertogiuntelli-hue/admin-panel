import { useState } from "react";
import { uploadCSV } from "../services/productService";

export default function UploadCSV() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        if (!file) {
            setMessage("Seleziona un file CSV");
            return;
        }

        try {
            const res = await uploadCSV(file);
            setMessage(`Importazione completata: ${res.count} prodotti`);
        } catch (error) {
            setMessage("Errore durante l'importazione");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Carica CSV Prodotti</h2>

            <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={handleUpload} style={{ marginTop: 10 }}>
                Carica
            </button>

            {message && <p>{message}</p>}
        </div>
    );
}

