import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ScrollToTop from './components/ScrollToTop';
import AuthPromptSheet from './components/AuthPromptSheet';
import AddressSelectionModal from './components/AddressSelectionModal';
import { useAuth } from './context/AuthContext';
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
import AccountPage from './pages/AccountPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Inner component to access auth context
const AppContent = () => {
    const { showAuthPrompt, setShowAuthPrompt, skipAuth, showAddressModal, setShowAddressModal } = useAuth();

    return (
        <>
            <WishlistProvider>
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
                            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                            <Route path="/reset-password" element={<ResetPasswordPage />} />
                            <Route path="/orders" element={<OrdersPage />} />
                            <Route path="/verify-otp" element={<OTPVerificationPage />} />
                            <Route path="/products/:category" element={<ProductsPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                        </Routes>
                    </Layout>
                </CartProvider>
            </WishlistProvider>

            {/* Global Modals */}
            <AuthPromptSheet
                isOpen={showAuthPrompt}
                onClose={() => setShowAuthPrompt(false)}
                onSkip={skipAuth}
            />
            <AddressSelectionModal
                isOpen={showAddressModal}
                onClose={() => setShowAddressModal(false)}
            />
        </>
    );
};

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App
