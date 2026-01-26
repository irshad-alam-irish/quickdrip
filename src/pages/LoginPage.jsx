import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export default function LoginPage() {
    const { login } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(username, password);
            showNotification('Welcome back!', 'success');
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.detail || err.message || 'Login failed';

            // Check if it's an unverified account error
            if (errorMessage.toLowerCase().includes('not verified') || errorMessage.toLowerCase().includes('verify')) {
                showNotification(errorMessage, 'warning');
                // Offer to resend verification
                setTimeout(() => {
                    showNotification('Redirecting to verification...', 'info');
                    navigate('/verify-otp', { state: { username } });
                }, 1500);
            } else {
                showNotification(errorMessage, 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                        SEEN ON <span className="text-red-500">YOU</span>
                    </h2>
                    <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] italic">
                        The movement begins here
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className="relative">
                            <label htmlFor="username" className="sr-only">Email or Mobile Number</label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                placeholder="Email or Mobile Number"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full pl-10 pr-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center z-20 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between font-medium">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="/forgot-password" className="text-red-600 hover:text-red-500 font-medium">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 uppercase tracking-widest transition-all shadow-xl shadow-red-500/20 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Entering movement...' : 'Sign in to movement'}
                        </button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                            <span className="sr-only">Sign in with Google</span>
                            <Mail className="w-5 h-5" />
                        </button>
                        <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                            <span className="sr-only">Sign in with Facebook</span>
                            <Facebook className="w-5 h-5 text-blue-600" />
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link to="/signup" className="font-bold text-black hover:text-gray-800 uppercase tracking-wide">
                        Sign up now
                    </Link>
                </div>
            </div>
        </div>
    );
}
