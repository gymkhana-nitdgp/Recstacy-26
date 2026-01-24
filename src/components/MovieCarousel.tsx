import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieCarouselProps {
  movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasFlippedCard, setHasFlippedCard] = useState(false);
  
  // Mobile Check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const startX = useRef(0);
  const currentRotation = useRef(0);
  const autoScrollTimer = useRef<number | null>(null);
  
  const count = movies.length;
  const angleStep = 360 / count;

  const [radius, setRadius] = useState(500);

  const updateRadius = useCallback(() => {
    const width = window.innerWidth;
    const cardWidth = width < 640 ? 240 : 300; 
    const calculatedRadius = Math.max(300, (cardWidth / 2) / Math.tan(Math.PI / count) + 50);
    setRadius(calculatedRadius);
  }, [count]);

  useEffect(() => {
    updateRadius();
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
    }, 1000); 
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
    <div className="relative w-full h-[750px] flex items-center justify-center overflow-hidden select-none py-10">
      
      {/* Side Navigation Buttons (Unchanged) */}
      <div className="absolute left-4 md:left-8 lg:left-12 z-40 top-[calc(50%-17px)] md:top-1/2 -translate-y-1/2">
        <button 
          onClick={() => rotate('prev')}
          className="group w-14 h-14 bg-transparent hover:bg-black/20 text-[#ffbf00] rounded-full flex items-center justify-center transition-transform active:scale-95"
          aria-label="Previous Slide"
        >
          <svg className="w-8 h-8 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute right-4 md:right-8 lg:right-12 z-40 top-[calc(50%-17px)] md:top-1/2 -translate-y-1/2">
        <button 
          onClick={() => rotate('next')}
          className="group w-14 h-14 bg-transparent hover:bg-black/20 text-[#ffbf00] rounded-full flex items-center justify-center transition-transform active:scale-95"
          aria-label="Next Slide"
        >
          <svg className="w-8 h-8 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 3D Scene Container */}
      <div 
        className="relative w-[240px] sm:w-[300px] h-[445px] perspective-2000 -ml-[1px] -translate-y-[5px]"
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="w-full h-full preserve-3d absolute"
          style={{ 
            transform: `rotateY(${rotation}deg)`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)' 
          }}
        >
          {movies.map((movie, index) => {
            const itemAngle = index * angleStep;
            const isActive = index === selectedIndex;
            
            // OPTIMIZATION 1: Simplified styles for mobile
            // Mobile: Opacity Only. Desktop: Brightness + Grayscale + Opacity.
            const activeStyle = isActive 
                ? 'scale-110 opacity-100 brightness-110 z-10' 
                : isMobile 
                    ? 'scale-90 opacity-40 z-0' // Cheap style for mobile
                    : 'scale-90 opacity-40 brightness-50 grayscale-[0.6] z-0'; // Expensive style for desktop

            return (
              <div
                key={movie.id}
                className="absolute inset-0 w-full h-full backface-hidden"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  willChange: 'transform' 
                }}
              >
                <div 
                  className={`w-full h-full duration-1000 ease-out will-change-transform ${activeStyle}`}
                  style={{
                    transitionProperty: 'transform, opacity, filter'
                  }}
                >
                    <MovieCard 
                      movie={movie} 
                      isActive={isActive} 
                      onFlip={isActive ? handleCardFlip : undefined}
                      onFlipBack={isActive ? handleCardFlipBack : undefined} 
                    />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* OPTIMIZATION 2: Heavy Blur Effect is HIDDEN on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden md:block hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-[#ffbf00]/5 to-transparent opacity-30 blur-3xl"></div>
      </div>
    </div>
  );
};

export default MovieCarousel;