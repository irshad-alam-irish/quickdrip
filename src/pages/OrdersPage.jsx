import { Package, Truck, Check, MapPin, CreditCard, ChevronRight, Clock } from 'lucide-react';

export default function OrdersPage() {
    const orders = [
        {
            id: 'QD-7829-4421',
            date: 'Jan 5, 2026',
            total: '₹4,499.00',
            status: 'Arriving Tomorrow',
            statusColor: 'text-green-600',
            product: {
                name: 'Acid Wash Tee & Cargo Set',
                image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=200&auto=format&fit=crop',
                details: 'Size: L • Color: Charcoal'
            },
            tracking: {
                currentStep: 2,
                steps: [
                    { label: 'Ordered', date: 'Jan 5', time: '10:23 AM' },
                    { label: 'Shipped', date: 'Jan 6', time: '04:15 PM' },
                    { label: 'Out for Delivery', date: 'Expected Jan 7', time: '' },
                    { label: 'Delivered', date: '', time: '' }
                ]
            },
            address: {
                name: 'Rahul Sharma',
                line1: 'B-404, Crystal Heights',
                line2: 'Sector 18, Kharghar',
                city: 'Navi Mumbai - 410210',
                phone: '+91 98765 43210'
            },
            payment: { method: 'UPI', details: 'Paid via PhonePe' }
        },
        {
            id: 'QD-1102-9983',
            date: 'Dec 22, 2025',
            total: '₹2,999.00',
            status: 'Delivered',
            statusColor: 'text-gray-900',
            product: {
                name: 'Cyber Puffer V2',
                image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop',
                details: 'Size: M • Color: Matte Black'
            },
            tracking: {
                currentStep: 4,
                steps: [
                    { label: 'Ordered', date: 'Dec 22', time: '09:00 AM' },
                    { label: 'Shipped', date: 'Dec 23', time: '11:30 AM' },
                    { label: 'Out for Delivery', date: 'Dec 24', time: '08:45 AM' },
                    { label: 'Delivered', date: 'Dec 24', time: '02:20 PM' }
                ]
            },
            address: {
                name: 'Rahul Sharma',
                line1: 'B-404, Crystal Heights',
                line2: 'Sector 18, Kharghar',
                city: 'Navi Mumbai - 410210',
                phone: '+91 98765 43210'
            },
            payment: { method: 'Credit Card', details: 'HDFC Bank ending in 4421' }
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Your Orders</h1>

                <div className="space-y-8">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Order Header */}
                            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-500">
                                <div className="flex gap-8">
                                    <div>
                                        <span className="block text-xs font-bold uppercase tracking-wider text-gray-400">Order Placed</span>
                                        <span className="font-medium text-gray-900">{order.date}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold uppercase tracking-wider text-gray-400">Total</span>
                                        <span className="font-medium text-gray-900">{order.total}</span>
                                    </div>
                                    <div className="hidden sm:block">
                                        <span className="block text-xs font-bold uppercase tracking-wider text-gray-400">Ship To</span>
                                        <span className="font-medium text-primary hover:underline cursor-pointer">{order.address.name}</span>
                                    </div>
                                </div>
                                <div className="font-mono text-xs text-gray-400">
                                    ORDER # {order.id}
                                </div>
                            </div>

                            {/* Order Body */}
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-shrink-0">
                                        <img src={order.product.image} alt={order.product.name} className="w-24 h-24 object-cover rounded-lg border border-gray-100" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`text-lg font-bold mb-1 ${order.statusColor}`}>{order.status}</h3>
                                        <p className="font-bold text-gray-900 text-base mb-1">{order.product.name}</p>
                                        <p className="text-sm text-gray-500 mb-4">{order.product.details}</p>

                                        <div className="flex gap-3">
                                            <button className="px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors">
                                                Track Package
                                            </button>
                                            <button className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Tracking Progress */}
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <h4 className="font-bold text-sm text-gray-900 mb-4">Delivery By {order.status === 'Delivered' ? 'Speed Post' : 'QuickDrip Logistics'}</h4>
                                    <div className="relative">
                                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full"></div>
                                        <div
                                            className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 rounded-full transition-all duration-1000"
                                            style={{ width: `${((order.tracking.currentStep - 1) / (order.tracking.steps.length - 1)) * 100}%` }}
                                        ></div>

                                        <div className="relative flex justify-between w-full">
                                            {order.tracking.steps.map((step, index) => {
                                                const isCompleted = index < order.tracking.currentStep;
                                                const isCurrent = index === order.tracking.currentStep - 1;

                                                return (
                                                    <div key={index} className="flex flex-col items-center group">
                                                        <div className={`w-4 h-4 rounded-full border-2 z-10 box-content transition-colors duration-300 ${isCompleted ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>
                                                            {isCompleted && <Check className="w-3 h-3 text-white absolute" strokeWidth={3} />}
                                                        </div>
                                                        <div className="mt-2 text-center">
                                                            <p className={`text-xs font-bold ${isCompleted ? 'text-green-600' : 'text-gray-400'}`}>{step.label}</p>
                                                            <p className="text-[10px] text-gray-400 mt-0.5">{step.date}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Footer (Address & Payment) */}
                            <div className="bg-gray-50 p-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-500" /> Shipping Address</h5>
                                    <div className="text-gray-600 pl-6">
                                        <p className="font-medium text-gray-900">{order.address.name}</p>
                                        <p>{order.address.line1}</p>
                                        <p>{order.address.line2}</p>
                                        <p>{order.address.city}</p>
                                        <p className="mt-1">Phone: {order.address.phone}</p>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><CreditCard className="w-4 h-4 text-gray-500" /> Payment Information</h5>
                                    <div className="text-gray-600 pl-6">
                                        <p className="font-medium text-gray-900">{order.payment.method}</p>
                                        <p>{order.payment.details}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
