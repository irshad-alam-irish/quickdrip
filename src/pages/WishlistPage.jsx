import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-red-50 p-6 rounded-full mb-6">
                <Heart className="w-12 h-12 text-red-500 fill-current" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-500 mb-8 max-w-md">
                Looks like you haven't added any drip to your wishlist yet.
                Start exploring our collection to save your favorite items.
            </p>
            <Link
                to="/"
                className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
                Start Shopping
            </Link>
        </div>
    );
}
