import React, { useState, useEffect, useRef } from "react";
import type { Poster } from "../types.ts";
import { formatDisplayDate, formatDateRange, get12Hour } from "../utils";

// Assets
import cardVideo from "/card_video.mp4";

interface MovieCardProps {
  movie: Poster;
  isActive: boolean;
  onFlipBack?: () => void;
  onFlip?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isActive, onFlipBack, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const prevFlippedRef = useRef(false);
  // const [isMobile, setIsMobile] = useState(false);

  // // OPTIMIZATION 1: Check for mobile device
  // useEffect(() => {
  //   setIsMobile(window.innerWidth < 768);
  // }, []);

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
    setIsFlipped(prev=>!prev);
  };

  return (
    <div className="group perspective-1000 w-full aspect-[3/4] flex items-center justify-center  cursor-pointer" onClick={handleFlip}>
      {/* OPTIMIZATION 2: will-change-transform hints the browser to use a dedicated layer */}
      <div
        className={`relative w-[90%] my-10 h-full md:h-[90%] duration-700 transition-all preserve-3d will-change-transform ${isFlipped ? "rotate-y-180" : "" }`}
      >
        {/* ================= FRONT FACE ================= */}
        {/* OPTIMIZATION 3: Removed heavy 'shadow-2xl' on mobile (added 'md:' prefix) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden md:shadow-2xl bg-black">
          {/* LAYER 1: Background Video (Conditional) */}
          {/* LOGIC: Only show video if Active AND NOT Mobile */}
          {isActive && (
            <>
              <video
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={cardVideo} type="video/mp4" />
              </video>
            </>
          )}

          {/* LAYER 2: Character/Movie Image (Foreground) */}
          <div className={`absolute top-[30px] bottom-[30px] left-[28px] right-[27px] md:left-[34px] md:right-[34px] overflow-hidden z-1`}>
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-contain"
              loading={isActive ? "eager" : "lazy"}
            />
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div className="absolute inset-0 w-full h-full z-2 backface-hidden rotate-y-180 rounded-2xl bg-zinc-900 border border-white/10 p-4 flex flex-col md:shadow-2xl">
          <h3 className="text-md md:text-xl font-bold text-white mb-1 tracking-wide uppercase text-center font-jmh-typewriter">
            {movie.title}
          </h3>
          <h2 className="text-xs">Venue: {movie.venue}</h2>
          {movie.endDate? <h2 className="text-xs">Date: {formatDateRange(movie.date, movie.endDate)}</h2> : <h2 className="text-sm">Date: {formatDisplayDate(movie.date)}</h2>}
          {movie.date.getHours()!==0 && <h2 className="text-xs mb-2">Time: {get12Hour(movie.date)}</h2>}
          {movie.registerLink!==undefined  && <a href={movie.registerLink} target="_blank" onClick={(e) => e.stopPropagation()} className="text-center p-1 my-2 bg-[#ffbf00] text-black rounded-md z-[100] text-sm md:text-lg font-semibold" >Register Now</a>}

          <p 
            className="text-[8px] md:text-xs mt-2 text-zinc-300 leading-relaxed overflow-y-auto max-h-[80%] pr-1 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent"
            onWheel={(e) => {
              const element = e.currentTarget;
              const isScrollable = element.scrollHeight > element.clientHeight;
              const isAtTop = element.scrollTop === 0;
              const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight;
              
              // If scrollable and not at boundaries, prevent page scroll
              if (isScrollable && !(isAtTop && e.deltaY < 0) && !(isAtBottom && e.deltaY > 0)) {
                e.stopPropagation();
              }
            }}
          >
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
