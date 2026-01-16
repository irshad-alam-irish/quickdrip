import React from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { useCart } from '../context/CartContext';

export default function StickyCart() {
    const { cartCount, totalAmount } = useCart();
    const location = useLocation();

    // Don't show on Cart or Checkout pages
    if (cartCount === 0 || location.pathname === '/cart' || location.pathname === '/checkout') return null;

    return (
        <div className="fixed bottom-[70px] left-4 right-4 z-40 md:hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
            <Link to="/cart" className="bg-black text-white p-3 rounded-xl shadow-xl flex justify-between items-center cursor-pointer hover:bg-gray-900 transition-colors">
                <div className="flex flex-col leading-tight">
                    <span className="text-[10px] uppercase font-bold text-green-100 tracking-wider">
                        {cartCount} ITEMS
                    </span>
                    <span className="text-sm font-black text-white">
                        ₹{totalAmount.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center gap-1 font-bold text-sm tracking-wide">
                    View Cart <ChevronRight className="w-4 h-4" />
                </div>
            </Link>
        </div>
    );
}
