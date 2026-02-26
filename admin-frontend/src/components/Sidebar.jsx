import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            style={{
                width: "220px",
                height: "100vh",
                background: "#1e1e1e",
                color: "white",
                padding: "20px",
                boxSizing: "border-box",
                position: "fixed",
                left: 0,
                top: 0
            }}
        >
            <h2 style={{ marginBottom: "30px" }}>Admin Panel</h2>

            <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                    Dashboard
                </Link>

                <Link to="/prodotti" style={{ color: "white", textDecoration: "none" }}>
                    Prodotti
                </Link>

                <Link to="/ordini" style={{ color: "white", textDecoration: "none" }}>
                    Ordini
                </Link>

                <Link to="/impostazioni" style={{ color: "white", textDecoration: "none" }}>
                    Impostazioni
                </Link>
            </nav>
        </div>
    );
}

export default Sidebar;
