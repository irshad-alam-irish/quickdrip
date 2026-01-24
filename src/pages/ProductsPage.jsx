import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';
import { Filter, X, Loader2 } from 'lucide-react';

export default function ProductsPage() {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const subcategory = searchParams.get('subcategory');
    const searchBarQuery = searchParams.get('search');

    // State
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [priceRange, setPriceRange] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);

    const LIMIT = 20; // Products per page
    const observerTarget = useRef(null);

    // Load products function
    const loadProducts = useCallback(async (reset = false) => {
        if (loading) return;

        setLoading(true);
        try {
            const currentOffset = reset ? 0 : offset;
            const params = {
                limit: LIMIT,
                offset: currentOffset
            };

            // Add category filter if not 'all'
            if (category && category !== 'all') {
                params.category = category.charAt(0).toUpperCase() + category.slice(1);
            }

            const newProducts = await productAPI.getProducts(params);

            if (reset) {
                setProducts(newProducts);
                setOffset(LIMIT);
            } else {
                setProducts(prev => [...prev, ...newProducts]);
                setOffset(prev => prev + LIMIT);
            }

            // Check if there are more products
            setHasMore(newProducts.length === LIMIT);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setLoading(false);
        }
    }, [category, offset, loading]);

    // Reset and load products when category changes
    useEffect(() => {
        setProducts([]);
        setOffset(0);
        setHasMore(true);
        loadProducts(true);
    }, [category, subcategory]);

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadProducts();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, loading, loadProducts]);

    // Filter products (client-side filtering for now)
    const filteredProducts = products.filter(product => {
        // Filter by subcategory if specified
        if (subcategory && product.category !== subcategory) return false;

        // Filter by search query if specified
        if (searchBarQuery) {
            const query = searchBarQuery.toLowerCase();
            const matchesName = product.name.toLowerCase().includes(query);
            const matchesCategory = product.category.toLowerCase().includes(query);
            if (!matchesName && !matchesCategory) return false;
        }

        // Price filter
        if (priceRange !== 'all') {
            const price = product.price;
            if (priceRange === 'under1000' && price >= 1000) return false;
            if (priceRange === '1000-2000' && (price < 1000 || price >= 2000)) return false;
            if (priceRange === '2000-5000' && (price < 2000 || price >= 5000)) return false;
            if (priceRange === 'above5000' && price < 5000) return false;
        }

        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'newest': return (b.created_at || 0) - (a.created_at || 0);
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
                                {(priceRange !== 'all' || sortBy !== 'featured') && (
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
                        {sortedProducts.length === 0 && !loading ? (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                                <button onClick={clearFilters} className="mt-4 text-red-500 font-bold hover:underline">
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {sortedProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Infinite Scroll Trigger */}
                                <div ref={observerTarget} className="flex justify-center py-8">
                                    {loading && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            <span>Loading more products...</span>
                                        </div>
                                    )}
                                    {!hasMore && products.length > 0 && (
                                        <p className="text-gray-500 text-sm">You've reached the end!</p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
