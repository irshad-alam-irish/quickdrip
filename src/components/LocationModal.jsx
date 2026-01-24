import { useState, useEffect } from 'react';
import { Search, MapPin, X, Navigation, Home, Briefcase, ChevronLeft } from 'lucide-react';

export default function LocationModal({ isOpen, onClose, onSelectLocation, initialLocation }) {
    const [viewState, setViewState] = useState('sheet');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [manualDetails, setManualDetails] = useState({
        houseNo: '',
        landmark: '',
        saveAs: 'Home'
    });
    const [savedAddresses, setSavedAddresses] = useState(() => {
        const saved = localStorage.getItem('savedAddresses');
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setViewState('sheet');
            setSearchQuery('');
            setSearchResults([]);
        }
    }, [isOpen]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            setLoading(true);
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
            );
            const data = await response.json();
            setSearchResults(data);
            setViewState('results');
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    const getCurrentLocation = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();
                    setSelectedLocation({
                        displayName: data.display_name,
                        lat: latitude,
                        lng: longitude
                    });
                    setViewState('form');
                } catch (error) {
                    console.error("Failed to fetch address", error);
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setLoading(false);
                alert('Unable to get your location. Please search manually.');
            }
        );
    };

    const handleSelectResult = (result) => {
        setSelectedLocation({
            displayName: result.display_name,
            lat: parseFloat(result.lat),
            lng: parseFloat(result.lon)
        });
        setViewState('form');
    };

    const handleSaveAddress = () => {
        const newAddress = {
            id: Date.now(),
            ...selectedLocation,
            ...manualDetails
        };

        const newSaved = [...savedAddresses, newAddress];
        setSavedAddresses(newSaved);
        localStorage.setItem('savedAddresses', JSON.stringify(newSaved));

        // Check if onSelectLocation is a function before calling it
        if (typeof onSelectLocation === 'function') {
            onSelectLocation(newAddress);
        }

        // Check if onClose is a function before calling it
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    const handleSelectSavedAddress = (addr) => {
        // Check if onSelectLocation is a function before calling it
        if (typeof onSelectLocation === 'function') {
            onSelectLocation(addr);
        }

        // Check if onClose is a function before calling it
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-center items-end md:items-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

                {viewState === 'sheet' && (
                    <div className="flex flex-col h-full">
                        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-5 md:hidden" />

                        <div className="px-5 pb-5 flex-1 overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-black uppercase tracking-tighter text-gray-900">
                                    CHOOSE <span className="text-red-500">LOCATION</span>
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <form onSubmit={handleSearch} className="mb-6">
                                <div className="flex items-center gap-2 bg-gray-50 p-4 border border-gray-100 rounded-2xl group focus-within:border-black transition-all">
                                    <Search className="w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                                    <input
                                        autoFocus
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for area, street name..."
                                        className="flex-1 bg-transparent outline-none text-sm font-bold placeholder-gray-300"
                                    />
                                    <button type="submit" className="px-5 py-2 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all">
                                        FIND
                                    </button>
                                </div>
                            </form>

                            <button
                                onClick={getCurrentLocation}
                                disabled={loading}
                                className="w-full flex items-center gap-4 p-5 border-2 border-red-50 bg-red-50/10 rounded-2xl mb-8 group active:scale-95 transition-all disabled:opacity-50 relative overflow-hidden"
                            >
                                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                                    <Navigation className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-gray-900 font-black uppercase tracking-widest text-xs">
                                        {loading ? 'GETTING POSITION...' : 'USE CURRENT GPS'}
                                    </span>
                                    <span className="block text-[10px] text-red-500 font-bold uppercase tracking-widest mt-0.5">Auto Detect</span>
                                </div>
                            </button>

                            {savedAddresses.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Saved Locations</h3>
                                    <div className="space-y-3">
                                        {savedAddresses.map(addr => (
                                            <button
                                                key={addr.id}
                                                onClick={() => handleSelectSavedAddress(addr)}
                                                className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                                            >
                                                <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 group-hover:text-black">
                                                    {addr.saveAs === 'Home' ? <Home className="w-4 h-4" /> :
                                                        addr.saveAs === 'Work' ? <Briefcase className="w-4 h-4" /> :
                                                            <MapPin className="w-4 h-4" />}
                                                </div>
                                                <div className="text-left flex-1 min-w-0">
                                                    <span className="block font-bold text-gray-900 truncate">{addr.saveAs}</span>
                                                    <span className="block text-xs text-gray-500 truncate">{addr.displayName}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {viewState === 'results' && (
                    <div className="flex flex-col h-full max-h-[600px]">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                            <button onClick={() => setViewState('sheet')} className="p-2 hover:bg-gray-100 rounded-full">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="font-bold text-lg">Search Results</span>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {loading ? (
                                <div className="text-center py-8 text-gray-500">Searching...</div>
                            ) : searchResults.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">No results found</div>
                            ) : (
                                <div className="space-y-2">
                                    {searchResults.map((result, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelectResult(result)}
                                            className="w-full text-left p-4 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors"
                                        >
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{result.display_name}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {viewState === 'form' && selectedLocation && (
                    <div className="flex flex-col h-full max-h-[600px]">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                            <button onClick={() => setViewState('sheet')} className="p-2 hover:bg-gray-100 rounded-full">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="font-bold text-lg">Enter Address Details</span>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto pb-8 md:pb-6">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Location</label>
                                    <p className="text-sm font-medium text-gray-900 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <MapPin className="w-4 h-4 inline mr-2 text-black mb-0.5" />
                                        {selectedLocation.displayName}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">House / Flat No.</label>
                                    <input
                                        autoFocus
                                        value={manualDetails.houseNo}
                                        onChange={e => setManualDetails({ ...manualDetails, houseNo: e.target.value })}
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-black outline-none font-medium transition-colors"
                                        placeholder="e.g. 402, B-Block"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Landmark</label>
                                    <input
                                        value={manualDetails.landmark}
                                        onChange={e => setManualDetails({ ...manualDetails, landmark: e.target.value })}
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-black outline-none font-medium transition-colors"
                                        placeholder="e.g. Near City Park"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Save As</label>
                                    <div className="flex gap-3">
                                        {['Home', 'Work', 'Other'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setManualDetails({ ...manualDetails, saveAs: type })}
                                                className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${manualDetails.saveAs === type
                                                    ? 'bg-black text-white border-black shadow-lg transform scale-[1.02]'
                                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 pb-12 md:pb-0">
                                    <button
                                        onClick={handleSaveAddress}
                                        className="w-full bg-red-500 text-white font-black uppercase tracking-[0.2em] py-5 rounded-[20px] shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95 text-xs"
                                    >
                                        SAVE & CONTINUE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}