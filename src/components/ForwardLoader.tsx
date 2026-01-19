import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Replace this with your actual Forward Loader code later
const ForwardLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    // Simulate animation duration (e.g., 2 seconds)
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-red-900 flex items-center justify-center text-white"
    >
      <h1 className="text-4xl font-black uppercase tracking-widest animate-pulse">
        Loading Section...
      </h1>
    </motion.div>
  );
};

export default ForwardLoader;