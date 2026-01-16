import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import HomePage from './pages/HomePage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
    return (
        <CartProvider>
            <Layout>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/tracking" element={<OrderTrackingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/products/:category" element={<ProductsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </Layout>
        </CartProvider>
    )
}

export default App
