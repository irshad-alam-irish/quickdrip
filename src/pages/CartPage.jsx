import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="bg-gray-100 p-6 rounded-full mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-900" />
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Your Bag is Empty</h1>
                <p className="text-gray-500 mb-8 max-w-md">
                    You haven't added any items to your bag yet.
                    Check out our latest drops and secure the drip.
                </p>
                <Link
                    to="/"
                    className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8">Shopping Bag ({cartItems.length})</h1>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Cart Items List */}
                <div className="flex-1 space-y-6">
                    {cartItems.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm">
                            <div className="w-24 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.category}</p>
                                            <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                                            className="text-gray-400 hover:text-red-500 p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 mt-1">Size: {item.selectedSize || 'M'}</p>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                                            className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm hover:bg-gray-100 disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                                            className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm hover:bg-gray-100"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-lg font-black">{item.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Wrapper for sticky summary on desktop */}
                <div className="lg:w-[400px]">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl sticky top-24">
                        <h2 className="font-black uppercase tracking-wide mb-6">Order Summary</h2>

                        <div className="space-y-4 text-sm mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-bold text-gray-900">₹{totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600 font-bold">FREE</span>
                            </div>
                            <div className="h-px bg-gray-100"></div>
                            <div className="flex justify-between text-base font-black">
                                <span>Total</span>
                                <span>₹{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/20"
                        >
                            Checkout <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Mobile Bottom Bar spacer to prevent content being hidden behind sticky element if any */}
                <div className="h-20 lg:hidden block"></div>
            </div>
        </div>
    );
}
