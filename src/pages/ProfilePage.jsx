import React from 'react';
import { User, Package, Heart, Phone, LogOut, ChevronRight, Mail, MapPin, Settings, CreditCard, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const menuItems = [
        { icon: Package, label: 'Your Orders', subtext: 'Track, return or buy again', path: '/orders', color: 'text-blue-600', bg: 'bg-blue-50' },
        { icon: Heart, label: 'Wishlist', subtext: 'Items you saved for later', path: '/wishlist', color: 'text-red-500', bg: 'bg-red-50' },
        { icon: MapPin, label: 'Saved Addresses', subtext: 'Manage delivery addresses', path: '/addresses', color: 'text-green-600', bg: 'bg-green-50' },
        { icon: CreditCard, label: 'Saved Cards', subtext: 'Manage your payment methods', path: '/payments', color: 'text-purple-600', bg: 'bg-purple-50' },
        { icon: Shield, label: 'Account Security', subtext: 'Passwords & Two-factor', path: '/security', color: 'text-orange-500', bg: 'bg-orange-50' },
        { icon: Phone, label: 'Help & Support', subtext: 'FAQs & Customer Service', path: '/contact', color: 'text-gray-600', bg: 'bg-gray-100' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header / Profile Card */}
            <div className="bg-white px-6 py-8 mb-6 shadow-sm border-b border-gray-100">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-black uppercase tracking-tight">Profile</h1>
                    <button onClick={() => navigate('/settings')} className="p-2 bg-gray-50 rounded-full">
                        <Settings className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <div className="flex items-center gap-5">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-700 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg">
                            {isAuthenticated ? user?.full_name?.charAt(0).toUpperCase() : <User className="w-10 h-10" />}
                        </div>
                        {isAuthenticated && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                        )}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h2 className="font-black text-xl text-gray-900">
                                {isAuthenticated ? user?.full_name : 'Guest User'}
                            </h2>
                            {isAuthenticated && <Shield className="w-4 h-4 text-blue-500" />}
                        </div>

                        {isAuthenticated ? (
                            <div className="mt-1 space-y-0.5">
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <Mail className="w-3.5 h-3.5" />
                                    <span className="text-xs font-medium">{user?.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <Phone className="w-3.5 h-3.5" />
                                    <span className="text-xs font-medium">{user?.phone || 'Add phone number'}</span>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="mt-1 text-red-500 text-sm font-black uppercase tracking-widest hover:underline flex items-center gap-1"
                            >
                                Login / Signup <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="px-4 space-y-4">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                    {menuItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => navigate(item.path)}
                            className={`w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`${item.bg} p-2.5 rounded-xl`}>
                                    <item.icon className={`w-5 h-5 ${item.color}`} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900 text-sm">{item.label}</h3>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{item.subtext}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                        </button>
                    ))}
                </div>

                {isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        className="w-full bg-white p-5 rounded-3xl flex items-center justify-between shadow-sm border border-red-50 hover:bg-red-50 transition-colors mt-6 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-red-50 p-2.5 rounded-xl group-hover:bg-red-100 transition-colors">
                                <LogOut className="w-5 h-5 text-red-600" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-red-600 text-sm">Log Out</h3>
                                <p className="text-[10px] text-red-400 font-medium uppercase tracking-wider">End current session</p>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-red-200" />
                    </button>
                )}

                <div className="pt-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">QuickDrip v1.2.0 • PRO</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

