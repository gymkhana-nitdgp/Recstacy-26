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
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="group perspective-1000 w-full aspect-[3/4] cursor-pointer" onClick={handleFlip}>
      {/* OPTIMIZATION 2: will-change-transform hints the browser to use a dedicated layer */}
      <div
        className={`relative w-full h-full duration-700 transition-all preserve-3d will-change-transform ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* ================= FRONT FACE ================= */}
        {/* OPTIMIZATION 3: Removed heavy 'shadow-2xl' on mobile (added 'md:' prefix) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden md:shadow-2xl bg-black">
          {/* LAYER 1: Background Video (Conditional) */}
          {/* LOGIC: Only show video if Active AND NOT Mobile */}
          {isActive && (
            <>
              <video
                className="absolute inset-[5px] w-full h-full object-cover z-1 rounded-xl"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={cardVideo} type="video/mp4" />
              </video>
              {/* <div className="absolute inset-[5px] w-full h-full object-cover z-0 rounded-xl bg-zinc-800">
                <img
                  src={cardVideoPoster}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl opacity-80"
                />
              </div> */}
            </>
          )}

          {/* LAYER 2: Character/Movie Image (Foreground) */}
          <div className="absolute top-[35px] bottom-[26px] left-[38px] right-[27px] overflow-hidden z-10">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
              loading={isActive ? "eager" : "lazy"}
            />
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-zinc-900 border border-white/10 p-8 flex flex-col md:shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-1 tracking-wide uppercase text-center">
            {movie.title}
          </h3>
          <h2 className="text-sm">Venue: {movie.venue}</h2>
          {movie.endDate? <h2 className="text-sm">Date: {formatDateRange(movie.date, movie.endDate)}</h2> : <h2 className="text-sm">Date: {formatDisplayDate(movie.date)}</h2>}
          {movie.date.getHours()!==0 && <h2 className="text-sm mb-2">Time: {get12Hour(movie.date)}</h2>}
          {movie.registerLink!==undefined  && <a href={movie.registerLink} target="_blank" className="text-center p-1 mb-2 bg-blue-500 rounded-md z-[100]" >Register Now</a>}

          <p className="text-xs text-zinc-300 leading-relaxed overflow-y-auto max-h-[80%] pr-1 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
