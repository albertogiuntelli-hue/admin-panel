import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadCSV from "../UploadCSV";

export default function AdminApp() {
    return (
        <Router>
            <div className="layout">

                <aside className="sidebar">
                    <h2 className="logo">Gestione Prodotti</h2>

                    <nav className="menu">
                        <Link className="menu-link" to="/admin/dashboard">Dashboard</Link>
                        <Link className="menu-link" to="/admin/upload-csv">Carica CSV Prodotti</Link>
                    </nav>
                </aside>

                <main className="content">
                    <Routes>
                        <Route
                            path="/admin/dashboard"
                            element={<h1>Benvenuto nel pannello PlusMarket Giuntelli</h1>}
                        />
                        <Route path="/admin/upload-csv" element={<UploadCSV />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
