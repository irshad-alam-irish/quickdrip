import React from 'react';
import { Percent, CreditCard } from 'lucide-react';

export default function OfferCarousel() {
    const offers = [
        { id: 1, text: "FLAT ₹500 OFF", sub: "On orders above ₹1499", color: "bg-blue-600", icon: Percent },
        { id: 2, text: "HDFC BANK", sub: "10% Instant Discount", color: "bg-indigo-900", icon: CreditCard },
        { id: 3, text: "FREE DELIVERY", sub: "On your first order", color: "bg-green-600", icon: Percent },
    ];

    return (
        <section className="px-4 py-4 md:px-10">
            <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className={`min-w-[260px] md:min-w-[300px] h-32 rounded-xl ${offer.color} text-white p-5 flex flex-col justify-center relative overflow-hidden snap-start shadow-md cursor-pointer`}
                    >
                        <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                        <div className="relative z-10">
                            <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center mb-3">
                                <offer.icon className="w-4 h-4" />
                            </div>
                            <h3 className="text-xl font-black italic tracking-tighter">{offer.text}</h3>
                            <p className="text-xs font-medium opacity-90">{offer.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
