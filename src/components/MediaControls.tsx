import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, FastForward, Rewind } from 'lucide-react';
import type { MediaControlProps } from '../types';

const MediaControls: React.FC<MediaControlProps> = ({ isPlaying, onTogglePlay }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-12 mb-8">
      {/* Left Decoration - Gradients are generally okay, keeping them */}
      <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>

      <div className="flex items-center gap-2 p-1 border border-[#D4AF37]/40 rounded-sm bg-black/50">
        <button className="p-2 text-[#D4AF37] active:text-white md:hover:bg-[#D4AF37]/20 transition-colors">
          <Rewind size={20} />
        </button>
        <button className="p-2 text-[#D4AF37] active:text-white md:hover:bg-[#D4AF37]/20 transition-colors">
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={onTogglePlay}
          // OPTIMIZATION: 
          // 1. Reduced shadow complexity on mobile (added 'md:' to the glow).
          // 2. Added 'active:scale-95' for better mobile touch feeling.
          className="p-3 bg-[#D4AF37] text-black rounded-sm 
                     active:scale-95 transition-transform 
                     md:hover:scale-105 
                     shadow-sm md:shadow-[0_0_15px_rgba(212,175,55,0.5)]"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>

        <button className="p-2 text-[#D4AF37] active:text-white md:hover:bg-[#D4AF37]/20 transition-colors">
          <ChevronRight size={24} />
        </button>
        <button className="p-2 text-[#D4AF37] active:text-white md:hover:bg-[#D4AF37]/20 transition-colors">
          <FastForward size={20} />
        </button>
      </div>

      {/* Right Decoration */}
      <div className="h-[2px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
    </div>
  );
};

export default MediaControls;