
import { useState, useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import QRCodeScreen from './QRCodeScreen';
import ConnectedScreen from './ConnectedScreen';

interface QRPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRPopup = ({ isOpen, onClose }: QRPopupProps) => {
  const [currentScreen, setCurrentScreen] = useState<'qr' | 'connected'>('qr');
  const [qrValue] = useState('https://example.com/connect?id=1234567890');

  // Demo purpose: Auto transition to connected screen after 5 seconds
  useEffect(() => {
    if (isOpen && currentScreen === 'qr') {
      const timer = setTimeout(() => {
        setCurrentScreen('connected');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentScreen]);

  const handleClose = () => {
    onClose();
    // Reset to QR screen when popup is closed
    setTimeout(() => setCurrentScreen('qr'), 300);
  };

  const handleNext = () => {
    setCurrentScreen('connected');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Popup header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {currentScreen === 'qr' ? 'Scan QR Code' : 'Connected!'}
              </h2>
              <button
                onClick={handleClose}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                aria-label="Close popup"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Popup content */}
            <div className="relative overflow-hidden" style={{ minHeight: "400px" }}>
              <AnimatePresence mode="wait">
                {currentScreen === 'qr' ? (
                  <QRCodeScreen 
                    key="qr-screen" 
                    qrValue={qrValue} 
                    onNext={handleNext} 
                  />
                ) : (
                  <ConnectedScreen 
                    key="connected-screen" 
                    onClose={handleClose} 
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QRPopup;
