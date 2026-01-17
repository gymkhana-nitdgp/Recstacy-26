import React from 'react';
import { useTransition } from '../context/TransitionContext';

interface BackProps {
  label?: string;
  className?: string;
}

const BackToHome: React.FC<BackProps> = ({ label = "BACK TO HOME", className = "" }) => {
  const { triggerTransition } = useTransition();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    // This triggers the RoutingLoader animation -> Then navigates to '/'
    triggerTransition('/');
  };

  return (
    <button 
      onClick={handleBack}
      className={`
        group relative px-6 py-3 
        text-[#FFEBD0] text-sm tracking-[0.2em] font-bold 
        border border-[#FFEBD0]/30 rounded-full 
        overflow-hidden transition-all duration-300
        hover:border-[#FFEBD0] hover:scale-105
        ${className}
      `}
      style={{ fontFamily: "'Man of Space', sans-serif" }}
    >
      {/* Button Hover Fill Effect */}
      <span className="absolute inset-0 bg-[#FFEBD0] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
      
      {/* Button Text */}
      <span className="relative z-10 group-hover:text-black transition-colors duration-300">
        {label}
      </span>
    </button>
  );
};

export default BackToHome;