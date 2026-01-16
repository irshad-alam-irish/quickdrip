import React, { useState } from 'react';
import { X, Star, Zap, ShoppingBag, Check, Loader2 } from 'lucide-react';

export default function ProductModal({ product, isOpen, onClose }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    if (!isOpen || !product) return null;

    const sizes = ['S', 'M', 'L', 'XL'];

    const handleAdd = () => {
        if (!selectedSize) return;
        setIsAdding(true);
        setTimeout(() => {
            setIsAdding(false);
            setIsAdded(true);
            setTimeout(() => {
                setIsAdded(false);
                onClose();
            }, 1000);
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal/Sheet */}
            <div className={`
                relative w-full md:w-[800px] bg-white md:rounded-2xl rounded-t-3xl shadow-2xl overflow-hidden pointer-events-auto
                max-h-[90vh] flex flex-col md:flex-row
                animate-in slide-in-from-bottom duration-300
            `}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white text-gray-500 hover:text-black transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative bg-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />
                        arriving in 14 mins
                    </div>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
                    <div className="mb-1">
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{product.category || "Urban Collection"}</span>
                    </div>

                    <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-2">{product.name}</h2>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-black">{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through decoration-red-500 decoration-2">{product.originalPrice}</span>
                        )}
                        <div className="ml-auto flex items-center text-xs font-bold bg-green-50 text-green-700 px-2 py-1 rounded">
                            <Star className="w-3 h-3 fill-green-700 mr-1" /> 4.8
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div>
                            <span className="text-xs font-bold text-gray-900 uppercase block mb-2">Select Size</span>
                            <div className="flex gap-3">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-sm transition-all
                                            ${selectedSize === size
                                                ? 'border-black bg-black text-white'
                                                : 'border-gray-200 text-gray-400 hover:border-gray-400'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button
                            onClick={handleAdd}
                            disabled={!selectedSize || isAdding}
                            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all
                                ${!selectedSize
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : isAdded
                                        ? 'bg-green-600 text-white'
                                        : 'bg-black text-white hover:bg-gray-800 active:scale-95'
                                }`}
                        >
                            {isAdding ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : isAdded ? (
                                <>
                                    <Check className="w-5 h-5" /> Added to Bag
                                </>
                            ) : (
                                <>
                                    <ShoppingBag className="w-4 h-4" />
                                    {selectedSize ? 'Add to Bag' : 'Select Size'}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
