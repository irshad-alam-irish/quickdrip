import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { Search, MapPin, X, Navigation, Home, Briefcase, Plus } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map clicks and updates
function MapController({ center, onLocationSelect }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.flyTo(center, 16);
        }
    }, [center, map]);

    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng);
        },
        dragend() {
            const newCenter = map.getCenter();
            onLocationSelect(newCenter);
        }
    });

    return null;
}

export default function LocationModal({ isOpen, onClose, onSelectLocation, initialLocation }) {
    const [mapCenter, setMapCenter] = useState(initialLocation ? [initialLocation.lat, initialLocation.lon] : [20.5937, 78.9629]);
    const [markerPosition, setMarkerPosition] = useState(initialLocation ? [initialLocation.lat, initialLocation.lon] : null);
    const [searchQuery, setSearchQuery] = useState('');
    const [addressDetails, setAddressDetails] = useState(null);
    const [manualDetails, setManualDetails] = useState({
        houseNo: '',
        landmark: '',
        saveAs: 'Home' // Home, Work, Other
    });
    const [viewState, setViewState] = useState('map'); // 'map', 'form'
    const [savedAddresses, setSavedAddresses] = useState(() => {
        const saved = localStorage.getItem('savedAddresses');
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && !markerPosition) {
            // Try to get current location on open if no initial location
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setMapCenter([latitude, longitude]);
                    setMarkerPosition([latitude, longitude]);
                    fetchAddress(latitude, longitude);
                },
                (err) => console.error(err)
            );
        }
    }, [isOpen]);

    const fetchAddress = async (lat, lng) => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            if (data && data.address) {
                const addr = data.address;
                const building = addr.building || addr.amenity || addr.shop || '';
                const street = addr.road || addr.pedestrian || '';
                const area = addr.suburb || addr.neighbourhood || addr.residential || '';
                const city = addr.city || addr.town || addr.county || '';

                const formattedAddress = [building, street, area, city].filter(Boolean).join(', ');

                setAddressDetails({
                    displayName: formattedAddress || data.display_name,
                    fullAddress: data.display_name,
                    city: city,
                    area: area
                });
            }
        } catch (error) {
            console.error("Failed to fetch address", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLocationSelect = (latlng) => {
        const { lat, lng } = latlng;
        setMarkerPosition([lat, lng]);
        fetchAddress(lat, lng);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            setLoading(true);
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
            );
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const newPos = [parseFloat(lat), parseFloat(lon)];
                setMapCenter(newPos);
                setMarkerPosition(newPos);
                fetchAddress(newPos[0], newPos[1]);
            }
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    const confirmLocation = () => {
        setViewState('form');
    };

    const saveAndSelect = () => {
        if (!markerPosition || !addressDetails) return;

        const newAddress = {
            id: Date.now(),
            ...addressDetails,
            ...manualDetails,
            lat: markerPosition[0],
            lng: markerPosition[1]
        };

        // Update saved addresses
        const newSaved = [...savedAddresses, newAddress];
        setSavedAddresses(newSaved);
        localStorage.setItem('savedAddresses', JSON.stringify(newSaved));

        // Select this location
        onSelectLocation(newAddress);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* Left Panel: Search & Form */}
                <div className="w-full md:w-1/3 flex flex-col border-r border-gray-100 bg-white z-10">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">Select Location</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {viewState === 'map' ? (
                        <div className="flex-1 flex flex-col p-4 overflow-y-auto">
                            {/* Search */}
                            <form onSubmit={handleSearch} className="relative mb-6">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for area, street name..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm bg-gray-50"
                                />
                            </form>

                            {/* Current Location Button */}
                            <button
                                onClick={() => {
                                    navigator.geolocation.getCurrentPosition(
                                        (pos) => {
                                            const { latitude, longitude } = pos.coords;
                                            setMapCenter([latitude, longitude]);
                                            setMarkerPosition([latitude, longitude]);
                                            fetchAddress(latitude, longitude);
                                        }
                                    );
                                }}
                                className="flex items-center gap-3 p-3 mb-6 text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                            >
                                <Navigation className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <div className="text-left">
                                    <span className="block text-sm font-bold">Use Current Location</span>
                                    <span className="block text-xs text-red-300">Using GPS</span>
                                </div>
                            </button>

                            {/* Saved Addresses */}
                            {savedAddresses.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Saved Addresses</h3>
                                    {savedAddresses.map(addr => (
                                        <button
                                            key={addr.id}
                                            onClick={() => {
                                                onSelectLocation(addr);
                                                onClose();
                                            }}
                                            className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100 text-left"
                                        >
                                            {addr.saveAs === 'Home' && <Home className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />}
                                            {addr.saveAs === 'Work' && <Briefcase className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />}
                                            {/* Other Icon */}
                                            {addr.saveAs !== 'Home' && addr.saveAs !== 'Work' && <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />}

                                            <div>
                                                <span className="block text-sm font-bold text-gray-900">{addr.saveAs}</span>
                                                <span className="block text-xs text-gray-500 line-clamp-2">{addr.houseNo ? `${addr.houseNo}, ` : ''}{addr.displayName}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col p-4 overflow-y-auto animate-in slide-in-from-right duration-200">
                            <div className="mb-6">
                                <span className="text-xs font-bold text-gray-400 uppercase">Selected Location</span>
                                <p className="text-sm text-gray-800 font-medium mt-1">{addressDetails?.displayName}</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">House / Flat / Block No.</label>
                                    <input
                                        type="text"
                                        value={manualDetails.houseNo}
                                        onChange={e => setManualDetails({ ...manualDetails, houseNo: e.target.value })}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                                        placeholder="e.g. Flat 402, B-Block"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Landmark (Optional)</label>
                                    <input
                                        type="text"
                                        value={manualDetails.landmark}
                                        onChange={e => setManualDetails({ ...manualDetails, landmark: e.target.value })}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                                        placeholder="e.g. Near City Park"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Save As</label>
                                    <div className="flex gap-3">
                                        {['Home', 'Work', 'Other'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setManualDetails({ ...manualDetails, saveAs: type })}
                                                className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${manualDetails.saveAs === type
                                                        ? 'bg-black text-white border-black'
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={() => setViewState('map')}
                                    className="flex-1 py-3 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Back to Map
                                </button>
                                <button
                                    onClick={saveAndSelect}
                                    className="flex-1 py-3 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-lg"
                                >
                                    Save Address
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel: Map */}
                <div className="flex-1 relative bg-gray-100 h-[400px] md:h-full">
                    {markerPosition && (
                        <MapContainer
                            center={markerPosition}
                            zoom={16}
                            className="w-full h-full z-0"
                            zoomControl={false}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; OpenStreetMap contributors'
                            />
                            <Marker position={markerPosition} />
                            <MapController center={mapCenter} onLocationSelect={handleLocationSelect} />
                        </MapContainer>
                    )}

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md z-[1000] flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs font-bold text-gray-700">Fetching location...</span>
                        </div>
                    )}

                    {viewState === 'map' && addressDetails && (
                        <div className="absolute bottom-6 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:w-96 bg-white p-4 rounded-xl shadow-xl z-[1000] animate-in slide-in-from-bottom duration-300">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                <div className="flex-1">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Location Selected</span>
                                    <p className="text-sm font-bold text-gray-900 line-clamp-2 mt-1">{addressDetails.displayName}</p>
                                </div>
                            </div>
                            <button
                                onClick={confirmLocation}
                                className="w-full mt-4 bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors shadow-md"
                            >
                                Confirm Location
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
