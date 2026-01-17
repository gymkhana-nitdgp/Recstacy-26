import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center text-[#FFEBD0]">
      <h1 className="text-4xl md:text-6xl font-black tracking-widest mb-8" style={{ fontFamily: "'Mosca Laroke', sans-serif" }}>
        RECSTACY
      </h1>
      
      <button 
        onClick={onStart}
        className="px-8 py-3 border border-[#FFEBD0]/30 rounded-full hover:bg-[#FFEBD0]/10 transition-all duration-300 group"
      >
        <span className="text-sm tracking-[0.3em] font-light group-hover:tracking-[0.5em] transition-all duration-500" style={{ fontFamily: "'Man of Space', sans-serif" }}>
          ENTER EXPERIENCE
        </span>
      </button>

      <p className="absolute bottom-10 text-xs text-white/30 font-mono">
        USE HEADPHONES FOR BEST EXPERIENCE
      </p>
    </div>
  );
};

export default WelcomeScreen;