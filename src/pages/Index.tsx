
import { useState } from 'react';
import QRPopup from '../components/QRPopup/QRPopup';

const Index = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Connect</h1>
        <p className="text-gray-600 mb-8">Click the button below to scan a QR code and connect your mobile device.</p>
        
        <button
          onClick={openPopup}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-8 rounded-md font-medium transition-all shadow-lg hover:shadow-xl w-full max-w-xs mx-auto"
        >
          Connect Device
        </button>
      </div>
      
      <QRPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default Index;
