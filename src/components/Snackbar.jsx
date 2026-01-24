import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function Snackbar({ message, type = 'info', onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />
    };

    const styles = {
        success: 'bg-green-50 border-green-100 text-green-800',
        error: 'bg-red-50 border-red-100 text-red-800',
        info: 'bg-blue-50 border-blue-100 text-blue-800'
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${styles[type]} min-w-[320px]`}>
                <div className="flex-shrink-0">
                    {icons[type]}
                </div>
                <div className="flex-1 text-sm font-semibold tracking-wide">
                    {message}
                </div>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 p-1 hover:bg-black/5 rounded-full transition-colors"
                >
                    <X className="w-4 h-4 opacity-50 hover:opacity-100" />
                </button>
            </div>
        </div>
    );
}
