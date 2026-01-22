import React, { useEffect, useState } from 'react';
import MovieCarousel from '../components/MovieCarousel';
import { MOVIES } from './../constants';
import bg from "../../public/bg.mp4";

const EventsPage: React.FC = () => {
  // OPTIMIZATION 1: Mobile Detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobile(window.innerWidth < 768);

    // Optional: Add resize listener if you want it to be responsive on resize
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden selection:bg-indigo-500/30 bg-black">
      
      {/* Background Video Wrapper - Optimized Layer */}
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden will-change-transform">
        
        {/* OPTIMIZATION 2: CONDITIONAL RENDERING
            - Mobile: Static Gradient or Image (Fast)
            - Desktop: Video (Fancy)
        */}
        {!isMobile ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            >
              <source src={bg} type="video/mp4" />
            </video>
        ) : (
            // Mobile Fallback: Fast, dark gradient or you can use an <img /> here
            <div 
                className="absolute inset-0 w-full h-full"
                style={{
                    background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)'
                }}
            />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header: Events */}
      <header className="relative z-10 pt-16 pb-5 px-6">
        <div className="flex flex-col items-center text-center">
        {/* OPTIMIZATION 3: Cheaper Text Shadow on Mobile */}
        <h1 
            className="font-mosca text-4xl sm:text-6xl font-black tracking-[0.2em] uppercase text-white"
            style={{
                textShadow: isMobile ? '0 2px 4px rgba(0,0,0,0.5)' : '0 10px 20px rgba(0,0,0,0.5)'
            }}
        >
            Events
        </h1>
          <div className="w-24 h-1 bg-white/50 rounded-full mt-4 backdrop-blur-sm"></div>
        </div>
      </header>

      {/* Main Content: Carousel */}
      <main className="relative z-10 w-full flex flex-col justify-center min-h-[30vh]">
        <section className="-mt-[10px] sm:mt-0">
          <MovieCarousel movies={MOVIES} />
        </section>
      </main>

    </div>
  );
};

export default EventsPage;