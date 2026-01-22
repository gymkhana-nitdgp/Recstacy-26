import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

// Optional: You can pass custom className to position it
interface BackToHomeProps {
  className?: string;
}

const BackToHome: React.FC<BackToHomeProps> = ({ className = "" }) => {
  const { startTransition } = usePageTransition();

  const handleBack = () => {
    // FIX: Changed 'routing' to 'forward'
    startTransition('forward', '/');
  };

  return (
    <button 
      onClick={handleBack}
      className={`flex items-center gap-2 text-white/70 hover:text-white transition-colors group ${className}`}
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="uppercase tracking-wider text-sm">Back to Home</span>
    </button>
  );
};

export default BackToHome;