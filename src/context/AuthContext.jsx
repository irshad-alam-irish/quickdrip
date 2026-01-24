import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hasSkippedAuth, setHasSkippedAuth] = useState(false);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            const skipped = sessionStorage.getItem('quickdrip_auth_skipped');

            if (token) {
                try {
                    // Fetch user profile from backend
                    const userData = await userAPI.getProfile();
                    setUser(userData);
                    setIsAuthenticated(true);

                    // Fetch addresses
                    await fetchAddresses();
                } catch (error) {
                    console.error('Failed to load user:', error);
                    // Token invalid, clear it
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } else if (!skipped) {
                // Show auth prompt on first visit
                setShowAuthPrompt(true);
            }

            if (skipped === 'true') {
                setHasSkippedAuth(true);
            }

            setLoading(false);
        };
        loadUser();
    }, []);

    const fetchAddresses = async () => {
        try {
            const addressList = await userAPI.getAddresses();
            setAddresses(addressList);

            // Set default address if available
            const defaultAddr = addressList.find(addr => addr.is_default);
            if (defaultAddr) {
                setSelectedAddress(defaultAddr);
            } else if (addressList.length > 0) {
                setSelectedAddress(addressList[0]);
            }
            // Don't automatically show modal - let user trigger it manually if needed
        } catch (error) {
            console.error('Failed to fetch addresses:', error);
        }
    };

    const skipAuth = () => {
        sessionStorage.setItem('quickdrip_auth_skipped', 'true');
        setHasSkippedAuth(true);
        setShowAuthPrompt(false);
    };

    const triggerAuthPrompt = () => {
        if (!isAuthenticated && !hasSkippedAuth) {
            setShowAuthPrompt(true);
            return true;
        }
        return false;
    };

    const checkAuthPromptNeeded = () => {
        return !isAuthenticated && !hasSkippedAuth;
    };

    const requireAuth = (action) => {
        if (!isAuthenticated) {
            setShowAuthPrompt(true);
            return false;
        }
        return true;
    };

    const login = async (username, password) => {
        const data = await authAPI.login(username, password);
        localStorage.setItem('token', data.access_token);

        // Fetch user profile
        const userData = await userAPI.getProfile();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);

        // Reset skip state on login
        sessionStorage.removeItem('quickdrip_auth_skipped');
        setHasSkippedAuth(false);
        setShowAuthPrompt(false);

        // Fetch addresses
        await fetchAddresses();

        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('quickdrip_auth_skipped');
        setUser(null);
        setIsAuthenticated(false);
        setHasSkippedAuth(false);
        setAddresses([]);
        setSelectedAddress(null);
    };

    const register = async (userData) => {
        return await authAPI.register(userData);
    };

    const verifyOtp = async (username, otp) => {
        const data = await authAPI.verifyOTP(username, otp);
        localStorage.setItem('token', data.access_token);

        // Fetch user profile
        const userData = await userAPI.getProfile();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);

        // Reset skip state on successful verification
        sessionStorage.removeItem('quickdrip_auth_skipped');
        setHasSkippedAuth(false);
        setShowAuthPrompt(false);

        // Fetch addresses
        await fetchAddresses();

        return data;
    };

    const resendOtp = async (username) => {
        return await authAPI.resendOTP(username);
    };

    const addAddress = async (addressData) => {
        const newAddress = await userAPI.addAddress(addressData);
        setAddresses(prev => [...prev, newAddress]);

        // Set as selected if it's the first address
        if (addresses.length === 0) {
            setSelectedAddress(newAddress);
            setShowAddressModal(false); // Close modal when first address is added
        }

        return newAddress;
    };

    const updateAddress = async (addressId, addressData) => {
        const updated = await userAPI.updateAddress(addressId, addressData);
        setAddresses(prev => prev.map(addr => addr.id === addressId ? updated : addr));

        if (selectedAddress?.id === addressId) {
            setSelectedAddress(updated);
        }

        return updated;
    };

    const deleteAddress = async (addressId) => {
        await userAPI.deleteAddress(addressId);
        setAddresses(prev => prev.filter(addr => addr.id !== addressId));

        if (selectedAddress?.id === addressId) {
            setSelectedAddress(addresses[0] || null);
        }
    };

    const selectAddress = (address) => {
        setSelectedAddress(address);
        setShowAddressModal(false);
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        hasSkippedAuth,
        showAuthPrompt,
        setShowAuthPrompt,
        skipAuth,
        triggerAuthPrompt,
        checkAuthPromptNeeded,
        requireAuth,
        login,
        logout,
        register,
        verifyOtp,
        resendOtp,
        // Address management
        addresses,
        selectedAddress,
        showAddressModal,
        setShowAddressModal,
        fetchAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        selectAddress,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
