import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { KeyRound, ArrowLeft, RefreshCcw } from 'lucide-react';

export default function OTPVerificationPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const inputRefs = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { verifyOtp, resendOtp } = useAuth();
    const { showNotification } = useNotification();

    const username = location.state?.username;

    useEffect(() => {
        if (!username) {
            navigate('/signup');
        }
        // Focus first input
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [username, navigate]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move focus to next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            showNotification('Please enter all 6 digits', 'error');
            return;
        }

        setLoading(true);
        try {
            await verifyOtp(username, otpValue);
            showNotification('Account verified successfully!', 'success');
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.detail || err.message || 'Verification failed';
            showNotification(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        try {
            const data = await resendOtp(username);
            const message = data.message || 'Verification code resent!';
            showNotification(message, 'success');

            // Show action required if present
            if (data.action_required) {
                setTimeout(() => {
                    showNotification(data.action_required, 'info');
                }, 1000);
            }

            // Clear current OTP input
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0].focus();
        } catch (err) {
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to resend code';
            showNotification(errorMessage, 'error');
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-indigo-100 p-3 rounded-full">
                            <KeyRound className="w-8 h-8 text-indigo-600" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Verify your account</h2>
                    <p className="text-slate-600 text-center mb-8">
                        We've sent a 6-digit code to
                        your <span className="font-bold text-black text-xs uppercase px-1.5 py-0.5 bg-indigo-100 rounded">Email</span>
                        <br /><span className="text-xs text-indigo-600">{username}</span>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-between gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    ref={el => inputRefs.current[index] = el}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-14 text-center text-2xl font-bold bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors"
                                    maxLength={1}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || resending}
                            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-600 text-sm">
                            Didn't receive the code?{' '}
                            <button
                                onClick={handleResend}
                                disabled={resending}
                                className="text-indigo-600 font-bold hover:underline inline-flex items-center gap-1 disabled:opacity-50"
                            >
                                <RefreshCcw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
                                {resending ? 'Resending...' : 'Resend'}
                            </button>
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/signup')}
                        className="mt-6 flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm transition-colors mx-auto"
                    >
                        <ArrowLeft className="w-4 h-4" /> Use different email
                    </button>
                </div>
            </div>
        </div>
    );
}
