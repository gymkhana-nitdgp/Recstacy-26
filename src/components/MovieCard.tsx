import React, { useState, useEffect, useRef } from 'react';
import type { Movie } from '../types.ts';

// Assets
import cardVideo from '/card_video.mp4';
import cardVideoPoster from '/card_video_poster.png'; 
import defaultCardImage from '/card_image.png';

interface MovieCardProps {
  movie: Movie;
  isActive: boolean;
  onFlipBack?: () => void;
  onFlip?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  isActive, 
  onFlipBack, 
  onFlip 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const prevFlippedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // OPTIMIZATION 1: Check for mobile device
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!isActive && isFlipped) setIsFlipped(false);
  }, [isActive, isFlipped]);

  useEffect(() => {
    if (!prevFlippedRef.current && isFlipped && onFlip) onFlip();
    if (prevFlippedRef.current && !isFlipped && onFlipBack) onFlipBack();
    prevFlippedRef.current = isFlipped;
  }, [isFlipped, onFlip, onFlipBack]);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isActive) return;
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="group perspective-1000 w-full aspect-[3/4] cursor-pointer"
      onClick={handleFlip}
    >
      {/* OPTIMIZATION 2: will-change-transform hints the browser to use a dedicated layer */}
      <div className={`relative w-full h-full duration-700 transition-all preserve-3d will-change-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* ================= FRONT FACE ================= */}
        {/* OPTIMIZATION 3: Removed heavy 'shadow-2xl' on mobile (added 'md:' prefix) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden md:shadow-2xl bg-black">
          
          {/* LAYER 1: Background Video (Conditional) */}
          {/* LOGIC: Only show video if Active AND NOT Mobile */}
          {isActive && !isMobile ? (
            <video
              className="absolute inset-[5px] w-full h-full object-cover z-0 rounded-xl"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={movie.videoUrl || cardVideo} type="video/mp4" />
            </video>
          ) : (
            // Fallback for Mobile OR Inactive state
            <div className="absolute inset-[5px] w-full h-full object-cover z-0 rounded-xl bg-zinc-800">
               <img 
                 src={cardVideoPoster} 
                 alt="Preview" 
                 className="w-full h-full object-cover rounded-xl opacity-80" 
               />
            </div>
          )}
          
          {/* LAYER 2: Character/Movie Image (Foreground) */}
          <div className="absolute top-[35px] bottom-[26px] left-[38px] right-[27px] overflow-hidden z-10">
            <img 
              src={movie.imageUrl || defaultCardImage} 
              alt={movie.title} 
              className="w-full h-full object-cover"
              loading={isActive ? "eager" : "lazy"} 
            />
          </div>

        </div>

        {/* ================= BACK FACE ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-zinc-900 border border-white/10 p-8 flex flex-col justify-center items-center md:shadow-2xl text-center">
          
          <h3 className="text-xl font-bold text-white mb-4 tracking-wide">
            {movie.title}
          </h3>
          
          <p className="text-sm text-zinc-300 leading-relaxed overflow-y-auto max-h-[80%] pr-1 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
            {movie.description}
          </p>

        </div>

      </div>
    </div>
  );
};

export default MovieCard;