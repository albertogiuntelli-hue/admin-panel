import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
    const { logout } = useAuth();

    return (
        <div className="layout">
            <aside className="sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <Link to="/">Dashboard</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/categories">Categories</Link>
                </nav>
                <button className="logout" onClick={logout}>Logout</button>
            </aside>

            <main className="content">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
