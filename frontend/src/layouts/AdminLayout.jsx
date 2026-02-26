// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './MainLayout.css';

const AdminLayout = () => {
    return (
        <div className="main-layout">
            <Header />
            <div className="main-layout-body">
                <Sidebar />
                <main className="main-layout-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
