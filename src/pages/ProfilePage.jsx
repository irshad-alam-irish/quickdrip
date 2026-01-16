import React from 'react';
import { User, Package, Heart, Phone, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const navigate = useNavigate();

    const menuItems = [
        { icon: Package, label: 'Your Orders', subtext: 'Check order status', path: '/orders' },
        { icon: Heart, label: 'Wishlist', subtext: 'Your saved items', path: '/wishlist' },
        { icon: Phone, label: 'Contact Us', subtext: 'Help & Support', path: '/contact' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white p-6 mb-4 shadow-sm">
                <h1 className="text-2xl font-black uppercase tracking-tight mb-2">My Account</h1>
                <p className="text-gray-500 text-sm">Manage your orders and details</p>

                <div className="mt-6 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
                        <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg text-gray-900">Guest User</h2>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-red-500 text-xs font-bold uppercase tracking-wider hover:underline"
                        >
                            Login / Signup
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Links */}
            <div className="px-4 space-y-3">
                {menuItems.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => navigate(item.path)}
                        className="w-full bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-gray-100 active:scale-98 transition-transform"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-gray-50 p-2 rounded-full">
                                <item.icon className="w-5 h-5 text-gray-700" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-gray-900 text-sm">{item.label}</h3>
                                <p className="text-xs text-gray-400">{item.subtext}</p>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                    </button>
                ))}

                <button className="w-full bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-gray-100 mt-6 text-red-500">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-50 p-2 rounded-full">
                            <LogOut className="w-5 h-5 text-red-500" />
                        </div>
                        <span className="font-bold text-sm">Log Out</span>
                    </div>
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest">App Version 1.0.0</p>
            </div>
        </div>
    );
}
