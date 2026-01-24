import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <NotificationProvider>
                <AuthProvider>
                    <CartProvider>
                        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                            <App />
                        </BrowserRouter>
                    </CartProvider>
                </AuthProvider>
            </NotificationProvider>
        </HelmetProvider>
    </React.StrictMode>,
)
