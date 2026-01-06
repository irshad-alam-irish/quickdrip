import SEO from '../components/SEO';
import { ArrowRight, Sparkles, Flame, Clock, ArrowUpRight, Play, Instagram, Truck, RotateCcw, ShieldCheck, Headphones, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroFashion from '../assets/hero-fashion.png';
import sneakerDrop from '../assets/sneaker-drop.png';
import abstractBg from '../assets/abstract-bg.png';
import React from 'react';

import ProductCard from '../components/ProductCard';
import { menProducts } from '../data/products-men';
import { womenProducts } from '../data/products-women';

export default function HomePage() {
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

            {/* Marquee Banner */}
            <div className="bg-primary text-white overflow-hidden py-3 relative z-10 border-b border-gray-800">
                <div className="animate-marquee whitespace-nowrap flex space-x-8">
                    <span className="text-sm font-bold tracking-widest uppercase flex items-center mx-4"><Flame className="w-4 h-4 mr-2 text-red-500" /> NEW SEASON DROP IS LIVE</span>
                    <span className="text-sm font-bold tracking-widest uppercase flex items-center mx-4">FREE SHIPPING ON ORDERS OVER ₹2000</span>
                    <span className="text-sm font-bold tracking-widest uppercase flex items-center mx-4"><Sparkles className="w-4 h-4 mr-2 text-yellow-400" /> 10% OFF FOR STUDENTS</span>
                    <span className="text-sm font-bold tracking-widest uppercase flex items-center mx-4"><Flame className="w-4 h-4 mr-2 text-red-500" /> NEW SEASON DROP IS LIVE</span>
                    <span className="text-sm font-bold tracking-widest uppercase flex items-center mx-4">FREE SHIPPING ON ORDERS OVER ₹2000</span>
                    <span className="text-sm font-bold tracking-widest uppercase flex items-center mx-4"><Sparkles className="w-4 h-4 mr-2 text-yellow-400" /> 10% OFF FOR STUDENTS</span>
                    <span className="text-sm font-bold tracking-widest uppercase flex items-center mx-4"><Flame className="w-4 h-4 mr-2 text-red-500" /> NEW SEASON DROP IS LIVE</span>
                    <span className="text-sm font-bold tracking-widest uppercase flex items-center mx-4">FREE SHIPPING ON ORDERS OVER ₹2000</span>
                    <span className="text-sm font-bold tracking-widest uppercase flex items-center mx-4"><Sparkles className="w-4 h-4 mr-2 text-yellow-400" /> 10% OFF FOR STUDENTS</span>
                </div>
            </div>

            {/* Story Categories (Myntra/Insta Style) */}
            <section className="bg-white py-8 border-b border-gray-100 overflow-x-auto no-scrollbar">
                <div className="max-w-7xl mx-auto px-4 flex space-x-8 md:justify-center min-w-max">
                    {[
                        { name: 'New In', gradient: 'from-[#ff0055] via-[#ff5b00] to-[#ff0055]', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=200&auto=format&fit=crop' },
                        { name: 'Best Sellers', gradient: 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200&auto=format&fit=crop' },
                        { name: 'Oversized', gradient: 'from-[#00c6ff] to-[#0072ff]', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=200&auto=format&fit=crop' },
                        { name: 'Sneakers', gradient: 'from-[#11998e] to-[#38ef7d]', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=200&auto=format&fit=crop' },
                        { name: 'Accessories', gradient: 'from-[#ee0979] to-[#ff6a00]', img: 'https://images.unsplash.com/photo-1611095973763-414019e72400?q=80&w=200&auto=format&fit=crop' },
                        { name: 'Sale', gradient: 'from-[#f12711] to-[#f5af19]', img: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=200&auto=format&fit=crop' }
                    ].map((cat, i) => (
                        <div key={i} className="flex flex-col items-center group cursor-pointer">
                            <div className="relative p-[3px] rounded-full transition-transform duration-300 group-hover:scale-105 active:scale-95">
                                {/* Gradient Ring */}
                                <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${cat.gradient} animate-spin-slow opacity-80 group-hover:opacity-100 transition-opacity`}></div>

                                {/* Inner White Gap */}
                                <div className="relative bg-white p-[2px] rounded-full">
                                    {/* Image Container */}
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-gray-100 shadow-inner bg-gray-50">
                                        <img
                                            src={cat.img}
                                            alt={cat.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                            </div>
                            <span className="mt-3 text-[10px] md:text-xs font-black uppercase tracking-[0.15em] text-gray-800 group-hover:text-black transition-colors">
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
                      
             {/* Trust Bar (Benefits Section) */}
             
            <section className="bg-gray-50 border-b border-gray-100 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex flex-wrap justify-between gap-6 md:gap-4">
                        {[
                            { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹1999' },
                            { icon: RotateCcw, title: '14 Days Return', desc: 'Easy returns policy' },
                            { icon: ShieldCheck, title: 'Secure Payment', desc: '100% secure checkout' },
                            { icon: Headphones, title: '24/7 Support', desc: 'Dedicated help center' }
                        ].map((benefit, i) => (
                            <div key={i} className="flex items-center space-x-3 group min-w-[140px]">
                                <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-300">
                                    <benefit.icon className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <div className="leading-tight">
                                    <h4 className="text-[10px] md:text-xs font-black uppercase tracking-tight text-gray-900">{benefit.title}</h4>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-2">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:grid-rows-2 h-auto md:h-[600px]">

                    {/* Main Hero Card (Large - 8 cols) */}
                    <div className="h-[500px] md:h-auto md:col-span-8 md:row-span-2 relative group rounded-3xl overflow-hidden cursor-pointer">
                        <img src={heroFashion} alt="Streetwear Model" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white p-4">
                            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                                Season 04
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-2 leading-none">
                                URBAN <br /> OVERLOAD
                            </h2>
                            <p className="text-gray-300 text-sm md:text-base max-w-md mb-6 font-medium">
                                Redefining street aesthetics with bold cuts and neo-textiles. The future of drip is here.
                            </p>
                            <button className="bg-white text-black font-bold py-3 px-8 rounded-full flex items-center hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-1">
                                SHOP COLLECTION <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Secondary Card 1 (Top Right - 4 cols) - Abstract Promo */}
                    <div className="h-[300px] md:h-auto md:col-span-4 md:row-span-1 relative group rounded-3xl overflow-hidden cursor-pointer bg-black">
                        <img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop" alt="Abstract Texture" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                            <h3 className="text-3xl font-black text-white italic tracking-tighter mb-1 relative z-10">
                                FLAT 40% OFF
                            </h3>
                            <p className="text-white/80 font-bold tracking-widest text-xs z-10">USE CODE: DRIP40</p>
                        </div>
                    </div>

                    {/* Secondary Card 2 (Bottom Right - 4 cols) - Drop Countdown */}
                    <div className="h-[300px] md:h-auto md:col-span-4 md:row-span-1 relative group rounded-3xl overflow-hidden bg-gray-100 cursor-pointer border border-gray-200">
                        <div className="absolute top-4 left-4 z-20">
                            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase animate-pulse">
                                Live Drop
                            </span>
                        </div>
                        <img src={sneakerDrop} alt="Sneaker Drop" className="absolute right-0 bottom-0 w-4/5 h-auto object-contain transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />

                        <div className="absolute top-1/2 left-6 -translate-y-1/2 z-10">
                            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">
                                Cyber <br /> Runner X
                            </h3>
                            <div className="flex items-center text-xs font-bold text-gray-500">
                                <Clock className="w-3 h-3 mr-1" /> Ends in 04:22:15
                            </div>
                            <div className="mt-4">
                                <span className="text-sm font-bold underline decoration-2 decoration-red-500 flex items-center">
                                    Cop Now <ArrowUpRight className="w-3 h-3 ml-1" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="md:hidden px-4 text-center mt-2">
                    <Link to="/products/all" className="inline-flex items-center font-bold text-sm hover:text-red-500 transition-colors">
                        VIEW ALL DROPS <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
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

                    {/* Drip Club Newsletter Section */}
                    <div className="mt-24 relative rounded-[3.5rem] bg-black p-10 md:p-20 overflow-hidden shadow-2xl border border-white/5">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full -mr-40 -mt-40 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -ml-40 -mb-40"></div>
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                            <div className="max-w-xl text-center lg:text-left">
                                <span className="inline-flex items-center px-5 py-2 rounded-full bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10 shadow-lg">
                                    <Sparkles className="w-3 h-3 mr-3 text-yellow-500" /> Member Only Access
                                </span>
                                <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic mb-8 leading-[0.85]">JOIN THE <br /><span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px white' }}>DRIP</span> CLUB</h2>
                                <p className="text-gray-400 text-sm md:text-lg font-medium max-w-sm mx-auto lg:mx-0 tracking-wide mb-10 leading-relaxed">Early access. Private sales. The Aesthetic Journal.</p>
                                <p className="text-red-500 font-black tracking-[0.4em] text-[10px] uppercase">No noise. Just drip.</p>
                            </div>
                            <div className="w-full max-w-md">
                                <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                                    <div className="relative group">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors" />
                                        <input type="email" placeholder="email@example.com" className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.07] transition-all text-sm font-bold tracking-widest shadow-inner uppercase" />
                                    </div>
                                    <button className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-6 rounded-3xl hover:bg-red-500 hover:text-white transition-all transform active:scale-95 flex items-center justify-center gap-4 text-xs shadow-2xl">
                                        GET ACCESS <ArrowRight className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
