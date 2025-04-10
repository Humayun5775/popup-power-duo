
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ConnectedScreenProps {
  onClose: () => void;
}

const ConnectedScreen = ({ onClose }: ConnectedScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 flex flex-col items-center justify-center h-full"
      style={{ minHeight: "400px" }}
    >
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center"
          >
            <Check size={50} className="text-white" />
          </motion.div>
        </div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold mb-3"
        >
          Successfully Connected!
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 mb-8"
        >
          Your mobile device is now linked and ready to use.
          Photos will appear automatically as you take them.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onClose}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-8 rounded-md font-medium transition-all"
        >
          Got it
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ConnectedScreen;
