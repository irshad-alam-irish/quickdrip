import React from 'react';
import { ShoppingBag, Heart, Star, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative w-full cursor-pointer">
            {/* Image Container with Hover Zoom & Overlay */}
            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 relative shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Badges */}
                {product.isNew && (
                    <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest clip-path-slant shadow-lg">
                        NEW DROP
                    </span>
                )}
                {product.discount && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-md">
                        {product.discount}
                    </span>
                )}

                {/* Floating Actions (Right Side) */}
                <div className="absolute top-12 right-3 flex flex-col space-y-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
                    <button className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors">
                        <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>
                </div>

                {/* Quick Add Button (Bottom) */}
                <button className="absolute bottom-4 left-4 right-4 bg-white text-black font-bold py-3 rounded-lg shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-red-500 hover:text-white">
                    <ShoppingBag className="w-4 h-4 mr-2" /> ADD TO BAG
                </button>
            </div>

            {/* Product Info */}
            <div className="mt-4 px-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                        {product.name}
                    </h3>
                    <div className="flex items-center text-xs font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" /> 4.8
                    </div>
                </div>

                <p className="text-xs text-gray-500 mb-2">{product.category}</p>

                <div className="flex justify-between items-center">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-base font-black text-gray-900">{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through decoration-red-500 decoration-2">{product.originalPrice}</span>
                        )}
                    </div>
                    {/* Color Dots */}
                    <div className="flex -space-x-1">
                        <div className="w-3 h-3 rounded-full bg-black border border-white ring-1 ring-gray-200"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-400 border border-white ring-1 ring-gray-200"></div>
                        <div className="w-3 h-3 rounded-full bg-red-500 border border-white ring-1 ring-gray-200"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
