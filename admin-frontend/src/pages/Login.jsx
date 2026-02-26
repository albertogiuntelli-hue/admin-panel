import { useState } from "react";
import { loginAdmin } from "../services/authService.js";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const result = await loginAdmin(email, password);

        if (result.success) {
            localStorage.setItem("token", result.token);
            localStorage.setItem("role", result.role);
            navigate("/dashboard");
        } else {
            setError(result.message || "Credenziali non valide");
        }
    }

    return (
        <div style={{ padding: "40px", fontFamily: "Arial" }}>
            <h2>Login Amministratore</h2>

            <form onSubmit={handleSubmit} style={{ maxWidth: "300px" }}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Accedi</button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

export default Login;
