import React from 'react';
import { useCart } from '../context/CartContext';
import { Package, ChevronRight, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrdersPage() {
    const { orders } = useCart();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-30 shadow-sm">
                <h1 className="text-xl font-black uppercase tracking-wide text-center">Your Orders</h1>
            </div>

            <div className="max-w-2xl mx-auto p-4 space-y-4">
                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                        <div className="bg-gray-100 p-6 rounded-full mb-4">
                            <Package className="w-12 h-12 text-gray-400" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">No past orders</h2>
                        <p className="text-gray-500 text-sm">Start shopping to see your orders here.</p>
                        <button onClick={() => navigate('/')} className="mt-6 bg-black text-white px-6 py-2 rounded-lg font-bold text-sm">
                            START SHOPPING
                        </button>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                            {order.status}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium">#{order.id}</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 mt-1">
                                        {order.items.map(i => i.name).join(', ')}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(order.date).toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="block font-black text-gray-900">₹{order.total.toLocaleString()}</span>
                                    <span className="text-xs text-gray-400">{order.items.length} Items</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between border border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-green-600" />
                                    <span className="text-xs font-bold text-green-700 uppercase">Arriving in {order.deliveryTime}</span>
                                </div>
                                <button
                                    onClick={() => navigate('/tracking')}
                                    className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700"
                                >
                                    TRACK ORDER <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
