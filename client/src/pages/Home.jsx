import React from "react";
import { Link } from "react-router-dom";
import "../styles/theme.css";

const Home = () => {
    return (
        <div className="home-container">
            <h1>Benvenuto in PlusMarket Giuntelli</h1>
            <p>Il tuo negozio di fiducia online.</p>

            <p>Vai alla sezione prodotti per iniziare il tuo ordine.</p>

            <Link to="/products" className="btn-primary">
                Vai ai Prodotti
            </Link>
        </div>
    );
};

export default Home;
