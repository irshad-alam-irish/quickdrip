import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Star, Eye, Zap, Loader2, Check, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, onQuickView, darkMode = false }) => {
    const { cartItems, addToCart, updateQuantity } = useCart();
    const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
    const [isAdding, setIsAdding] = useState(false);

    // Check if product is in cart
    const cartItem = cartItems.find(item => item.product_id === product.id || item.id === product.id);
    const isInCart = !!cartItem;
    const cartQuantity = cartItem?.quantity || 0;

    // Check if product is in wishlist
    const isInWishlist = wishlistItems.some(item => item.product_id === product.id || item.id === product.id);

    // Format price - handle both string and number formats
    const formatPrice = (price) => {
        if (!price) return '';
        if (typeof price === 'string') return price;
        return `₹${price.toLocaleString('en-IN')}`;
    };

    const handleAdd = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isAdding) return;

        setIsAdding(true);
        try {
            await addToCart(product, 'M'); // Default size for quick add
        } catch (error) {
            console.error('Failed to add to cart:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleIncrement = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isAdding || !cartItem) return;

        setIsAdding(true);
        try {
            // Use product_id from cart item for backend, or product.id for guest cart
            const productId = cartItem.product_id || product.id;
            await updateQuantity(productId, cartItem.selectedSize || 'M', 1);
        } catch (error) {
            console.error('Failed to update quantity:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleDecrement = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isAdding || !cartItem) return;

        setIsAdding(true);
        try {
            // Use product_id from cart item for backend, or product.id for guest cart
            const productId = cartItem.product_id || product.id;
            await updateQuantity(productId, cartItem.selectedSize || 'M', -1);
        } catch (error) {
            console.error('Failed to update quantity:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleWishlistToggle = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        try {
            if (isInWishlist) {
                await removeFromWishlist(product.id);
            } else {
                await addToWishlist(product);
            }
        } catch (error) {
            console.error('Failed to toggle wishlist:', error);
        }
    };

    const handleQuickView = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (onQuickView) {
            onQuickView(product);
        }
    };

    return (
        <div
            className="group relative w-full cursor-pointer"
            onClick={() => onQuickView && onQuickView(product)}
        >
            {/* Image Container with Hover Zoom & Overlay */}
            <div className={`aspect-[3/4] w-full overflow-hidden rounded-xl relative shadow-sm group-hover:shadow-xl transition-all duration-500 ${darkMode ? 'bg-gray-900 shadow-purple-900/20' : 'bg-gray-100'}`}>
                <img
                    src={product.image_url || product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Badges */}
                {product.isNew && (
                    <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest clip-path-slant shadow-lg">
                        NEW DROP
                    </span>
                )}
                {product.discount && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-md">
                        {product.discount}
                    </span>
                )}

                {/* Floating Actions (Right Side) - ALWAYS VISIBLE */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <button
                        onClick={handleWishlistToggle}
                        className={`p-2 rounded-full shadow-lg transition-all ${isInWishlist
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-gray-800 hover:bg-red-500 hover:text-white'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-white' : ''}`} />
                    </button>
                    <button
                        onClick={handleQuickView}
                        className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                </div>

                {/* Cart Button - Shows Add or Quantity Controls */}
                {!isInCart ? (
                    <button
                        className={`absolute bottom-4 left-4 right-4 font-bold py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center 
                        ${isAdding ? 'bg-gray-400 text-white' : 'bg-white text-black hover:bg-red-500 hover:text-white'}`}
                        onClick={handleAdd}
                        disabled={isAdding}
                    >
                        {isAdding ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <ShoppingBag className="w-4 h-4 mr-2" /> ADD TO BAG
                            </>
                        )}
                    </button>
                ) : (
                    <div className="absolute bottom-4 left-4 right-4 bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-lg flex items-center justify-between opacity-100">
                        <button
                            onClick={handleDecrement}
                            disabled={isAdding}
                            className="w-8 h-8 flex items-center justify-center bg-white/20 rounded hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">{cartQuantity} IN BAG</span>
                        </span>
                        <button
                            onClick={handleIncrement}
                            disabled={isAdding}
                            className="w-8 h-8 flex items-center justify-center bg-white/20 rounded hover:bg-white/30 disabled:opacity-50 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="mt-4 px-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-sm font-bold line-clamp-1 uppercase tracking-tight group-hover:text-red-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {product.name}
                    </h3>
                    <div className="flex items-center text-xs font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" /> 4.8
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <p className="text-xs text-gray-500">{product.category}</p>
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded text-[10px] font-bold text-green-700 border border-green-100">
                        <Zap className="w-3 h-3 fill-green-700" />
                        14 Mins
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-baseline space-x-2">
                        <span className={`text-base font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatPrice(product.price)}</span>
                        {(product.original_price || product.originalPrice) && (
                            <span className="text-xs text-gray-400 line-through decoration-red-500 decoration-2">{formatPrice(product.original_price || product.originalPrice)}</span>
                        )}
                    </div>
                    {/* Color Dots */}
                    <div className="flex -space-x-1">
                        <div className="w-3 h-3 rounded-full bg-black border border-white ring-1 ring-gray-200"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-400 border border-white ring-1 ring-gray-200"></div>
                        <div className="w-3 h-3 rounded-full bg-red-500 border border-white ring-1 ring-gray-200"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
