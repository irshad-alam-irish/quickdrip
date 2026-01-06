import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown, ChevronRight, LogIn } from 'lucide-react';
import { navigation } from '../data/navigation';

import logo from '../assets/logo.png';
import NavItem from './NavItem';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMobileCategory, setActiveMobileCategory] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileCategory = (id) => {
        setActiveMobileCategory(activeMobileCategory === id ? null : id);
    };

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-sm font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex justify-between items-center h-20">

                    {/* Left: Hamburger (Mobile) & Logo */}
                    <div className="flex items-center gap-4 lg:gap-12">
                        <button
                            className="lg:hidden text-gray-700 p-1"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <Link to="/" className="flex items-center relative z-20">
                            <img src={logo} alt="Quickdrip Logo" className="h-8 md:h-20 w-auto object-contain bg-white px-2" />
                        </Link>

                        {/* Desktop Navigation (Mega Menu) */}
                        <div className="hidden lg:flex space-x-8 items-center h-full">
                            {navigation.categories.map((category) => (
                                <div key={category.id} className="group flex items-center h-full border-b-4 border-transparent hover:border-red-500 transition-all duration-200">
                                    <Link
                                        to={`/products/${category.id}`}
                                        className="text-[14px] font-bold text-gray-700 group-hover:text-primary tracking-wide uppercase px-1 py-2 lg:font-semibold"
                                    >
                                        {category.name}
                                    </Link>

                                    {/* Mega Menu Popover */}
                                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute left-0 top-full w-full bg-white shadow-lg border-t border-gray-100 transition-all duration-200 ease-in-out z-50">
                                        <div className="max-w-7xl mx-auto px-10 py-8">
                                            <div className="grid grid-cols-5 gap-8">
                                                {/* Category sections */}
                                                {category.sections?.map((section, idx) => (
                                                    <div key={idx} className={idx % 2 === 0 ? 'bg-gray-50/50 -m-2 p-2 rounded-lg' : ''}>
                                                        <h3 className="font-bold text-red-500 text-sm mb-3 uppercase tracking-wider">{section.name}</h3>
                                                        <ul className="space-y-1.5">
                                                            {section.items.map((item, itemIdx) => (
                                                                <li key={itemIdx}>
                                                                    <Link to={item.href} className="text-gray-500 hover:text-gray-900 text-sm transition-colors block py-0.5">
                                                                        {item.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                                {/* Placeholder generic image/promo for menu */}
                                                <div className="col-span-1 bg-red-50 rounded-lg flex items-center justify-center text-red-200 text-xs font-bold uppercase tracking-widest p-4 text-center">
                                                    {category.name} Collection
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8">
                        <div className="relative w-full group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-100 rounded-md leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:bg-white focus:border-gray-200 text-sm transition-all duration-200"
                                placeholder="Search for products, brands and more"
                            />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        <button className="md:hidden text-gray-700">
                            <Search className="w-5 h-5" />
                        </button>
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setIsProfileOpen(true)}
                            onMouseLeave={() => setIsProfileOpen(false)}
                        >
                            <NavItem icon={User} label="Profile" />

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 top-full mt-0 w-72 bg-white shadow-2xl rounded-xl p-6 z-50 border border-gray-100 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex flex-col space-y-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">Welcome</h3>
                                            <p className="text-xs text-gray-500 mt-1">To access account and manage orders</p>
                                        </div>

                                        <button
                                            onClick={() => {
                                                navigate('/login');
                                                setIsProfileOpen(false);
                                            }}
                                            className="w-full bg-red-500 text-white font-bold py-2.5 rounded-lg hover:bg-red-600 transition-colors shadow-md flex items-center justify-center gap-2"
                                        >
                                            LOGIN / SIGNUP
                                        </button>

                                        <div className="border-t border-gray-100 pt-3 space-y-2">
                                            <Link to="/orders" className="block text-sm text-gray-600 hover:text-black hover:font-medium py-1 transition-all">Orders</Link>
                                            <Link to="/wishlist" className="block text-sm text-gray-600 hover:text-black hover:font-medium py-1 transition-all">Wishlist</Link>
                                            <Link to="/contact" className="block text-sm text-gray-600 hover:text-black hover:font-medium py-1 transition-all">Contact Us</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <NavItem icon={Heart} label="Wishlist" onClick={() => navigate('/wishlist')} />
                        <NavItem icon={ShoppingBag} label="Bag" badgeCount={0} onClick={() => navigate('/cart')} />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Sidebar Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>

                    {/* Sidebar */}
                    <div className="absolute top-0 left-0 w-[80%] max-w-sm h-full bg-white shadow-2xl overflow-y-auto">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <span className="font-bold text-lg text-primary">Menu</span>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-2 text-gray-500">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="py-2">
                            {navigation.categories.map((category) => (
                                <div key={category.id} className="border-b border-gray-100">
                                    <button
                                        onClick={() => toggleMobileCategory(category.id)}
                                        className="w-full flex justify-between items-center p-4 text-left font-bold text-gray-800"
                                    >
                                        {category.name}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${activeMobileCategory === category.id ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Mobile Submenu */}
                                    {activeMobileCategory === category.id && (
                                        <div className="bg-gray-50 px-4 pb-4">
                                            {category.sections?.map((section) => (
                                                <div key={section.id} className="mb-4 last:mb-0">
                                                    <h4 className="text-xs font-bold text-red-500 uppercase mb-2 mt-3">{section.name}</h4>
                                                    <div className="flex flex-col space-y-2 pl-2 border-l-2 border-gray-200">
                                                        {section.items.map((item) => (
                                                            <Link key={item.name} to={item.href} className="text-sm text-gray-600">
                                                                {item.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-100 mt-auto">
                            <button className="flex items-center space-x-3 w-full p-2 rounded-md hover:bg-gray-100 text-gray-700">
                                <User className="w-5 h-5" /> <span>My Account</span>
                            </button>
                            <button className="flex items-center space-x-3 w-full p-2 rounded-md hover:bg-gray-100 text-gray-700">
                                <Heart className="w-5 h-5" /> <span>Wishlist</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}


