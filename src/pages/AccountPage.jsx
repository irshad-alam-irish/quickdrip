import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Package, Heart, LogOut, Edit as EditIcon, Settings, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';

export default function AccountPage() {
    const { user, isAuthenticated, logout, addresses } = useAuth();
    const [orderStats, setOrderStats] = useState({ count: 0, totalSpent: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderStats = async () => {
            if (isAuthenticated) {
                try {
                    const orders = await orderAPI.getOrders();
                    const total = orders.reduce((sum, order) => sum + (order.total_price || 0), 0);
                    setOrderStats({ count: orders.length, totalSpent: total });
                } catch (error) {
                    console.error('Failed to fetch order stats:', error);
                }
            }
        };
        fetchOrderStats();
    }, [isAuthenticated]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-gray-50">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-10 h-10 text-gray-300" />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 text-gray-900">Your Account</h1>
                    <p className="text-gray-500 mb-8 font-medium">
                        Log in to view your orders, manage your wishlist, and update your profile for a better experience.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-red-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95"
                    >
                        LOGIN TO SEEN ON YOU
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Breadcrumb-like feel */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900">My Account</h1>
                        <p className="text-gray-500 font-medium mt-1">Manage your profile, orders and preferences</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="hidden md:flex items-center gap-2 text-sm font-black text-red-600 uppercase tracking-widest hover:text-red-700 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Profile Information */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-24 h-24 bg-gradient-to-tr from-black to-gray-700 rounded-3xl rotate-3 flex items-center justify-center text-white text-4xl font-black shadow-2xl mb-6 transform transition-transform hover:rotate-0">
                                    <span className="-rotate-3 group-hover:rotate-0 transition-transform">
                                        {user?.full_name?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-black text-gray-900">{user?.full_name || 'User'}</h2>
                                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">Premium Member</p>

                                <button className="mt-4 flex items-center gap-2 text-xs font-black text-black bg-gray-50 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                                    <EditIcon className="w-3 h-3" /> EDIT PROFILE
                                </button>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-gray-50">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 p-2.5 rounded-xl">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                                        <p className="text-sm font-bold text-gray-900 break-all">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-green-50 p-2.5 rounded-xl">
                                        <Phone className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Number</p>
                                        <p className="text-sm font-bold text-gray-900">{user?.phone || '+91 XXXX XXXX'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-red-50 p-2.5 rounded-xl">
                                        <MapPin className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Saved Addresses</p>
                                        <p className="text-sm font-bold text-gray-900">
                                            {addresses?.length || 0} Saved Address
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Stats Box */}
                        <div className="bg-black rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <ShoppingBag className="w-20 h-20 -mr-4 -mt-4" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-widest mb-6">Shopping Stats</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-3xl font-black">{orderStats.count}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Orders Placed</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black">₹{orderStats.totalSpent.toLocaleString()}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total Savings</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Shortcuts & Recent Activity */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Quick Navigation Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: 'My Orders', desc: 'Track your deliveries', icon: Package, link: '/orders', color: 'bg-blue-500' },
                                { title: 'Wishlist', desc: 'Saved for later', icon: Heart, link: '/wishlist', color: 'bg-red-500' },
                                { title: 'Addresses', desc: 'Manage delivery spots', icon: MapPin, link: '/checkout', color: 'bg-green-500' },
                                { title: 'Settings', desc: 'Account preferences', icon: Settings, link: '/profile', color: 'bg-gray-500' },
                            ].map((item, idx) => (
                                <Link
                                    key={idx}
                                    to={item.link}
                                    className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-black transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className={`p-4 rounded-2xl ${item.color} text-white shadow-lg transform transition-transform group-hover:scale-110`}>
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transform transition-all group-hover:translate-x-1" />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mt-6">{item.title}</h3>
                                    <p className="text-gray-500 text-sm font-medium mt-1">{item.desc}</p>
                                </Link>
                            ))}
                        </div>

                        {/* Recent Orders Sneak Peek (UI Placeholder) */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black uppercase tracking-tight">Recent Update</h3>
                                <Link to="/orders" className="text-xs font-black text-black underline underline-offset-4">VIEW HISTORY</Link>
                            </div>

                            {orderStats.count === 0 ? (
                                <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No recent activity found</p>
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white p-3 rounded-xl shadow-sm">
                                            <Package className="w-6 h-6 text-black" />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 uppercase text-sm">Last Order Placed</p>
                                            <p className="text-xs text-gray-500 font-bold">Successfully completed</p>
                                        </div>
                                    </div>
                                    <Link to="/orders" className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Details
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-10 md:hidden">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-50 text-red-600 font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest border border-red-100"
                    >
                        <LogOut className="w-5 h-5" /> Logout from Device
                    </button>
                </div>
            </div>
        </div>
    );
}

