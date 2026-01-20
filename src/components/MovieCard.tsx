import React, { useState, useEffect, useRef } from 'react';
import type { Movie, AIInsight } from '../types.ts';
import { getMovieInsight } from '../services/geminiService';

// Assets
import cardVideo from '/card_video.mp4';
import cardImage from '/card_image.png';
// Updated to .png as requested
import cardVideoPoster from '/card_video_poster.png'; 

interface MovieCardProps {
  movie: Movie;
  isActive: boolean; // Controls performance (video vs image)
  onFlipBack?: () => void;
  onFlip?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isActive, onFlipBack, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const prevFlippedRef = useRef(false);

  // Auto-close card if it becomes inactive (scrolled away)
  useEffect(() => {
    if (!isActive && isFlipped) {
      setIsFlipped(false);
    }
  }, [isActive, isFlipped]);

  // Notify parent of flip state (to pause/resume carousel)
  useEffect(() => {
    if (!prevFlippedRef.current && isFlipped && onFlip) {
      onFlip();
    }
    if (prevFlippedRef.current && !isFlipped && onFlipBack) {
      onFlipBack();
    }
    prevFlippedRef.current = isFlipped;
  }, [isFlipped, onFlip, onFlipBack]);

  const handleFlip = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Prevent flipping if the card isn't the active one
    if (!isActive) return;

    const wasFlipped = isFlipped;
    setIsFlipped(!isFlipped);
    
    // Fetch AI insight only if flipping to back and data is missing
    if (!wasFlipped && !insight && !isLoading) {
      setIsLoading(true);
      try {
        const data = await getMovieInsight(movie);
        setInsight(data);
      } catch (error) {
        console.error("Failed to fetch insight", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div 
      className="group perspective-1000 w-full aspect-[3/4] cursor-pointer"
      onClick={handleFlip}
    >
      <div className={`relative w-full h-full duration-700 transition-all preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* ================= FRONT FACE ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-black">
          
          {/* PERFORMANCE OPTIMIZATION: */}
          {/* Only render the heavy <video> tag if this is the Active card. */}
          {/* Otherwise, render the lightweight .png poster. */}
          {isActive ? (
            <video
              className="absolute inset-[5px] w-full h-full object-cover z-0 rounded-xl"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={cardVideo} type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-[5px] w-full h-full object-cover z-0 rounded-xl bg-zinc-800">
               <img 
                 src={cardVideoPoster} 
                 alt="Preview" 
                 className="w-full h-full object-cover rounded-xl opacity-80" 
               />
            </div>
          )}
          
          {/* Foreground Character Image */}
          <div className="absolute top-[35px] bottom-[26px] left-[38px] right-[27px] overflow-hidden z-10">
            <img 
              src={cardImage} 
              alt={movie.title} 
              className="w-full h-full object-cover"
              loading={isActive ? "eager" : "lazy"} // Priority loading for active card
            />
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-zinc-900 border border-white/10 p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-white leading-tight">{movie.title}</h3>
              <div className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded">Details</div>
            </div>

            <p className="text-sm text-zinc-400 line-clamp-4 mb-6 leading-relaxed">
              {movie.description}
            </p>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {movie.genre.map(g => (
                  <span key={g} className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 text-white/70 px-2 py-1 rounded">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 mt-auto">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs text-indigo-400 font-medium">Summoning AI Insight...</span>
              </div>
            ) : insight ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">AI Recommendation</div>
                <p className="text-xs text-white/80 italic mb-3 leading-snug">"{insight.reasonToWatch}"</p>
                <div className="flex gap-2">
                   {insight.vibe.split(',').map(v => (
                     <span key={v} className="text-[9px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-1.5 py-0.5 rounded">
                       {v.trim()}
                     </span>
                   ))}
                </div>
              </div>
            ) : (
              <div className="text-xs text-zinc-500 italic">Click to reveal deep insights</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieCard;