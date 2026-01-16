import { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Zap } from 'lucide-react';
import LocationModal from './LocationModal';

export default function LocationSelector({ className = '' }) {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deliveryTime, setDeliveryTime] = useState(12); // Default mock time

    useEffect(() => {
        // Check local storage
        const savedLocation = localStorage.getItem('selectedLocation');
        if (savedLocation) {
            setLocation(JSON.parse(savedLocation));
        } else {
            // Auto open modal on first visit if no location
            // We can add a flag to prevent reopening if user closed it explicitly
            const hasSkipped = localStorage.getItem('locationSkipped');
            if (!hasSkipped) {
                setIsModalOpen(true);
            }
        }
    }, []);

    const handleLocationSelect = (newLocation) => {
        setLocation(newLocation);
        localStorage.setItem('selectedLocation', JSON.stringify(newLocation));

        // Randomize delivery time slightly for effect (10-20 mins)
        setDeliveryTime(Math.floor(Math.random() * (20 - 10 + 1)) + 10);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        if (!location) {
            localStorage.setItem('locationSkipped', 'true');
        }
    }

    return (
        <>
            <div
                className={`flex flex-col justify-center cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all border border-transparent hover:border-gray-200 ${className}`}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl font-black text-gray-900 leading-none tracking-tight flex items-center gap-1">
                        Delivery in {deliveryTime} Mins
                    </span>
                </div>

                <div className="flex items-center gap-1 mt-0.5 opacity-80 group">
                    <span className="text-[13px] font-medium text-gray-600 truncate max-w-[200px] md:max-w-[300px]">
                        {location ? (
                            <>
                                {location.saveAs ? (
                                    <span className="font-bold text-black mr-1">{location.saveAs} -</span>
                                ) : null}
                                {location.houseNo ? `${location.houseNo}, ` : ''}{location.displayName}
                            </>
                        ) : (
                            'Select Location'
                        )}
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                </div>
            </div>

            <LocationModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSelectLocation={handleLocationSelect}
                initialLocation={location}
            />
        </>
    );
}
