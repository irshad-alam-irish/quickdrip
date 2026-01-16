import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, X, ChevronRight, Phone } from 'lucide-react';

export default function DeliveryTracking() {
    const [status, setStatus] = useState('preparing'); // preparing, on_the_way, arriving
    const [isOpen, setIsOpen] = useState(true);
    const [progress, setProgress] = useState(10);
    const [timeLeft, setTimeLeft] = useState(14);

    useEffect(() => {
        // Mock simulation of delivery progress
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + 1;
                if (next > 90) return 90; // Stall at 90%

                // Update status based on progress
                if (next > 20 && status === 'preparing') setStatus('on_the_way');
                if (next > 70 && status === 'on_the_way') setStatus('arriving');

                return next;
            });

            setTimeLeft(prev => {
                if (prev <= 1) return 1;
                // Decrease time roughly every few ticks
                return Math.random() > 0.7 ? prev - 1 : prev;
            });

        }, 1000);

        return () => clearInterval(interval);
    }, [status]);

    if (!isOpen) return null;

    // Only show if there's an "active order" (mocked via generic check usually, but here we force show for demo)
    // In real app, check context/redux

    return (
        <div className="fixed bottom-[140px] right-4 z-40 md:right-10 md:bottom-10 w-[90vw] md:w-96 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Map Header */}
                <div className="h-24 bg-gray-100 relative overflow-hidden">
                    {/* Mock Map Background */}
                    <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/41/Simple_Map.png')] bg-cover bg-center"></div>

                    {/* Path Line */}
                    <div className="absolute top-1/2 left-4 right-12 h-1 bg-gray-300 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 transition-all duration-1000 ease-linear"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    {/* Rider Icon */}
                    <div
                        className="absolute top-1/2 -mt-3 transition-all duration-1000 ease-linear z-10"
                        style={{ left: `${progress}%` }}
                    >
                        <div className="bg-black text-white p-1.5 rounded-full shadow-lg">
                            <Navigation className="w-3 h-3 fill-white" />
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-gray-500 hover:text-black"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Status Info */}
                <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                                {status === 'preparing' ? 'Packing Order' : status === 'on_the_way' ? 'On The Way' : 'Arriving Soon'}
                            </span>
                            <h3 className="text-xl font-black text-gray-900 leading-none">
                                {status === 'arriving' ? 'Arriving Now' : `${timeLeft} Mins Left`}
                            </h3>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                                <Clock className="w-3 h-3" /> On Time
                            </div>
                        </div>
                    </div>

                    {/* Rider Info */}
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80" alt="Rider" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-gray-900">Rahul is riding an Ather 450X</p>
                            <p className="text-[10px] text-gray-500">Vaccinated • 4.9 <span className="text-yellow-500">★</span></p>
                        </div>
                        <button className="bg-green-100 p-2 rounded-full text-green-700 hover:bg-green-200 transition-colors">
                            <Phone className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
