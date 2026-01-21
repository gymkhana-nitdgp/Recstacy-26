
import React from 'react';
import type { CardProps } from '../types';

interface EnhancedCardProps extends CardProps {
  accessory?: React.ReactNode;
}

const OrnateCard: React.FC<EnhancedCardProps> = ({ children, className = "", title, accessory }) => {
  // Number of ribs in the decorative fan
  const fanRibs = Array.from({ length: 11 });

  return (
    <div className={`relative group transition-all duration-700 ${className}`}>
      {/* Accessory slot - placed outside overflow-hidden but within the relative wrapper */}
      {accessory && (
        <div className="absolute z-50 pointer-events-none">
          {accessory}
        </div>
      )}

      {/* The Tab (if title exists) */}
      {title && (
        <div className="absolute -top-6 right-8 z-30">
          <div className="bg-black border-2 border-[#D4AF37] px-6 py-1 transform skew-x-12 glow-gold">
            <span className="font-cinzel text-[#D4AF37] text-sm tracking-widest font-bold transform -skew-x-12 block">
              {title}
            </span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="relative overflow-hidden border-2 border-[#D4AF37] bg-black/70 backdrop-blur-xl p-1 shadow-[0_0_50px_rgba(212,175,55,0.15)] transition-shadow duration-500 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.25)]">
        
        {/* Decorative Fan Animation Background - Ribs that fan out */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
          <div className="relative w-full h-full opacity-10 group-hover:opacity-30 transition-opacity duration-1000">
            {fanRibs.map((_, i) => (
              <div 
                key={i}
                className="absolute bottom-[-20%] left-1/2 w-[3px] h-[140%] bg-gradient-to-t from-[#D4AF37] via-[#D4AF37]/40 to-transparent origin-bottom transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
                style={{ 
                  transform: `translateX(-50%) rotate(${(i - 5) * 18}deg) scaleY(${1 - Math.abs(i-5)*0.06})`,
                  transitionDelay: `${i * 40}ms`,
                  opacity: 1 - Math.abs(i - 5) * 0.12
                }}
              />
            ))}
          </div>
          {/* Fan base glow */}
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-64 h-32 bg-[#D4AF37]/10 blur-[80px] rounded-full"></div>
        </div>

        {/* Ornate Corner Accents */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#D4AF37] z-20 opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>
        <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#D4AF37] z-20 opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#D4AF37] z-20 opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#D4AF37] z-20 opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>

        {/* Inner Border */}
        <div className="border border-[#D4AF37]/20 h-full p-6 md:p-8 relative z-10">
           {children}
        </div>
      </div>
      
      {/* Bottom Shadow Glow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-[#D4AF37]/15 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
  );
};

export default OrnateCard;
