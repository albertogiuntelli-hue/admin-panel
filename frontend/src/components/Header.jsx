import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

export default function Header() {
    const { cart } = useCart();

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="logo">
                    PlusMarket
                </Link>
            </div>

            <div className="header-right">
                <Link to="/cart" className="cart-button">
                    🛒
                    {totalItems > 0 && (
                        <span className="cart-count">{totalItems}</span>
                    )}
                </Link>
            </div>
        </header>
    );
}
