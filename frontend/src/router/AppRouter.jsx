import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGINE CLIENTE
import Shop from "../pages/Shop.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import CartPage from "../pages/CartPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import OrderSuccess from "../pages/OrderSuccess.jsx";

// PAGINE ADMIN
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import UploadCSV from "../pages/UploadCSV.jsx";
import Products from "../pages/Products.jsx";
import Users from "../pages/Users.jsx";
import Orders from "../pages/Orders.jsx";
import Settings from "../pages/Settings.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                {/* CLIENTE */}
                <Route path="/" element={<Shop />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccess />} />

                {/* ADMIN */}
                <Route path="/admin" element={<Login />} />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/upload-csv"
                    element={
                        <ProtectedRoute>
                            <UploadCSV />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/products"
                    element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}
