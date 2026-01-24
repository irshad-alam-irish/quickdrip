import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import { Package, ChevronRight, Clock, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!isAuthenticated) {
                setLoading(false);
                return;
            }
            try {
                const data = await orderAPI.getOrders();
                setOrders(data);
            } catch (err) {
                console.error('Failed to fetch orders:', err);
                setError('Failed to load orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isAuthenticated]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-black animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Fetching your orders...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-gray-50">
                <div className="bg-white p-10 rounded-[32px] shadow-2xl border border-gray-100 max-w-sm w-full">
                    <div className="bg-red-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 border-2 border-red-100">
                        <Package className="w-12 h-12 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 text-gray-900 leading-none">
                        TRACK YOUR <span className="text-red-500">DROPS</span>
                    </h1>
                    <p className="text-gray-500 mb-10 font-medium italic text-sm">
                        Log in to view your order history and live delivery updates.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-red-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95 mb-4"
                    >
                        LOGIN TO SEEN ON YOU
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <h1 className="text-2xl font-black uppercase tracking-tighter">
                        ORDER <span className="text-red-500">HISTORY</span>
                    </h1>
                    <div className="text-[10px] font-black py-1.5 px-4 bg-gray-50 rounded-full border border-gray-100 text-gray-400 uppercase tracking-widest">
                        {orders.length} Total Drops
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 md:p-8">
                {error ? (
                    <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-600">
                        <AlertCircle className="w-5 h-5" />
                        <p className="font-medium">{error}</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-10 h-10 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">No orders found</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't placed any orders yet.</p>
                        <button onClick={() => navigate('/')} className="bg-black text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs font-black uppercase tracking-widest border-b border-gray-100">
                                    <th className="px-6 py-4">Order Details</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Items</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-6">
                                            <div className="font-bold text-gray-900">#{order.id.toString().padStart(6, '0')}</div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="max-w-xs truncate text-sm font-medium text-gray-600">
                                                {order.items?.length || 0} Products
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="font-black text-gray-900">₹{order.total_price.toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <button
                                                onClick={() => navigate(`/orders/${order.id}`)}
                                                className="inline-flex items-center gap-1.5 text-xs font-black text-black hover:text-red-600 transition-colors uppercase tracking-wider"
                                            >
                                                Details <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

