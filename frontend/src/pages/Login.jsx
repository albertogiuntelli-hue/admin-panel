import { useState } from "react";
import { loginAdmin } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginAdmin(email, password);

            // Salva token e dati admin
            localStorage.setItem("adminToken", data.token);
            localStorage.setItem("adminData", JSON.stringify(data.admin));

            navigate("/dashboard");
        } catch (err) {
            setError("Credenziali non valide");
        }
    };

    return (
        <div className="login-container">
            <h2>Accesso Admin</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email admin"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password admin"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Accedi</button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}
