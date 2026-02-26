import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Prodotti from "./pages/Prodotti.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/prodotti"
                    element={
                        <ProtectedRoute>
                            <Prodotti />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ordini"
                    element={
                        <ProtectedRoute>
                            <div>Pagina Ordini</div>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/impostazioni"
                    element={
                        <ProtectedRoute>
                            <div>Pagina Impostazioni</div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
