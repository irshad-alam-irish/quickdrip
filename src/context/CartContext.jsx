import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { cartAPI } from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, requireAuth } = useAuth();

    // Load cart on mount and when auth changes
    useEffect(() => {
        loadCart();
    }, [isAuthenticated]);

    const loadCart = async () => {
        if (isAuthenticated) {
            // Fetch cart from backend
            try {
                setLoading(true);
                const backendCart = await cartAPI.getCart();

                // Backend returns {items: [], total_items, total_price}
                const cartArray = backendCart.items || [];
                setCartItems(cartArray);

                // Merge guest cart if exists
                const guestCart = JSON.parse(localStorage.getItem('quickdrip_cart') || '[]');
                if (guestCart.length > 0) {
                    // Add guest items to backend cart
                    for (const item of guestCart) {
                        await cartAPI.addToCart(item.id, item.quantity);
                    }
                    // Clear guest cart
                    localStorage.removeItem('quickdrip_cart');
                    // Reload cart
                    const updatedCart = await cartAPI.getCart();
                    setCartItems(updatedCart.items || []);
                }
            } catch (error) {
                console.error('Failed to load cart:', error);
                setCartItems([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        } else {
            // Load from localStorage for guests
            const savedCart = localStorage.getItem('quickdrip_cart');
            if (savedCart) {
                try {
                    const parsed = JSON.parse(savedCart);
                    setCartItems(Array.isArray(parsed) ? parsed : []);
                } catch (e) {
                    console.error("Failed to parse cart", e);
                    setCartItems([]);
                }
            } else {
                setCartItems([]);
            }
        }

        // Load orders
        const savedOrders = localStorage.getItem('quickdrip_orders');
        if (savedOrders) {
            try {
                const parsed = JSON.parse(savedOrders);
                setOrders(Array.isArray(parsed) ? parsed : []);
            } catch (e) {
                console.error("Failed to parse orders", e);
                setOrders([]);
            }
        }
    };

    // Save guest cart to localStorage
    useEffect(() => {
        if (!isAuthenticated && Array.isArray(cartItems)) {
            localStorage.setItem('quickdrip_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isAuthenticated]);

    useEffect(() => {
        if (Array.isArray(orders)) {
            localStorage.setItem('quickdrip_orders', JSON.stringify(orders));
        }
    }, [orders]);

    const addOrder = (order) => {
        setOrders(prev => [order, ...prev]);
    };

    const addToCart = async (product, size) => {
        // Require auth before adding to cart
        if (!requireAuth()) {
            return;
        }

        if (isAuthenticated) {
            // Add to backend cart
            try {
                await cartAPI.addToCart(product.id, 1);
                // Reload cart from backend
                const updatedCart = await cartAPI.getCart();
                setCartItems(updatedCart.items || []);
            } catch (error) {
                console.error('Failed to add to cart:', error);
                throw error;
            }
        } else {
            // Add to guest cart (localStorage)
            setCartItems(prev => {
                const prevArray = Array.isArray(prev) ? prev : [];
                const existingItem = prevArray.find(item => item.id === product.id && item.selectedSize === size);
                if (existingItem) {
                    return prevArray.map(item =>
                        item.id === product.id && item.selectedSize === size
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return [...prevArray, { ...product, selectedSize: size || 'M', quantity: 1 }];
            });
        }
    };

    const removeFromCart = async (productId, size) => {
        if (isAuthenticated) {
            try {
                // Find cart item by product ID
                const itemsArray = Array.isArray(cartItems) ? cartItems : [];
                const item = itemsArray.find(i => i.product_id === productId);
                if (item) {
                    await cartAPI.removeFromCart(item.id);
                    const updatedCart = await cartAPI.getCart();
                    setCartItems(updatedCart.items || []);
                }
            } catch (error) {
                console.error('Failed to remove from cart:', error);
            }
        } else {
            setCartItems(prev => {
                const prevArray = Array.isArray(prev) ? prev : [];
                return prevArray.filter(item => !(item.id === productId && item.selectedSize === size));
            });
        }
    };

    const updateQuantity = async (productId, size, change) => {
        if (isAuthenticated) {
            try {
                const itemsArray = Array.isArray(cartItems) ? cartItems : [];
                const item = itemsArray.find(i => i.product_id === productId);
                if (item) {
                    const newQuantity = item.quantity + change;
                    if (newQuantity <= 0) {
                        await removeFromCart(productId, size);
                    } else {
                        await cartAPI.updateCartItem(item.id, newQuantity);
                        const updatedCart = await cartAPI.getCart();
                        setCartItems(updatedCart.items || []);
                    }
                }
            } catch (error) {
                console.error('Failed to update quantity:', error);
            }
        } else {
            setCartItems(prev => {
                const prevArray = Array.isArray(prev) ? prev : [];
                return prevArray.map(item => {
                    if (item.id === productId && item.selectedSize === size) {
                        const newQuantity = Math.max(0, item.quantity + change);
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                }).filter(item => item.quantity > 0);
            });
        }
    };

    const clearCart = async () => {
        if (isAuthenticated) {
            try {
                await cartAPI.clearCart();
                setCartItems([]);
            } catch (error) {
                console.error('Failed to clear cart:', error);
            }
        } else {
            setCartItems([]);
        }
    };

    // Ensure cartItems is always an array before using reduce
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
    const cartCount = safeCartItems.reduce((total, item) => total + (item.quantity || 0), 0);

    // Parse price string (e.g. "₹2,499") to number
    const getCartTotal = () => {
        return safeCartItems.reduce((total, item) => {
            const price = item.price_at_addition || parseInt(item.price?.replace(/[^0-9]/g, '') || '0');
            return total + (price * item.quantity);
        }, 0);
    };

    const totalAmount = getCartTotal();

    return (
        <CartContext.Provider value={{
            cartItems: safeCartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            totalAmount,
            orders,
            addOrder,
            loading
        }}>
            {children}
        </CartContext.Provider>
    );
};