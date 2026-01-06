import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { menProducts } from '../data/products-men';
import { womenProducts } from '../data/products-women';
import { kidsProducts } from '../data/products-kids';
import { accessoriesProducts } from '../data/products-accessories';
import { Filter, X } from 'lucide-react';

export default function ProductsPage() {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const subcategory = searchParams.get('subcategory');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [priceRange, setPriceRange] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);

    // Get products based on category
    const getProducts = () => {
        switch (category) {
            case 'men': return menProducts;
            case 'women': return womenProducts;
            case 'kids': return kidsProducts;
            case 'accessories': return accessoriesProducts;
            case 'all': return [...menProducts, ...womenProducts, ...kidsProducts, ...accessoriesProducts];
            default: return menProducts;
        }
    };

    const allProducts = getProducts();

    const searchBarQuery = searchParams.get('search');

    // Filter products
    const filteredProducts = allProducts.filter(product => {
        // Filter by subcategory if specified
        if (subcategory && product.category !== subcategory) return false;

        // Filter by search query if specified
        if (searchBarQuery) {
            const query = searchBarQuery.toLowerCase();
            const matchesName = product.name.toLowerCase().includes(query);
            const matchesCategory = product.category.toLowerCase().includes(query);
            if (!matchesName && !matchesCategory) return false;
        }

        if (selectedSize && !product.sizes.includes(selectedSize)) return false;
        if (selectedColor && !product.colors.includes(selectedColor)) return false;

        if (priceRange !== 'all') {
            const price = parseInt(product.price.replace(/[₹,]/g, ''));
            if (priceRange === 'under1000' && price >= 1000) return false;
            if (priceRange === '1000-2000' && (price < 1000 || price >= 2000)) return false;
            if (priceRange === '2000-5000' && (price < 2000 || price >= 5000)) return false;
            if (priceRange === 'above5000' && price < 5000) return false;
        }

        return true;
    });

    // Get unique sizes and colors from all products
    const allSizes = [...new Set(allProducts.flatMap(p => p.sizes))];
    const allColors = [...new Set(allProducts.flatMap(p => p.colors))];

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
        const priceB = parseInt(b.price.replace(/[₹,]/g, ''));

        switch (sortBy) {
            case 'price-low': return priceA - priceB;
            case 'price-high': return priceB - priceA;
            case 'newest': return b.isNew ? 1 : -1;
            default: return 0; // featured
        }
    });

    const clearFilters = () => {
        setSelectedSize('');
        setSelectedColor('');
        setPriceRange('all');
        setSortBy('featured');
    };

    const getCategoryTitle = () => {
        if (searchBarQuery) return `Search results for "${searchBarQuery}"`;
        const titles = {
            men: "Men's Collection",
            women: "Women's Collection",
            kids: "Kids' Collection",
            accessories: "Accessories",
            all: "All Products"
        };
        return titles[category] || "Products";
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                                {subcategory || getCategoryTitle()}
                            </h1>
                            <p className="text-gray-500 mt-2">{sortedProducts.length} Products</p>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="hidden md:block">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
                <div className="flex gap-8">
                    {/* Filters Sidebar - Desktop */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl p-6 sticky top-24">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg uppercase tracking-tight">Filters</h3>
                                {(selectedSize || selectedColor || priceRange !== 'all') && (
                                    <button onClick={clearFilters} className="text-xs text-red-500 font-bold hover:underline">
                                        CLEAR ALL
                                    </button>
                                )}
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h4 className="font-bold text-sm mb-3 uppercase text-gray-700">Price</h4>
                                <div className="space-y-2">
                                    {[
                                        { label: 'All', value: 'all' },
                                        { label: 'Under ₹1,000', value: 'under1000' },
                                        { label: '₹1,000 - ₹2,000', value: '1000-2000' },
                                        { label: '₹2,000 - ₹5,000', value: '2000-5000' },
                                        { label: 'Above ₹5,000', value: 'above5000' }
                                    ].map(range => (
                                        <label key={range.value} className="flex items-center cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="price"
                                                checked={priceRange === range.value}
                                                onChange={() => setPriceRange(range.value)}
                                                className="w-4 h-4 text-black focus:ring-black"
                                            />
                                            <span className="ml-2 text-sm text-gray-600 group-hover:text-black">{range.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Size Filter */}
                            <div className="mb-6">
                                <h4 className="font-bold text-sm mb-3 uppercase text-gray-700">Size</h4>
                                <div className="flex flex-wrap gap-2">
                                    {allSizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                                            className={`px-3 py-1.5 text-xs font-bold rounded border transition-colors ${selectedSize === size
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Filter */}
                            <div>
                                <h4 className="font-bold text-sm mb-3 uppercase text-gray-700">Color</h4>
                                <div className="space-y-2">
                                    {allColors.map(color => (
                                        <label key={color} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedColor === color}
                                                onChange={() => setSelectedColor(selectedColor === color ? '' : color)}
                                                className="w-4 h-4 text-black focus:ring-black rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-600 group-hover:text-black">{color}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setShowFilters(true)}
                        className="lg:hidden fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-2xl z-40 flex items-center gap-2 font-bold text-sm"
                    >
                        <Filter className="w-5 h-5" /> FILTERS
                    </button>

                    {/* Mobile Filters Overlay */}
                    {showFilters && (
                        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowFilters(false)}>
                            <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
                                    <h3 className="font-bold text-lg uppercase">Filters & Sort</h3>
                                    <button onClick={() => setShowFilters(false)} className="p-2">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Sort Options */}
                                    <div>
                                        <h4 className="font-bold text-sm mb-3 uppercase text-gray-700">Sort By</h4>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black"
                                        >
                                            <option value="featured">Featured</option>
                                            <option value="newest">Newest First</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                        </select>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <h4 className="font-bold text-sm mb-3 uppercase text-gray-700">Price</h4>
                                        <div className="space-y-2">
                                            {[
                                                { label: 'All', value: 'all' },
                                                { label: 'Under ₹1,000', value: 'under1000' },
                                                { label: '₹1,000 - ₹2,000', value: '1000-2000' },
                                                { label: '₹2,000 - ₹5,000', value: '2000-5000' },
                                                { label: 'Above ₹5,000', value: 'above5000' }
                                            ].map(range => (
                                                <label key={range.value} className="flex items-center cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="price-mobile"
                                                        checked={priceRange === range.value}
                                                        onChange={() => setPriceRange(range.value)}
                                                        className="w-4 h-4 text-black focus:ring-black"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600 group-hover:text-black">{range.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Size Filter */}
                                    <div>
                                        <h4 className="font-bold text-sm mb-3 uppercase text-gray-700">Size</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {allSizes.map(size => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                                                    className={`px-3 py-1.5 text-xs font-bold rounded border transition-colors ${selectedSize === size
                                                        ? 'bg-black text-white border-black'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Color Filter */}
                                    <div>
                                        <h4 className="font-bold text-sm mb-3 uppercase text-gray-700">Color</h4>
                                        <div className="space-y-2">
                                            {allColors.map(color => (
                                                <label key={color} className="flex items-center cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedColor === color}
                                                        onChange={() => setSelectedColor(selectedColor === color ? '' : color)}
                                                        className="w-4 h-4 text-black focus:ring-black rounded"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600 group-hover:text-black">{color}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Clear Filters Button */}
                                    {(selectedSize || selectedColor || priceRange !== 'all' || sortBy !== 'featured') && (
                                        <button
                                            onClick={clearFilters}
                                            className="w-full py-3 border-2 border-red-500 text-red-500 font-bold rounded-lg hover:bg-red-50 transition-colors"
                                        >
                                            CLEAR ALL FILTERS
                                        </button>
                                    )}

                                    {/* Apply Button */}
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        APPLY FILTERS
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="flex-1">
                        {sortedProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                                <button onClick={clearFilters} className="mt-4 text-red-500 font-bold hover:underline">
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {sortedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
