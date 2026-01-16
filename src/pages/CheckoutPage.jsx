import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Tag, CreditCard, Wallet, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CheckoutPage() {
    const { cartItems, totalAmount, clearCart } = useCart();
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState('upi');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const handlePlaceOrder = () => {
        setIsPlacingOrder(true);
        // Simulate Order API
        setTimeout(() => {
            clearCart();
            setIsPlacingOrder(false);
            navigate('/tracking');
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-20 flex flex-col items-center justify-center p-4">
                <p className="text-gray-500 font-bold mb-4">Your bag is empty</p>
                <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-3 rounded-xl font-bold">START SHOPPING</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-30 shadow-sm flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-black uppercase tracking-wide">Checkout</h1>
            </div>

            <div className="max-w-2xl mx-auto p-4 space-y-6">

                {/* Delivery Address */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full">
                                <MapPin className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 leading-none mb-1">Home</h3>
                                <p className="text-xs text-gray-500 font-medium">B-404, Green Valley Apts, Indiranagar</p>
                            </div>
                        </div>
                        <button className="text-red-500 text-xs font-bold uppercase hover:bg-red-50 px-2 py-1 rounded">Change</button>
                    </div>
                    <div className="bg-green-50 p-3 rounded-xl flex items-center gap-3 border border-green-100">
                        <div className="bg-green-100 p-1.5 rounded-full">
                            <CheckCircle2 className="w-4 h-4 text-green-700" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-green-700 tracking-wider">Delivery in 14 Mins</p>
                            <p className="text-xs font-medium text-gray-600">Shipment of {cartItems.length} items</p>
                        </div>
                    </div>
                </div>

                {/* Payment Options */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-black text-gray-900 uppercase tracking-wide mb-4 text-sm">Payment Method</h3>
                    <div className="space-y-3">
                        <div
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPayment === 'upi' ? 'border-black bg-gray-50' : 'border-gray-100'}`}
                            onClick={() => setSelectedPayment('upi')}
                        >
                            <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                                <Wallet className="w-5 h-5 text-gray-700" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-gray-900">UPI</h4>
                                <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'upi' ? 'border-black' : 'border-gray-300'}`}>
                                {selectedPayment === 'upi' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                            </div>
                        </div>

                        <div
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPayment === 'card' ? 'border-black bg-gray-50' : 'border-gray-100'}`}
                            onClick={() => setSelectedPayment('card')}
                        >
                            <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-gray-700" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-gray-900">Credit / Debit Card</h4>
                                <p className="text-xs text-gray-500">Visa, Mastercard, Rupay</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'card' ? 'border-black' : 'border-gray-300'}`}>
                                {selectedPayment === 'card' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                            </div>
                        </div>

                        <div
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPayment === 'cod' ? 'border-black bg-gray-50' : 'border-gray-100'}`}
                            onClick={() => setSelectedPayment('cod')}
                        >
                            <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                                <Truck className="w-5 h-5 text-gray-700" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-gray-900">Cash on Delivery</h4>
                                <p className="text-xs text-gray-500">Pay cash/UPI at doorstep</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'cod' ? 'border-black' : 'border-gray-300'}`}>
                                {selectedPayment === 'cod' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bill Details */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-black text-gray-900 uppercase tracking-wide mb-4 text-sm">Bill Details</h3>
                    <div className="space-y-3 text-sm font-medium text-gray-600">
                        <div className="flex justify-between">
                            <span>Item Total</span>
                            <span>₹{totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Delivery Fee</span>
                            <span className="text-green-600">FREE</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Platform Fee</span>
                            <span>₹5</span>
                        </div>
                        <div className="flex justify-between items-center text-red-500 cursor-pointer hover:bg-red-50 p-2 rounded-lg border border-dashed border-red-200 -mx-2 bg-red-50/50">
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase">Apply Coupon</span>
                            </div>
                            <ChevronLeft className="w-4 h-4 rotate-180" />
                        </div>
                        <div className="h-px bg-gray-100 my-2"></div>
                        <div className="flex justify-between text-base font-black text-gray-900">
                            <span>To Pay</span>
                            <span>₹{(totalAmount + 5).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 shadow-xl z-40 md:px-10">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={handlePlaceOrder}
                        disabled={isPlacingOrder}
                        className="w-full bg-[#1a9d1a] hover:bg-[#158015] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isPlacingOrder ? (
                            'Processing Payment...'
                        ) : (
                            <>
                                Pay ₹{(totalAmount + 5).toLocaleString()} <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
