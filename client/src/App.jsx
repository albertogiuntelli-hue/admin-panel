import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Cart from "./pages/Cart.jsx";
import { useCart } from "./context/CartContext.jsx";

// ADMIN
import LoginAdmin from "./admin/LoginAdmin.jsx";

function App() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          background: "var(--pm-green)",
          boxShadow: "var(--pm-shadow)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.jpg"
            alt="PlusMarket"
            style={{ height: "40px", marginRight: "10px", borderRadius: "6px" }}
          />
          <h2 style={{ margin: 0, color: "white" }}>PlusMarket Giuntelli</h2>
        </div>

        <div>
          <Link to="/" style={{ color: "white", marginRight: "15px" }}>
            Home
          </Link>
          <Link to="/prodotti" style={{ color: "white", marginRight: "15px" }}>
            Prodotti
          </Link>
          <Link to="/carrello" style={{ color: "white" }}>
            Carrello ({count})
          </Link>

          {/* LINK ADMIN (non visibile ai clienti, ma utile per te) */}
          <Link
            to="/admin/login"
            style={{ color: "yellow", marginLeft: "20px" }}
          >
            Admin
          </Link>
        </div>
      </nav>

      <div style={{ padding: "20px" }}>
        <Routes>
          {/* SITO CLIENTI */}
          <Route path="/" element={<Home />} />
          <Route path="/prodotti" element={<Products />} />
          <Route path="/prodotto/:id" element={<ProductPage />} />
          <Route path="/carrello" element={<Cart />} />

          {/* ADMIN */}
          <Route path="/admin/login" element={<LoginAdmin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
