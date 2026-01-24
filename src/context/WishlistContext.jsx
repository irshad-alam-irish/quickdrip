import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { wishlistAPI } from '../services/api';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, requireAuth } = useAuth();

    // Load wishlist when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadWishlist();
        } else {
            // Load from localStorage for guests
            const saved = localStorage.getItem('quickdrip_wishlist');
            if (saved) {
                try {
                    setWishlistItems(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse wishlist", e);
                }
            }
        }
    }, [isAuthenticated]);

    // Save guest wishlist to localStorage
    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('quickdrip_wishlist', JSON.stringify(wishlistItems));
        }
    }, [wishlistItems, isAuthenticated]);

    const loadWishlist = async () => {
        try {
            setLoading(true);
            const items = await wishlistAPI.getWishlist();
            setWishlistItems(items);
        } catch (error) {
            console.error('Failed to load wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToWishlist = async (product) => {
        // Require auth before adding to wishlist
        if (!requireAuth()) {
            return;
        }

        if (isAuthenticated) {
            try {
                await wishlistAPI.addToWishlist(product.id);
                await loadWishlist();
            } catch (error) {
                console.error('Failed to add to wishlist:', error);
                throw error;
            }
        } else {
            // Add to guest wishlist
            setWishlistItems(prev => {
                if (prev.find(item => item.id === product.id)) {
                    return prev;
                }
                return [...prev, product];
            });
        }
    };

    const removeFromWishlist = async (productId) => {
        if (isAuthenticated) {
            try {
                await wishlistAPI.removeFromWishlist(productId);
                await loadWishlist();
            } catch (error) {
                console.error('Failed to remove from wishlist:', error);
            }
        } else {
            setWishlistItems(prev => prev.filter(item => item.id !== productId));
        }
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId || item.product_id === productId);
    };

    const clearWishlist = () => {
        setWishlistItems([]);
        if (!isAuthenticated) {
            localStorage.removeItem('quickdrip_wishlist');
        }
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            wishlistCount: wishlistItems.length,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            clearWishlist,
            loading
        }}>
            {children}
        </WishlistContext.Provider>
    );
};
