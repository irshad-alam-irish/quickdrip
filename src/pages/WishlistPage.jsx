import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistPage() {
    const { wishlistItems, removeFromWishlist, loading } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToBag = async (item) => {
        try {
            // Create product object from wishlist item
            const product = {
                id: item.product_id,
                name: item.product_name,
                price: item.product_price,
                image_url: item.product_image_url,
                category: item.product_category
            };
            await addToCart(product, 'M'); // Default size
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading wishlist...</p>
                </div>
            </div>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="bg-red-50 p-6 rounded-full mb-6">
                    <Heart className="w-12 h-12 text-red-500 fill-current" />
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Your Wishlist is Empty</h1>
                <p className="text-gray-500 mb-8 max-w-md">
                    Looks like you haven't added any items to your wishlist yet.
                    Start exploring our collection to save your favorite items.
                </p>
                <Link
                    to="/"
                    className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8">
                My Wishlist ({wishlistItems.length})
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                    <div key={item.id} className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                        {/* Remove Button */}
                        <button
                            onClick={() => removeFromWishlist(item.product_id)}
                            className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Product Image */}
                        <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                            <img
                                src={item.product_image_url}
                                alt={item.product_name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                                {item.product_category}
                            </p>
                            <h3 className="font-bold text-gray-900 line-clamp-2 mb-2">
                                {item.product_name}
                            </h3>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-lg font-black text-gray-900">
                                    ₹{item.product_price?.toLocaleString('en-IN')}
                                </span>
                            </div>

                            {/* Add to Bag Button */}
                            <button
                                onClick={() => handleAddToBag(item)}
                                className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                ADD TO BAG
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
