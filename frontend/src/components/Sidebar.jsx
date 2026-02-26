// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>PlusMarket</h2>
                <span>Giuntelli</span>
            </div>
            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className="sidebar-link">
                    Dashboard
                </NavLink>
                <NavLink to="/orders" className="sidebar-link">
                    Ordini
                </NavLink>
                <NavLink to="/products" className="sidebar-link">
                    Prodotti
                </NavLink>
                <NavLink to="/categories" className="sidebar-link">
                    Categorie
                </NavLink>
                <NavLink to="/users" className="sidebar-link">
                    Utenti
                </NavLink>
                <NavLink to="/settings" className="sidebar-link">
                    Impostazioni
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
