import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-900" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Your Bag is Empty</h1>
            <p className="text-gray-500 mb-8 max-w-md">
                You haven't added any items to your bag yet.
                Check out our latest drops and secure the drip.
            </p>
            <Link
                to="/"
                className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
                Browse Products
            </Link>
        </div>
    );
}
