import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Movie } from '../types';
import MovieCard from '../components/MovieCard';

interface MovieCarouselProps {
  movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasFlippedCard, setHasFlippedCard] = useState(false);
  
  const startX = useRef(0);
  const currentRotation = useRef(0);
  const autoScrollTimer = useRef<number | null>(null);
  
  const count = movies.length;
  const angleStep = 360 / count;

  const [radius, setRadius] = useState(500);

  const updateRadius = useCallback(() => {
    const width = window.innerWidth;
    const cardWidth = width < 640 ? 240 : 320;
    const calculatedRadius = Math.max(300, (cardWidth / 2) / Math.tan(Math.PI / count) + 50);
    setRadius(calculatedRadius);
  }, [count]);

  useEffect(() => {
    updateRadius();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, [updateRadius]);

  const rotate = useCallback((direction: 'next' | 'prev') => {
    setRotation(prev => {
      const nextRot = direction === 'next' ? prev - angleStep : prev + angleStep;
      return nextRot;
    });
    setSelectedIndex(prev => {
      return direction === 'next' 
        ? (prev + 1) % count 
        : (prev - 1 + count) % count;
    });
  }, [angleStep, count]);

  useEffect(() => {
    if (autoScrollTimer.current) {
      window.clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }

    if (isDragging || hasFlippedCard) {
      return;
    }

    autoScrollTimer.current = window.setInterval(() => {
      rotate('next');
    }, 6000);

    return () => {
      if (autoScrollTimer.current) {
        window.clearInterval(autoScrollTimer.current);
        autoScrollTimer.current = null;
      }
    };
  }, [isDragging, hasFlippedCard, rotate]);

  const handleCardFlip = useCallback(() => {
    setHasFlippedCard(true);
  }, []);

  const handleCardFlipBack = useCallback(() => {
    setHasFlippedCard(false);
    setTimeout(() => {
      if (!isDragging) {
        rotate('next');
      }
    }, 800); 
  }, [isDragging, rotate]);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    currentRotation.current = rotation;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const walk = (x - startX.current) * 0.15;
    setRotation(currentRotation.current + walk);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const snappedRotation = Math.round(rotation / angleStep) * angleStep;
    setRotation(snappedRotation);
    
    let normalizedRotation = (-snappedRotation / angleStep) % count;
    if (normalizedRotation < 0) normalizedRotation += count;
    setSelectedIndex(Math.round(normalizedRotation));
  };

  return (
    <div className="relative w-full h-[750px] flex items-center justify-center overflow-visible select-none py-10">
      
      {/* Side Navigation - Left */}
      <div className="absolute left-4 md:left-8 lg:left-12 z-40 top-[calc(50%-17px)] md:top-1/2 -translate-y-1/2">
        <button 
          onClick={() => rotate('prev')}
          className="group w-14 h-14 bg-transparent hover:bg-black/20 text-[#ffbf00] rounded-full flex items-center justify-center transition-all animate-golden-glow"
          aria-label="Previous Slide"
        >
          <svg className="w-8 h-8 group-hover:-translate-x-1 transition-transform drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Side Navigation - Right */}
      <div className="absolute right-4 md:right-8 lg:right-12 z-40 top-[calc(50%-17px)] md:top-1/2 -translate-y-1/2">
        <button 
          onClick={() => rotate('next')}
          className="group w-14 h-14 bg-transparent hover:bg-black/20 text-[#ffbf00] rounded-full flex items-center justify-center transition-all animate-golden-glow"
          aria-label="Next Slide"
        >
          <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 3D Scene Container */}
      <div 
        className="relative w-64 sm:w-80 h-[450px] perspective-2000 -ml-[1px]"
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="w-full h-full preserve-3d carousel-transition absolute"
          style={{ 
            transform: `rotateY(${rotation}deg)`,
            transformOrigin: 'center center'
          }}
        >
          {movies.map((movie, index) => {
            const itemAngle = index * angleStep;
            const isActive = index === selectedIndex;
            
            return (
              <div
                key={movie.id}
                className="absolute inset-0 w-full h-full backface-hidden"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  willChange: 'transform' // GPU Hint
                }}
              >
                <div 
                  className={`w-full h-full transition-all duration-500 ease-out ${
                    isActive 
                      ? 'scale-110 opacity-100 brightness-110 z-10' // High visibility for active
                      : 'scale-90 opacity-40 brightness-50 grayscale-[0.6] z-0' // Cheap styling for inactive (no blur)
                  }`}
                >
                    <MovieCard 
                      movie={movie} 
                      isActive={isActive} // PASSING THE PROP HERE
                      onFlip={isActive ? handleCardFlip : undefined}
                      onFlipBack={isActive ? handleCardFlipBack : undefined} 
                    />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots Indicators - Hidden on mobile */}
      <div className="absolute top-[calc(50%+380px)] left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-6 z-20">
        <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/5">
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const diff = i - selectedIndex
                setRotation(prev => prev - diff * angleStep)
                setSelectedIndex(i)
              }}
              className={`h-2 transition-all duration-500 rounded-full ${
                i === selectedIndex
                  ? 'w-10 bg-[#ffbf00] shadow-[0_0_15px_rgba(255,191,0,0.8)]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-[#ffbf00]/5 to-transparent opacity-30 blur-3xl"></div>
      </div>
    </div>
  );
};

export default MovieCarousel;