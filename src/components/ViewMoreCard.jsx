import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ViewMoreCard({ to = "/products/all", label = "View All", darkMode = false }) {
    return (
        <Link
            to={to}
            className={`group relative w-full h-full cursor-pointer flex flex-col mb-auto`}
        >
            <div className={`aspect-[3/4] w-full overflow-hidden rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300
                ${darkMode
                    ? 'bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-gray-500'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-400'
                }`}
            >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-90
                    ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black shadow-md'}`}
                >
                    <ArrowRight className="w-8 h-8" />
                </div>

                <span className={`font-black uppercase tracking-widest text-sm
                    ${darkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    {label}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wide mt-2 px-3 py-1 rounded-full
                     ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}
                >
                    See Collection
                </span>
            </div>

            {/* Spacer to match ProductCard height alignment if needed */}
            <div className="mt-4 px-1 opacity-0">
                <div className="h-5 mb-1"></div>
                <div className="h-4 mb-2"></div>
                <div className="h-6"></div>
            </div>
        </Link>
    );
}
