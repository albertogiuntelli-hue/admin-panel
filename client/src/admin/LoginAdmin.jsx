// client/src/admin/LoginAdmin.jsx

import { useState } from "react";
import { loginAdmin } from "../services/adminAuthService";

export default function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginAdmin(email, password);

            // Salviamo il token ricevuto dal backend
            localStorage.setItem("adminToken", data.token);

            // Reindirizziamo alla dashboard (la creeremo dopo)
            window.location.href = "/admin/dashboard";
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Area Riservata Admin</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email admin"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Password admin"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>
                    Accedi
                </button>

                {error && <p style={styles.error}>{error}</p>}
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "400px",
        margin: "80px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        textAlign: "center",
        background: "#fff",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px",
        background: "#333",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginTop: "10px",
    },
};
