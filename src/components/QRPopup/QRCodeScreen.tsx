
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import QRCode from 'react-qr-code';

interface QRCodeScreenProps {
  qrValue: string;
  onNext: () => void;
}

const QRCodeScreen = ({ qrValue, onNext }: QRCodeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 flex flex-col h-full"
    >
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold mb-6">
          Scan QR to snap from phone
        </h3>
        
        <div className="space-y-2 mb-8">
          <div className="flex items-start gap-2 text-left">
            <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
            <p className="text-gray-700">Open your phone's camera</p>
          </div>
          <div className="flex items-start gap-2 text-left">
            <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
            <p className="text-gray-700">Scan the QR code</p>
          </div>
          <div className="flex items-start gap-2 text-left">
            <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
            <p className="text-gray-700">Tap on the link</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-grow pb-4">
        <h3 className="text-xl font-bold mb-4">
          Scan QR Code with Mobile Device
        </h3>
        <div className="bg-white p-3 rounded-lg shadow-md">
          <QRCode 
            value={qrValue} 
            size={200}
            className="mx-auto"
          />
        </div>
        <p className="mt-4 text-gray-500 text-sm">Ready to connect</p>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={onNext}
          className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 px-4 rounded-md font-medium transition-all"
        >
          Next
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default QRCodeScreen;
