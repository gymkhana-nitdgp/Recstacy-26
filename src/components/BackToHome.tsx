import React from 'react';
import { usePageTransition } from '../context/TransitionContext';

interface BackProps {
  label?: string;
  className?: string;
}

const BackToHome: React.FC<BackProps> = ({ label = "BACK TO HOME", className = "" }) => {
  const { startTransition } = usePageTransition();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition('routing', '/');
  };

  return (
    <button 
      onClick={handleBack}
      // OPTIMIZATION: 
      // 1. Changed 'hover:scale-105' to 'md:hover:scale-105' (Desktop only)
      // 2. Added 'active:scale-95' for immediate touch feedback on mobile
      // 3. Changed 'transition-all' to specific properties to avoid accidental layout thrashing
      className={`
        group relative px-6 py-3 
        text-[#FFEBD0] text-sm tracking-[0.2em] font-bold 
        border border-[#FFEBD0]/30 rounded-full 
        overflow-hidden 
        transition-transform transition-colors duration-300
        active:scale-95 md:hover:scale-105 md:hover:border-[#FFEBD0]
        ${className}
      `}
      style={{ fontFamily: "'Man of Space', sans-serif" }}
    >
      {/* Fill Effect */}
      <span className="absolute inset-0 bg-[#FFEBD0] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
      
      {/* Text */}
      <span className="relative z-10 group-hover:text-black transition-colors duration-300">
        {label}
      </span>
    </button>
  );
};

export default BackToHome;