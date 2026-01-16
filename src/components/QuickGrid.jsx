import React from 'react';
import { Link } from 'react-router-dom';

export default function QuickGrid() {
    const categories = [
        { name: 'T-Shirts', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=200&auto=format&fit=crop' },
        { name: 'Hoodies', img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=200&auto=format&fit=crop' },
        { name: 'Jeans', img: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=200&auto=format&fit=crop' },
        { name: 'Shoes', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=200&auto=format&fit=crop' },
        { name: 'Jackets', img: 'https://images.unsplash.com/photo-1551028919-645362e6ae5c?q=80&w=200&auto=format&fit=crop' },
        { name: 'Shorts', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=200&auto=format&fit=crop' },
        { name: 'Caps', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=200&auto=format&fit=crop' },
        { name: 'Watches', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=200&auto=format&fit=crop' },
    ];

    return (
        <section className="px-4 py-2 md:px-10">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Shop by Category</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-y-6 gap-x-2">
                {categories.map((cat, i) => (
                    <Link to={`/products/${cat.name.toLowerCase()}`} key={i} className="flex flex-col items-center group cursor-pointer">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group-hover:scale-105">
                            <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="mt-2 text-[10px] md:text-xs font-bold text-gray-700 text-center leading-tight group-hover:text-red-500 transition-colors">
                            {cat.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
