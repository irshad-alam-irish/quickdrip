import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export default function ForgotPasswordPage() {
    const { forgotPassword } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Attempting to send reset code to:', username);
        setLoading(true);
        try {
            console.log('Calling forgotPassword API...');
            const data = await forgotPassword(username);
            console.log('API Response:', data);
            showNotification(data.message || 'Password reset code sent to your email', 'success');
            if (data.action_required) {
                showNotification(data.action_required, 'info');
            }
            navigate('/reset-password', { state: { username } });
        } catch (err) {
            const message = err.response?.data?.detail || err.message || 'Failed to send reset code';
            showNotification(message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-black text-gray-900 uppercase tracking-tighter">
                        Forgot Password?
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        No worries! Enter your email or phone number and we'll send you a reset code.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="sr-only">Email or Phone Number</label>
                        <div className="relative">
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
                                placeholder="Email or Phone Number"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black uppercase tracking-wider transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Sending Code...' : 'Send Reset Code'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
