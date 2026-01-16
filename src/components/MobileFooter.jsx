import React from 'react';
import { Home, Grid, ShoppingBag, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function MobileFooter() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 px-6 flex justify-between items-center z-50 md:hidden pb-safe">
            <NavLink
                to="/"
                className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-red-500' : 'text-gray-400'}`}
            >
                <div className="relative">
                    <Home className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide">Home</span>
            </NavLink>

            <NavLink
                to="/products/all"
                className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-red-500' : 'text-gray-400'}`}
            >
                <Grid className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-wide">Categories</span>
            </NavLink>

            <div className="flex flex-col items-center -mt-6">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg border-4 border-white cursor-pointer hover:scale-105 transition-transform">
                    <ShoppingBag className="w-6 h-6 text-white" />
                </div>
            </div>

            <NavLink
                to="/cart"
                className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-red-500' : 'text-gray-400'}`}
            >
                <ShoppingBag className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-wide">Bag</span>
            </NavLink>

            <NavLink
                to="/profile"
                className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-red-500' : 'text-gray-400'}`}
            >
                <User className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-wide">Account</span>
            </NavLink>
        </div>
    );
}
