import React from 'react';
import MovieCarousel from '../components/MovieCarousel';
import { MOVIES } from './../constants';

const EventsPage: React.FC = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden selection:bg-indigo-500/30">
      
      {/* Background Video Wrapper - Optimized Layer */}
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden will-change-transform">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90" // Slightly reduced opacity can help FPS
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header: Events */}
      <header className="relative z-10 pt-10 pb-2 px-6">
        <div className="flex flex-col items-center text-center">
        <h1 className="font-mosca text-4xl sm:text-6xl font-black tracking-[0.2em] uppercase text-white drop-shadow-xl">
            Events
        </h1>
          <div className="w-24 h-1 bg-white/50 rounded-full mt-4 backdrop-blur-sm"></div>
        </div>
      </header>

      {/* Main Content: Carousel */}
      <main className="relative z-10 w-full flex flex-col justify-center min-h-[80vh]">
        {/* Added -mt-[7px] to move it up on mobile, and sm:mt-0 to reset it on larger screens */}
        <section className="py-12 -mt-[7px] sm:mt-0">
          <MovieCarousel movies={MOVIES} />
        </section>
      </main>

    </div>
  );
};

export default EventsPage;