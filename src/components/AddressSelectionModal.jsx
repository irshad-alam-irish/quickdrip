import { X, MapPin, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LocationModal from './LocationModal';

const AddressSelectionModal = ({ isOpen, onClose }) => {
    const { addresses, selectedAddress, selectAddress, setShowAddressModal } = useAuth();
    const [showLocationModal, setShowLocationModal] = useState(false);

    if (!isOpen) return null;

    const handleSelectAddress = (address) => {
        selectAddress(address);
        onClose();
    };

    const handleAddNew = () => {
        setShowLocationModal(true);
    };

    const handleLocationSaved = () => {
        setShowLocationModal(false);
        // Address will be automatically added via AuthContext
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                onClick={onClose}
            >
                {/* Modal */}
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-xl font-black uppercase tracking-tighter text-gray-900">
                            SELECT <span className="text-red-500">ADDRESS</span>
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[60vh] bg-gray-50/30">
                        {addresses.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="bg-red-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border-2 border-red-100">
                                    <MapPin size={32} className="text-red-500" />
                                </div>
                                <h3 className="text-lg font-black uppercase mb-2">No addresses found</h3>
                                <p className="text-gray-500 mb-8 font-medium italic text-sm">Add an address to start your luxury collection.</p>
                                <button
                                    onClick={handleAddNew}
                                    className="bg-red-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95"
                                >
                                    Add New Address
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {addresses.map((address) => (
                                    <div
                                        key={address.id}
                                        onClick={() => handleSelectAddress(address)}
                                        className={`p-5 border-2 rounded-[24px] cursor-pointer transition-all relative overflow-hidden group ${selectedAddress?.id === address.id
                                            ? 'border-red-500 bg-white shadow-xl shadow-red-500/5'
                                            : 'border-white bg-white hover:border-gray-200 shadow-sm'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between relative z-10">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`font-black uppercase tracking-widest text-xs py-1 px-3 rounded-full ${selectedAddress?.id === address.id ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                        {address.save_as}
                                                    </span>
                                                    {address.is_default && (
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-green-500 flex items-center gap-1">
                                                            <div className="w-1 h-1 bg-green-500 rounded-full"></div> DEFAULT
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm font-bold text-gray-900 mb-1">
                                                    {address.display_name}
                                                </p>
                                                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                                    {address.house_no}{address.landmark ? `, Near ${address.landmark}` : ''}
                                                </p>
                                            </div>
                                            {selectedAddress?.id === address.id && (
                                                <div className="bg-red-500 p-1.5 rounded-full shadow-lg shadow-red-500/20">
                                                    <Check size={14} className="text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Add New Address Button */}
                                <button
                                    onClick={handleAddNew}
                                    className="w-full p-5 border-2 border-dashed border-gray-200 rounded-[24px] hover:border-red-500 hover:bg-red-50 transition-all flex items-center justify-center gap-3 text-gray-400 font-black uppercase tracking-widest text-xs group"
                                >
                                    <div className="bg-gray-100 p-2 rounded-xl group-hover:bg-red-500 group-hover:text-white transition-colors">
                                        <Plus size={18} />
                                    </div>
                                    <span>Add New Address</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Location Modal for adding new address */}
            {showLocationModal && (
                <LocationModal
                    isOpen={showLocationModal}
                    onClose={() => setShowLocationModal(false)}
                    onSave={handleLocationSaved}
                />
            )}
        </>
    );
};

export default AddressSelectionModal;
