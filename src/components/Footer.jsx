import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="inline-block mb-4">
                            <img src={logo} alt="Quickdrip Logo" className="h-8 w-auto object-contain" />
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Most optimized for drip. Elevate your style with our premium collection.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/products" className="hover:text-primary">All Products</Link></li>
                            <li><Link to="/products/new" className="hover:text-primary">New Arrivals</Link></li>
                            <li><Link to="/products/sale" className="hover:text-primary">Sale</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
                            <li><Link to="/shipping" className="hover:text-primary">Shipping & Returns</Link></li>
                            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors"><Instagram className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Quickdrip. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
