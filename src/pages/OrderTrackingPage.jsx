import React, { useState, useEffect } from 'react';
import { Check, Clock, MapPin, Navigation, Package, Phone, ShoppingBag, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderTrackingPage() {
    const navigate = useNavigate();
    const [orderState, setOrderState] = useState(0);
    // 0: Order Placed, 1: Packing, 2: Rider Assigned, 3: Out for Delivery, 4: Arrived

    useEffect(() => {
        // Simulate Order Steps
        const timers = [
            setTimeout(() => setOrderState(1), 2000), // Packing
            setTimeout(() => setOrderState(2), 5000), // Rider
            setTimeout(() => setOrderState(3), 8000), // On way
            setTimeout(() => setOrderState(4), 20000) // Arrived (long delay for map demo)
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    // Progress bar for Map
    const [riderProgress, setRiderProgress] = useState(0);
    useEffect(() => {
        if (orderState === 3) {
            const interval = setInterval(() => {
                setRiderProgress(prev => Math.min(prev + 1, 95));
            }, 100);
            return () => clearInterval(interval);
        }
    }, [orderState]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Left Panel: Status Timeline */}
            <div className="w-full md:w-1/3 bg-white p-6 md:h-screen md:overflow-y-auto border-r border-gray-100 z-20 shadow-xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-black uppercase tracking-tight mb-1">Order #QD-9281</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Estimated Delivery: 12 Mins</p>
                </div>

                {/* Timeline */}
                <div className="space-y-8 relative pl-4 border-l-2 border-gray-100 ml-2">
                    {/* Step 1 */}
                    <div className="relative">
                        <div className={`absolute -left-[21px] top-0 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-colors ${orderState >= 0 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                            <Check className="w-4 h-4" />
                        </div>
                        <div className={`transition-opacity ${orderState >= 0 ? 'opacity-100' : 'opacity-40'}`}>
                            <h3 className="font-bold text-gray-900">Order Placed</h3>
                            <p className="text-xs text-gray-500">We have received your order.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative">
                        <div className={`absolute -left-[21px] top-0 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-colors ${orderState >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                            <ShoppingBag className="w-4 h-4" />
                        </div>
                        <div className={`transition-opacity ${orderState >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                            <h3 className="font-bold text-gray-900">Packing Order</h3>
                            <p className="text-xs text-gray-500">Store is packing your items.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative">
                        <div className={`absolute -left-[21px] top-0 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-colors ${orderState >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                            <Truck className="w-4 h-4" />
                        </div>
                        <div className={`transition-opacity ${orderState >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                            <h3 className="font-bold text-gray-900">Rider Assigned</h3>
                            {orderState >= 2 && (
                                <div className="mt-3 bg-gray-50 p-3 rounded-xl flex items-center gap-3 border border-gray-100">
                                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80" className="w-10 h-10 rounded-full object-cover" alt="Rider" />
                                    <div>
                                        <p className="text-sm font-bold">Rahul S.</p>
                                        <p className="text-[10px] text-gray-500">Vaccinated • Ather 450X</p>
                                    </div>
                                    <button className="ml-auto bg-green-100 p-2 rounded-full text-green-700">
                                        <Phone className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Step 4 */}
                    <div className="relative">
                        <div className={`absolute -left-[21px] top-0 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-colors ${orderState >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                            <Navigation className="w-4 h-4" />
                        </div>
                        <div className={`transition-opacity ${orderState >= 3 ? 'opacity-100' : 'opacity-40'}`}>
                            <h3 className="font-bold text-gray-900">Out for Delivery</h3>
                            <p className="text-xs text-gray-500">Rider is on the way to your location.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Map View */}
            <div className="flex-1 relative bg-gray-200 h-[60vh] md:h-screen overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/41/Simple_Map.png')] bg-cover bg-center opacity-70"></div>

                {/* Map Overlay Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Route Line Simulation */}
                    <svg className="w-full h-full absolute inset-0">
                        <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#10b981" strokeWidth="4" strokeDasharray="10 5" className="opacity-50" />
                    </svg>

                    {/* Shop Marker */}
                    <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-white p-2 rounded-full shadow-lg">
                            <ShoppingBag className="w-6 h-6 text-black" />
                        </div>
                        <div className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded mt-2 whitespace-nowrap">Quickdrip Store</div>
                    </div>

                    {/* Home Marker */}
                    <div className="absolute bottom-[20%] right-[20%] translate-x-1/2 translate-y-1/2">
                        <div className="bg-red-500 p-2 rounded-full shadow-lg animate-bounce">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    {/* Moving Rider */}
                    {orderState >= 3 && (
                        <div
                            className="absolute transition-all duration-300 ease-linear z-10"
                            style={{
                                top: `${20 + (riderProgress * 0.6)}%`,
                                left: `${20 + (riderProgress * 0.6)}%`
                            }}
                        >
                            <div className="bg-black text-white p-2 rounded-full shadow-2xl ring-4 ring-green-500/30">
                                <Navigation className="w-5 h-5 fill-white rotate-45" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Cancel / Help Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-gray-50">HELP</button>
                </div>
            </div>
        </div>
    );
}
