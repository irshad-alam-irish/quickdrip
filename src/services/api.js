import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ==================== AUTH APIs ====================

export const authAPI = {
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    verifyOTP: async (username, otp) => {
        const response = await api.post('/auth/verify-otp', { username, otp });
        return response.data;
    },

    resendOTP: async (username) => {
        const response = await api.post('/auth/resend-otp', { username });
        return response.data;
    },

    checkUserStatus: async (username) => {
        const response = await api.post('/auth/check-user-status', { username });
        return response.data;
    },

    forgotPassword: async (username) => {
        const response = await api.post('/auth/forgot-password', { username });
        return response.data;
    },

    resetPassword: async (username, otp, new_password) => {
        const response = await api.post('/auth/reset-password', { username, otp, new_password });
        return response.data;
    },
};

// ==================== USER APIs ====================

export const userAPI = {
    getProfile: async () => {
        const response = await api.get('/users/me');
        return response.data;
    },

    updateProfile: async (userData) => {
        const response = await api.put('/users/me', userData);
        return response.data;
    },

    // Address management
    getAddresses: async () => {
        const response = await api.get('/users/addresses');
        return response.data;
    },

    addAddress: async (addressData) => {
        const response = await api.post('/users/addresses', addressData);
        return response.data;
    },

    updateAddress: async (addressId, addressData) => {
        const response = await api.put(`/users/addresses/${addressId}`, addressData);
        return response.data;
    },

    deleteAddress: async (addressId) => {
        await api.delete(`/users/addresses/${addressId}`);
    },

    setDefaultAddress: async (addressId) => {
        const response = await api.put(`/users/addresses/${addressId}/default`);
        return response.data;
    },
};

// ==================== CART APIs ====================

export const cartAPI = {
    getCart: async () => {
        const response = await api.get('/cart');
        return response.data;
    },

    addToCart: async (productId, quantity = 1) => {
        const response = await api.post('/cart/', { product_id: productId, quantity });
        return response.data;
    },

    updateCartItem: async (itemId, quantity) => {
        const response = await api.patch(`/cart/${itemId}`, { quantity });
        return response.data;
    },

    removeFromCart: async (itemId) => {
        await api.delete(`/cart/${itemId}`);
    },

    clearCart: async () => {
        await api.delete('/cart');
    },
};

// ==================== ORDER APIs ====================

export const orderAPI = {
    getOrders: async () => {
        const response = await api.get('/orders');
        return response.data;
    },

    getOrderById: async (orderId) => {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    },

    createOrder: async (orderData) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },
};

// ==================== PRODUCT APIs ====================

export const productAPI = {
    getProducts: async (params = {}) => {
        const response = await api.get('/products/', { params });
        return response.data;
    },

    getProductById: async (productId) => {
        const response = await api.get(`/products/${productId}`);
        return response.data;
    },

    getFeaturedProducts: async () => {
        const response = await api.get('/products/featured');
        return response.data;
    },

    getProductsByFeature: async (featureSlug) => {
        const response = await api.get('/products/', { params: { feature: featureSlug } });
        return response.data;
    },

    searchProducts: async (query) => {
        const response = await api.get('/products/', { params: { search: query } });
        return response.data;
    },
};

// ==================== WISHLIST APIs (if backend supports) ====================

export const wishlistAPI = {
    getWishlist: async () => {
        try {
            const response = await api.get('/wishlist');
            return response.data;
        } catch (error) {
            // If wishlist endpoint doesn't exist yet, return empty array
            if (error.response?.status === 404) {
                return [];
            }
            throw error;
        }
    },

    addToWishlist: async (productId) => {
        const response = await api.post('/wishlist', { product_id: productId });
        return response.data;
    },

    removeFromWishlist: async (productId) => {
        await api.delete(`/wishlist/${productId}`);
    },
};

// ==================== COLLECTION APIs ====================

export const collectionAPI = {
    getFeaturedDrops: async () => {
        const response = await api.get('/featured-drops');
        return response.data;
    },

    getOfficialMerch: async () => {
        const response = await api.get('/official-merch');
        return response.data;
    },

    getSuperfastDelivery: async () => {
        const response = await api.get('/superfast-delivery');
        return response.data;
    },
};

export default api;

