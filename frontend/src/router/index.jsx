import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Orders from "../pages/Orders";
import Users from "../pages/Users";
import UploadCSV from "../pages/UploadCSV"; // <--- AGGIUNTO

// Protezione rotte admin
const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken");
    if (!token) return <Navigate to="/login" replace />;
    return children;
};

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                {/* LOGIN */}
                <Route path="/login" element={<Login />} />

                {/* DASHBOARD ADMIN */}
                <Route
                    path="/dashboard"
                    element={
                        <AdminRoute>
                            <Dashboard />
                        </AdminRoute>
                    }
                />

                {/* PRODOTTI */}
                <Route
                    path="/products"
                    element={
                        <AdminRoute>
                            <Products />
                        </AdminRoute>
                    }
                />

                {/* CATEGORIE */}
                <Route
                    path="/categories"
                    element={
                        <AdminRoute>
                            <Categories />
                        </AdminRoute>
                    }
                />

                {/* ORDINI */}
                <Route
                    path="/orders"
                    element={
                        <AdminRoute>
                            <Orders />
                        </AdminRoute>
                    }
                />

                {/* UTENTI */}
                <Route
                    path="/users"
                    element={
                        <AdminRoute>
                            <Users />
                        </AdminRoute>
                    }
                />

                {/* UPLOAD CSV — LA PAGINA CHE TI SERVE */}
                <Route
                    path="/upload-csv"
                    element={
                        <AdminRoute>
                            <UploadCSV />
                        </AdminRoute>
                    }
                />

                {/* DEFAULT */}
                <Route
                    path="/"
                    element={
                        localStorage.getItem("adminToken")
                            ? <Navigate to="/dashboard" replace />
                            : <Navigate to="/login" replace />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}
