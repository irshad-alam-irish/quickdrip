import React from 'react';
import logo from '../assets/logo.png';
import { Sparkles, Zap } from 'lucide-react';

export default function BrandInfoCard({ type = 'default', darkMode = false }) {
    return (
        <div className={`group relative w-full h-full flex flex-col mb-auto`}>
            <div className={`aspect-[3/4] w-full overflow-hidden rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center p-4 transition-all duration-300
                ${darkMode
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
            >
                {/* Decoration */}
                <div className="mb-4 relative">
                    <div className={`absolute inset-0 blur-2xl opacity-50 rounded-full ${type === 'fast' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <img src={logo} alt="Quickdrip" className="h-10 w-auto relative z-10 object-contain" />
                </div>

                {type === 'fast' ? (
                    <>
                        <h3 className="font-black uppercase text-xl leading-none mb-2 text-green-600">Superfast<br />Delivery</h3>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                            under 20 mins <Zap className="w-3 h-3 inline text-green-500 fill-green-500" />
                        </p>
                    </>
                ) : type === 'party' ? (
                    <>
                        <h3 className="font-black uppercase text-xl leading-none mb-2 text-white">Party<br />Mode</h3>
                        <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wide">
                            Get Ready <Sparkles className="w-3 h-3 inline" />
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className="font-black uppercase text-xl leading-none mb-2 text-gray-900">Official<br />Merch</h3>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                            Est. 2024
                        </p>
                    </>
                )}
            </div>

            {/* Spacer to match ProductCard height alignment */}
            <div className="mt-4 px-1 opacity-0">
                <div className="h-5 mb-1"></div>
            </div>
        </div>
    );
}
