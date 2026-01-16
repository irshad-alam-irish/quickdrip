import SEO from '../components/SEO';
import { ArrowRight, Sparkles, Flame, Clock, ArrowUpRight, Play, Instagram, Truck, RotateCcw, ShieldCheck, Headphones, Mail, User, MessageSquare, Send, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroFashion from '../assets/hero-fashion.png';
import sneakerDrop from '../assets/sneaker-drop.png';
import abstractBg from '../assets/abstract-bg.png';
import React, { useState } from 'react';

import ProductCard from '../components/ProductCard';
import OfferCarousel from '../components/OfferCarousel';
import QuickGrid from '../components/QuickGrid';
import ProductModal from '../components/ProductModal';
import { menProducts } from '../data/products-men';
import { womenProducts } from '../data/products-women';

export default function HomePage() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Featured products - mix from different categories
    const featuredProducts = [
        ...menProducts.slice(0, 3),
        ...womenProducts.slice(0, 3)
    ];
    // Dummy Data for Drops
    const featuredDrops = [
        { id: 1, name: 'Cyber Puffer V2', price: '₹8,999', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop', isNew: true },
        { id: 2, name: 'Acid Wash Tee', price: '₹2,499', category: 'T-Shirts', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop', discount: '-20%' },
        { id: 3, name: 'Neo-Cargo Pants', price: '₹5,499', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=800&auto=format&fit=crop' },
        { id: 4, name: 'Distressed Hoodie', price: '₹4,999', category: 'Hoodies', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop', isNew: true },
        { id: 5, name: 'Reflective Cap', price: '₹1,999', category: 'Accessories', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop' },
    ];

    return (
        <>
            <SEO
                title="Quickdrip | Gen Z Fashion & Streetwear"
                description="The ultimate destination for next-gen fashion. Cop the latest drops, oversized fits, and trending aesthetic gear."
                keywords="streetwear, gen z fashion, aesthetic, drops, sneakers"
            />

            {/* Top Offers & Categories */}
            <div className="bg-gray-50/50 pb-6 border-b border-gray-100">
                <OfferCarousel />
                <QuickGrid />
            </div>

            {/* Trending Scrolling Text */}
            {/* Our Brands - Premium & Aesthetic */}
            <section className="py-10 border-b border-gray-50 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <p className="text-center text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase mb-8">Official Partners</p>
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-12">
                        {[
                            { name: 'H&M', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png' },
                            { name: 'Levi\'s', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Levi_Strauss_%26_Co._logo.svg/1200px-Levi_Strauss_%26_Co._logo.svg.png' },
                            { name: 'Zara', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1200px-Zara_Logo.svg.png' },
                            { name: 'Nike', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png' },
                            { name: 'Adidas', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png' },
                            { name: 'Puma', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Puma-Logo.svg/1200px-Puma-Logo.svg.png' }
                        ].map((brand, i) => (
                            <div key={i} className="group cursor-pointer flex items-center justify-center p-2 transition-all duration-300 hover:scale-110">
                                <img
                                    src={brand.url}
                                    alt={brand.name}
                                    className="h-8 md:h-12 w-auto object-contain"
                                    onError={(e) => {
                                        if (e.target) {
                                            e.target.style.display = 'none';
                                            const parent = e.target.parentNode;
                                            if (parent) {
                                                parent.innerText = brand.name;
                                                parent.classList.add('text-lg', 'font-black', 'uppercase', 'text-gray-400');
                                            }
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Drops Slider */}
            <section className="py-4 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-6 flex justify-between items-end">
                    <div>
                        <span className="text-red-500 font-bold tracking-widest uppercase text-xs mb-2 block">Don't Sleep on These</span>
                        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">Featured Drops</h2>
                    </div>
                    <Link to="/products/all" className="hidden md:flex items-center font-bold text-sm hover:text-red-500 transition-colors">
                        VIEW ALL <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

                {/* Scroll Container */}
                <div className="flex overflow-x-auto space-x-6 px-4 sm:px-6 lg:px-10 pb-8 no-scrollbar snap-x snap-mandatory">
                    {featuredDrops.map((product) => (
                        <div key={product.id} className="min-w-[200px] md:min-w-[260px] snap-start">
                            <ProductCard product={product} onQuickView={setSelectedProduct} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Superfast Delivery Section - Blinkit Style */}
            <section className="py-4 bg-green-50 border-t border-b border-green-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                        <Zap className="w-6 h-6 text-green-600 fill-green-600" />
                    </div>
                    <div>
                        <span className="text-green-600 font-bold tracking-widest uppercase text-xs block">Under 20 Mins</span>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-gray-900">
                            Superfast <span className="text-green-600">Delivery</span>
                        </h2>
                    </div>
                </div>

                {/* Scroll Container */}
                <div className="flex overflow-x-auto space-x-6 px-4 sm:px-6 lg:px-10 pb-8 no-scrollbar snap-x snap-mandatory">
                    {/* Reuse products but with "fast" feel */}
                    {[...womenProducts, ...menProducts].slice(0, 6).map((product, idx) => (
                        <div key={idx} className="min-w-[200px] md:min-w-[260px] snap-start">
                            <ProductCard product={{ ...product, isNew: idx === 0 }} onQuickView={setSelectedProduct} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Party Ready Curation */}
            <section className="py-8 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-6">
                    <span className="text-purple-400 font-bold tracking-widest uppercase text-xs block mb-1">Tonight's Vibe</span>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
                        Party Ready <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px white' }}>in 15 Mins</span>
                    </h2>
                </div>
                <div className="flex overflow-x-auto space-x-6 px-4 sm:px-6 lg:px-10 pb-8 no-scrollbar snap-x snap-mandatory">
                    {[...menProducts, ...womenProducts].slice(3, 9).map((product, idx) => (
                        <div key={idx} className="min-w-[200px] md:min-w-[260px] snap-start">
                            {/* Dark Mode Card Variant */}
                            <div className="group relative w-full cursor-pointer">
                                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-900 relative shadow-sm group-hover:shadow-purple-900/50 transition-all duration-500">
                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                                    <div className="absolute top-3 right-3 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-md flex items-center gap-1">
                                        <Zap className="w-3 h-3 fill-white" /> 15m
                                    </div>
                                    <button className="absolute bottom-4 left-4 right-4 bg-white text-black font-bold py-3 rounded-lg shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-purple-500 hover:text-white">
                                        ADD TO BAG
                                    </button>
                                </div>
                                <div className="mt-3 px-1">
                                    <h3 className="text-sm font-bold text-white line-clamp-1 uppercase tracking-tight">{product.name}</h3>
                                    <p className="text-xs text-gray-400">{product.category}</p>
                                    <span className="text-base font-black text-white">{product.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Video Section (Cinematic) */}
            <section className="relative h-[600px] bg-black overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop"
                    alt="Futuristic Fashion"
                    className="absolute z-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-20 text-center text-white px-4">
                    <span className="block text-red-500 font-bold tracking-[0.3em] text-sm mb-4 animate-pulse">EST. 2024</span>
                    <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-6 stroke-text" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>
                        THE FUTURE <br /> IS HERE
                    </h2>
                    <button className="bg-white text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform hover:bg-red-500 hover:text-white">
                        EXPLORE CAMPAIGN
                    </button>
                </div>
            </section>

            {/* Shop By Category */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center mb-12">
                        <span className="text-red-500 font-bold tracking-widest uppercase text-xs mb-2 block">Curated For You</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                            Shop By <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px black' }}>Category</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: 'Tees & Tops', img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop' },
                            { name: 'Hoodies', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop' },
                            { name: 'Bottoms', img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop' },
                            { name: 'Accessories', img: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=600&auto=format&fit=crop' }
                        ].map((cat, i) => (
                            <div key={i} className="relative group h-[400px] overflow-hidden rounded-2xl cursor-pointer">
                                <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                                <div className="absolute bottom-6 left-6 text-white transition-transform duration-300">
                                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{cat.name}</h3>
                                    <span className="inline-flex items-center text-xs font-bold bg-white text-black px-4 py-2 rounded-full transition-opacity duration-300">
                                        EXPLORE <ArrowRight className="ml-2 w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof (Seen on You) */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    {/* Featured Drops */}
                    <div className="mb-20">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Featured Drops</h2>
                            <button className="text-sm font-bold uppercase tracking-wider hover:underline">View All</button>
                        </div>
                        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
                            {featuredProducts.map((product, i) => (
                                <div key={i} className="flex-shrink-0 w-[240px] md:w-[280px] snap-start">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                            SEEN ON <span className="text-red-500">YOU</span>
                        </h2>
                        <p className="text-gray-500 font-medium max-w-xl mx-auto">
                            Join the movement. Tag <span className="text-black font-bold">@Quickdrip</span> to be featured.
                        </p>
                    </div>

                    <div className="columns-2 md:columns-4 gap-4 space-y-4">
                        {[
                            { img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop', caption: 'Office fit check ✅', handle: '@sarahstyle' },
                            { img: 'https://images.unsplash.com/photo-1529139574466-a302c27e3844?q=80&w=400&auto=format&fit=crop', caption: 'Vibes immaculate.', handle: '@jess_drips' },
                            { img: 'https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=400&auto=format&fit=crop', caption: 'City lights & neon nights.', handle: '@urban_kai' },
                            { img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', caption: 'Details match the mood.', handle: '@alex_creates' },
                            { img: 'https://images.unsplash.com/photo-1545959570-a941cc57f4c9?q=80&w=400&auto=format&fit=crop', caption: 'Denim on denim.', handle: '@fashion_junkie' },
                            { img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop', caption: 'Walking into the weekend like...', handle: '@bellamode' },
                            { img: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=400&auto=format&fit=crop', caption: 'Cannot get enough of this tee.', handle: '@tyler_fits' },
                            { img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', caption: 'Golden hour glo.', handle: '@emily_rose' }
                        ].map((item, i) => (
                            <div key={i} className="relative group overflow-hidden rounded-lg cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-shadow duration-300">
                                <img src={item.img} alt="User feature" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
                                    <p className="text-white font-bold text-sm mb-2 line-clamp-2">"{item.caption}"</p>
                                    <div className="flex justify-between items-end border-t border-white/20 pt-2">
                                        <div className="flex items-center text-white/90">
                                            <Instagram className="w-3 h-3 mr-1.5" />
                                            <span className="text-xs font-medium tracking-wide">{item.handle}</span>
                                        </div>
                                        <div className="text-black font-bold text-[10px] bg-white px-3 py-1 rounded-full uppercase scale-90 opacity-80 group-hover:scale-100 group-hover:opacity-100 transition-all">
                                            Shop
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Direct Drip Contact Section */}
                    {/* <div className="mt-24 relative rounded-[3.5rem] bg-black p-10 md:p-20 overflow-hidden shadow-2xl border border-white/5">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full -mr-40 -mt-40 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -ml-40 -mb-40"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-16">
                            <div className="max-w-xl text-center lg:text-left">
                                <span className="inline-flex items-center px-5 py-2 rounded-full bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10 shadow-lg">
                                    <Sparkles className="w-3 h-3 mr-3 text-red-500" /> Concierge Service
                                </span>
                                <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic mb-8 leading-[0.85]">DIRECT <br /><span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px white' }}>DRIP</span></h2>
                                <p className="text-gray-400 text-sm md:text-lg font-medium max-w-sm mx-auto lg:mx-0 tracking-wide mb-10 leading-relaxed">Questions about a drop? Sizing issues? Just want to vibe? Reach out to our community leads.</p>

                                <div className="hidden lg:flex flex-col gap-4 mt-6">
                                    <div className="flex items-center space-x-4 text-white/60 hover:text-white transition-colors cursor-pointer group">
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all">
                                            <Instagram className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest">@quickdrip_hq</span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-white/60 hover:text-white transition-colors cursor-pointer group">
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest">hello@quickdrip.io</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full max-w-xl">
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="relative group col-span-1">
                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors w-4 h-4" />
                                        <input type="text" placeholder="YOUR NAME" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/40 focus:bg-white/[0.08] transition-all text-xs font-black tracking-widest uppercase" />
                                    </div>
                                    <div className="relative group col-span-1">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors w-4 h-4" />
                                        <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/40 focus:bg-white/[0.08] transition-all text-xs font-black tracking-widest uppercase" />
                                    </div>
                                    <div className="relative group col-span-full">
                                        <MessageSquare className="absolute left-6 top-6 text-gray-500 group-focus-within:text-red-500 transition-colors w-4 h-4" />
                                        <textarea rows="4" placeholder="HOW CAN WE HELP?" className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-14 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/40 focus:bg-white/[0.08] transition-all text-xs font-black tracking-widest uppercase resize-none"></textarea>
                                    </div>
                                    <button className="col-span-full bg-white text-black font-black uppercase tracking-[0.3em] py-6 rounded-3xl hover:bg-red-500 hover:text-white transition-all transform active:scale-95 flex items-center justify-center gap-4 text-xs shadow-2xl group">
                                        SEND DRIP <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>

            {/* Quick View Modal */}
            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </>
    );
}
