import { X, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthPromptSheet = ({ isOpen, onClose, onSkip }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogin = () => {
        onClose();
        navigate('/login');
    };

    const handleSignup = () => {
        onClose();
        navigate('/signup');
    };

    const handleSkip = () => {
        onSkip();
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={handleSkip}
            />

            {/* Bottom Sheet */}
            <div
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out z-50 ${isOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                {/* Handle Bar */}
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>

                {/* Content */}
                <div className="px-6 pb-8 pt-4">
                    {/* Close Button */}
                    <button
                        onClick={handleSkip}
                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-100">
                            <User className="w-8 h-8 text-red-500" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-black text-center text-gray-900 mb-2 uppercase tracking-tighter">
                        SEEN ON <span className="text-red-500">YOU</span>
                    </h2>

                    {/* Description */}
                    <p className="text-center text-gray-500 mb-8 font-medium italic">
                        The ultimate destination for next-gen luxury fashion. Join the movement.
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={handleLogin}
                            className="w-full bg-red-500 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95"
                        >
                            Log In
                        </button>

                        <button
                            onClick={handleSignup}
                            className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest border-2 border-black hover:bg-gray-50 transition-all active:scale-95"
                        >
                            Create Account
                        </button>

                        {/* Skip Button */}
                        <button
                            onClick={handleSkip}
                            className="w-full text-gray-400 py-3 font-bold uppercase tracking-widest text-xs hover:text-red-500 transition-colors"
                        >
                            Browse as Guest
                        </button>
                    </div>

                    {/* Benefits */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center mb-3">
                            Benefits of signing in:
                        </p>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                                <div className="text-2xl mb-1">🛒</div>
                                <p className="text-xs text-gray-600">Save Cart</p>
                            </div>
                            <div>
                                <div className="text-2xl mb-1">📦</div>
                                <p className="text-xs text-gray-600">Track Orders</p>
                            </div>
                            <div>
                                <div className="text-2xl mb-1">⚡</div>
                                <p className="text-xs text-gray-600">Fast Checkout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPromptSheet;
