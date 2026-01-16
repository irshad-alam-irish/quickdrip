import React, { useState, useEffect } from 'react';
import { Search, X, Clock, TrendingUp, ChevronRight } from 'lucide-react';

export default function SearchOverlay({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [recentSearches, setRecentSearches] = useState(['oversized t-shirt', 'cargo pants', 'sneakers']);
    const trendingSearches = ['Summer Collection', 'Black Hoodie', 'Baggy Jeans', 'Varsity Jacket'];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-white animate-in fade-in duration-200">
            {/* Search Header */}
            <div className="flex items-center gap-4 p-4 border-b border-gray-100">
                <button onClick={onClose} className="p-2 -ml-2 text-gray-500 hover:text-black">
                    <X className="w-6 h-6" />
                </button>
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        autoFocus
                        placeholder="Search for products, brands and more"
                        className="w-full bg-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Content Scroller */}
            <div className="overflow-y-auto h-[calc(100vh-80px)] p-4 pb-20">

                {/* Recent Searches */}
                {recentSearches.length > 0 && !searchTerm && (
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Recent Searches</h3>
                        <div className="flex flex-wrap gap-3">
                            {recentSearches.map((term, idx) => (
                                <button key={idx} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-black transition-colors">
                                    <Clock className="w-3 h-3 text-gray-400" /> {term}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Trending */}
                {!searchTerm && (
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Trending Near You</h3>
                        <div className="space-y-4">
                            {trendingSearches.map((term, idx) => (
                                <div key={idx} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-lg -mx-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-gray-800">{term}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search Results Mockup */}
                {searchTerm && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-sm">Searching for <span className="font-bold text-black">"{searchTerm}"</span>...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
