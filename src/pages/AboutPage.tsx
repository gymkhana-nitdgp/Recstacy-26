<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";
import OrnateCard from "../components/OrnateCard";
import MediaControls from "../components/MediaControls";
import { RECS_CONTENT } from "./contents";
import { motion } from "framer-motion";

=======

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import OrnateCard from '../components/OrnateCard';
import MediaControls from '../components/MediaControls';
import { OASIS_CONTENT } from './contents';

>>>>>>> f284ac44d258841319bf5d5b3d4a95a3148f9adc
const AboutPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
<<<<<<< HEAD
  
  // OPTIMIZATION 1: Mobile Detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const VIDEO_BOX_START_TIME_S = 1;

  const seekVideoToStartTime = (video: HTMLVideoElement | null) => {
    if (!video) return;
    const desired = Math.max(0, VIDEO_BOX_START_TIME_S);
    const duration = Number.isFinite(video.duration) ? video.duration : undefined;
    const maxAllowed = duration && duration > 0 ? Math.max(duration - 0.1, 0) : desired;
    const t = Math.min(desired, maxAllowed);
    try {
      if (!Number.isNaN(t) && video.currentTime !== t) {
        video.currentTime = t;
      }
    } catch { }
  };

  // Scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px 0px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          if (titleRef.current) {
            setTimeout(() => {
              titleRef.current?.classList.add("fade-in-up");
            }, 100);
          }
          if (contentRef.current) {
            setTimeout(() => {
              contentRef.current?.classList.add("fade-in-up");
            }, 600);
          }
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef!.current) {
        observer.unobserve(sectionRef!.current);
      }
    };
  }, [hasAnimated]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        if (videoRef.current.currentTime < VIDEO_BOX_START_TIME_S) {
          seekVideoToStartTime(videoRef.current);
        }
        videoRef.current.play().catch((error) => {
          console.error("Video playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Satellite accessory component
  const SatelliteAccessory = (
    // OPTIMIZATION 2: Simplified Shadow on Mobile
    // Removed complex drop-shadow for mobile, kept for desktop (md:)
    <div className="absolute -bottom-16 sm:-bottom-20 md:-bottom-24 lg:-bottom-32 -left-2 sm:left-[calc(-4.5rem)] md:left-[calc(-5.5rem+2px)] lg:left-[calc(-6rem+12px)] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 pointer-events-none md:drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] animate-zero-gravity z-50">
      <img
        src="satellite.png"
        alt="Satellite"
        className="w-full h-full object-contain filter drop-shadow-md md:drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
      />
=======
  const VIDEO_BOX_START_TIME_S = 1;

  const seekVideoToStartTime = (video: HTMLVideoElement | null) => {
    if (!video) return;
    const desired = Math.max(0, VIDEO_BOX_START_TIME_S);
    const duration = Number.isFinite(video.duration) ? video.duration : undefined;
    const maxAllowed = duration && duration > 0 ? Math.max(duration - 0.1, 0) : desired;
    const t = Math.min(desired, maxAllowed);

    try {
      if (!Number.isNaN(t) && video.currentTime !== t) {
        video.currentTime = t;
      }
    } catch {
      // Some browsers can throw if the media isn't seekable yet; ignore and retry on metadata load.
    }
  };

  // Scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px 0px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate title first
          if (titleRef.current) {
            setTimeout(() => {
              titleRef.current?.classList.add('fade-in-up');
            }, 100);
          }
          
          // Then animate content after title animation
          if (contentRef.current) {
            setTimeout(() => {
              contentRef.current?.classList.add('fade-in-up');
            }, 600);
          }
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        // Ensure the video box starts from 1s (not 0s)
        if (videoRef.current.currentTime < VIDEO_BOX_START_TIME_S) {
          seekVideoToStartTime(videoRef.current);
        }
        videoRef.current.play().catch(error => {
          console.error("Video playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Satellite accessory component
  const SatelliteAccessory = (
    <div className="absolute -bottom-16 sm:-bottom-20 md:-bottom-24 lg:-bottom-32 -left-2 sm:left-[calc(-4.5rem)] md:left-[calc(-5.5rem+2px)] lg:left-[calc(-6rem+12px)] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] animate-zero-gravity z-50">
      <img 
        src="satellite.png" 
        alt="Satellite" 
        className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
        onLoad={() => console.log('Satellite image loaded')}
        onError={(e) => {
          console.error('Satellite image failed to load');
          // Optional: handle broken image state here if needed
        }}
      />
    </div>
  );

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-8 selection:bg-[#D4AF37] selection:text-black">
      {/* Full Screen Background Video */}
      <video 
        ref={bgVideoRef}
        className="fixed inset-0 w-full h-full object-cover z-0"
        loop
        muted
        autoPlay
        playsInline
        onLoadedData={() => {
          if (bgVideoRef.current) {
            bgVideoRef.current.play().catch(error => {
              console.error("Background video playback failed:", error);
            });
          }
        }}
      >
        <source src="aboutUsVideo.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay for content readability */}
      <div className="fixed inset-0 bg-black/60 z-[1] pointer-events-none"></div>
      
      {/* Background Japanese-inspired Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-[2]" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png"), radial-gradient(#D4AF37 1px, transparent 0)', backgroundSize: 'auto, 40px 40px' }}></div>
      
      {/* Large Decorative Fan Background Element */}
      <div className="absolute -bottom-40 -left-60 w-[800px] h-[800px] pointer-events-none opacity-[0.06] animate-slow-spin">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#D4AF37]">
          {Array.from({ length: 15 }).map((_, i) => (
            <path 
              key={i}
              d="M 100 100 L 100 0 A 100 100 0 0 1 120 2" 
              fill="currentColor" 
              transform={`rotate(${i * 24}, 100, 100)`}
            />
          ))}
        </svg>
      </div>

      {/* Top Banner Branding */}
      <div ref={titleRef} className="absolute top-6 sm:top-10 text-center z-[3] pointer-events-none scroll-fade-in">
        <h1 className="font-mosca-laroke font-bold text-3xl md:text-5xl text-[#D4AF37] tracking-[0.25em] mb-3 text-glow-gold">
          About Us
        </h1>
        
      </div>

      {/* Main Section Content */}
      <div ref={contentRef} className="relative z-[3] w-full max-w-7xl mx-auto flex flex-col items-center scroll-fade-in">
        
        {/* The 3D Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 w-full mt-24 sm:mt-32 lg:mt-40 mb-10 sm:mb-16 perspective-1000">
          
          {/* Left Box: The Video */}
          <div className="flex flex-col w-full max-w-[320px] sm:max-w-[520px] md:max-w-[560px] lg:max-w-none mx-auto">
            <OrnateCard 
              className="lg:-rotate-3 lg:hover:rotate-0 transform-gpu"
              accessory={SatelliteAccessory}
              bodyClassName="p-4 sm:p-6 md:p-8"
            >
              <div className="relative aspect-video w-full bg-black group/video cursor-pointer overflow-hidden border border-[#D4AF37]/30"
                   onClick={togglePlay}>
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                  loop
                  muted={!isPlaying}
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={() => seekVideoToStartTime(videoRef.current)}
                  key="Recs25.mp4"
                >
                  <source src="Recs25.mp4" type="video/mp4" />
                </video>
                
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
                    <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-black/60 shadow-[0_0_40px_rgba(212,175,55,0.4)] group-hover:scale-110 group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                      <Play className="text-[#D4AF37] ml-1" size={40} fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Video Subtitle Overlay */}
                <div className="absolute bottom-0.5 sm:bottom-0.5 md:bottom-1 lg:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 flex justify-between items-end">
                  <div className="bg-black/90 border-l-2 sm:border-l-3 md:border-l-4 border-[#D4AF37] p-1 sm:p-1.5 md:p-2 lg:p-3 backdrop-blur-md">
                    <p className="font-cinzel text-[#D4AF37] text-[6px] sm:text-[7px] md:text-[8px] lg:text-[10px] tracking-widest leading-none mb-0.5 sm:mb-0.5 md:mb-1 lg:mb-1.5 font-bold">THEME REVEAL</p>
                    <p className="text-white text-[9px] sm:text-[10px] md:text-[10px] lg:text-sm font-semibold tracking-tight sm:tracking-tight md:tracking-tight lg:tracking-wider whitespace-nowrap">{OASIS_CONTENT.themeSubtitle}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" alt="YT" className="h-4 filter brightness-0 invert opacity-80" />
                  </div>
                </div>
              </div>
            </OrnateCard>
            
            {/* Media Controls at bottom of video section */}
            <div className="mt-2 sm:mt-3 -rotate-3 transform-gpu">
              <MediaControls isPlaying={isPlaying} onTogglePlay={togglePlay} />
            </div>
          </div>

          {/* Right Box: The About Text */}
          <OrnateCard 
            title={OASIS_CONTENT.title}
            className="lg:rotate-3 lg:hover:rotate-0 transform-gpu"
          >
            <div className="h-full flex flex-col justify-center py-6 relative">
              {/* Content */}
              <div className="relative z-20">
                <p className="font-jmh-typewriter text-white/90 text-lg md:text-xl leading-relaxed font-light text-justify drop-shadow-sm">
                  {OASIS_CONTENT.description}
                </p>
              </div>
              
              <div className="mt-10 flex items-center gap-6 relative z-20">
                 <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/60 to-transparent"></div>
                 <div className="font-cinzel text-[#D4AF37] text-base md:text-lg tracking-[0.5em] opacity-90 font-bold">EST. 1960</div>
              </div>
            </div>
          </OrnateCard>

        </div>

        {/* Background Particles/Effects */}
        <div className="hidden lg:block absolute top-1/4 -left-20 w-80 h-80 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
        <div className="hidden lg:block absolute bottom-1/4 -right-20 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Styles for perspective and custom animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 {
          perspective: 2500px;
        }
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes zero-gravity {
          0% { transform: translate(0, 0) rotate(-5deg); }
          25% { transform: translate(-8px, -20px) rotate(-8deg); }
          50% { transform: translate(12px, -35px) rotate(2deg); }
          75% { transform: translate(20px, -15px) rotate(-3deg); }
          100% { transform: translate(0, 0) rotate(-5deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 80s linear infinite;
        }
        .animate-zero-gravity {
          animation: zero-gravity 10s ease-in-out infinite;
        }
        .cubic-bezier {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scroll-fade-in {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s ease-out, transform 0.9s ease-out;
          will-change: opacity, transform;
        }
        .scroll-fade-in.fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
      `}} />
>>>>>>> f284ac44d258841319bf5d5b3d4a95a3148f9adc
    </div>
  );

  return (
    <motion.div
      ref={sectionRef}
      className="abt-us min-h-screen bg-[#050505] relative overflow-hidden flex flex-col items-center justify-start mt-0 p-4 md:p-8 selection:bg-[#D4AF37] selection:text-black"
    >
      {/* OPTIMIZATION 3: CONDITIONAL BACKGROUND VIDEO 
          - Mobile: No Video. Just black background + texture (below).
          - Desktop: Full video.
      */}
      {!isMobile && (
        <video
          ref={bgVideoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          loop
          muted
          autoPlay
          playsInline
        >
          <source src="aboutUsVideo.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 md:bg-black/60 z-[1] pointer-events-none"></div>

      {/* Background Japanese-inspired Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-[2]"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/asfalt-dark.png"), radial-gradient(#D4AF37 1px, transparent 0)',
          backgroundSize: "auto, 40px 40px",
        }}
      ></div>

      {/* OPTIMIZATION 4: HIDE GIANT FAN ON MOBILE 
          Calculating rotation for a 800px SVG on every frame is heavy.
      */}
      <div className="hidden md:block absolute -bottom-40 -left-60 w-[800px] h-[800px] pointer-events-none opacity-[0.06] animate-slow-spin">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#D4AF37]">
          {Array.from({ length: 15 }).map((_, i) => (
            <path
              key={i}
              d="M 100 100 L 100 0 A 100 100 0 0 1 120 2"
              fill="currentColor"
              transform={`rotate(${i * 24}, 100, 100)`}
            />
          ))}
        </svg>
      </div>

      {/* Top Banner Branding */}
      <div
        ref={titleRef}
        className="absolute top-10 sm:top-16 text-center z-[3] pointer-events-none scroll-fade-in"
      >
        <h1
          className="text-[10vw] md:text-6xl font-black text-[#FFEBD0] uppercase leading-tight pt-[5px]"
          style={{
            fontFamily: "'Mosca Laroke', sans-serif",
            // OPTIMIZATION 5: CHEAPER TEXT SHADOW
            textShadow: isMobile 
              ? "0 2px 10px rgba(0,0,0,0.8)" 
              : "0 10px 30px rgba(0,0,0,0.8), 0 0 40px rgba(255, 100, 0, 0.3)",
          }}
        >
          About Us
        </h1>
      </div>

      {/* Main Section Content */}
      <div
        ref={contentRef}
        className="relative z-[3] w-full max-w-7xl mx-auto flex flex-col items-center scroll-fade-in mt-48 sm:mt-56 lg:mt-64"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 w-full mb-10 sm:mb-16 perspective-1000">
          
          {/* Left Box: The Video */}
          <div className="flex flex-col w-full max-w-[320px] sm:max-w-[520px] md:max-w-[560px] lg:max-w-none mx-auto">
            <OrnateCard
              className="lg:-rotate-3 lg:hover:rotate-0 transform-gpu"
              accessory={SatelliteAccessory}
              bodyClassName="p-4 sm:p-6 md:p-8"
            >
              <div
                className="relative aspect-video w-full bg-black group/video cursor-pointer overflow-hidden border border-[#D4AF37]/30"
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                  loop
                  muted={!isPlaying}
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={() => seekVideoToStartTime(videoRef.current)}
                  key="Recs25.mp4"
                >
                  <source src="Recs25.mp4" type="video/mp4" />
                </video>

                {!isPlaying && (
                  // OPTIMIZATION 6: Removed Backdrop Blur on Play Overlay for Mobile
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 md:backdrop-blur-[2px]">
                    <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-black/60 shadow-lg md:shadow-[0_0_40px_rgba(212,175,55,0.4)] group-hover:scale-110 group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                      <Play className="text-[#D4AF37] ml-1" size={40} fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Video Subtitle Overlay */}
                <div className="absolute bottom-0.5 sm:bottom-0.5 md:bottom-1 lg:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 flex justify-between items-end">
                  <div className="bg-black/90 border-l-2 sm:border-l-3 md:border-l-4 border-[#D4AF37] p-1 sm:p-1.5 md:p-2 lg:p-3 md:backdrop-blur-md">
                    <p className="font-cinzel text-[#D4AF37] text-[6px] sm:text-[7px] md:text-[8px] lg:text-[10px] tracking-widest leading-none mb-0.5 sm:mb-0.5 md:mb-1 lg:mb-1.5 font-bold">
                      THEME REVEAL
                    </p>
                    <p className="text-white text-[9px] sm:text-[10px] md:text-[10px] lg:text-sm font-semibold tracking-tight sm:tracking-tight md:tracking-tight lg:tracking-wider whitespace-nowrap">
                      {RECS_CONTENT.themeSubtitle}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
                      alt="YT"
                      className="h-4 filter brightness-0 invert opacity-80"
                    />
                  </div>
                </div>
              </div>
            </OrnateCard>

            <div className="mt-2 sm:mt-3 -rotate-3 transform-gpu">
              <MediaControls isPlaying={isPlaying} onTogglePlay={togglePlay} />
            </div>
          </div>

          {/* Right Box: The About Text */}
          <OrnateCard
            title={RECS_CONTENT.title}
            className="lg:rotate-3 lg:hover:rotate-0 transform-gpu"
          >
            <div className="h-full flex flex-col justify-center py-6 relative">
              <div className="relative z-20">
                <p className="font-jmh-typewriter text-white/90 text-lg md:text-xl leading-relaxed font-light text-justify drop-shadow-sm">
                  {RECS_CONTENT.description}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-6 relative z-20">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/60 to-transparent"></div>
                <div className="font-cinzel text-[#D4AF37] text-base md:text-lg tracking-[0.5em] opacity-90 font-bold">
                  Estd. 1960
                </div>
              </div>
            </div>
          </OrnateCard>
        </div>

        {/* Background Particles - Hidden on Mobile */}
        <div className="hidden lg:block absolute top-1/4 -left-20 w-80 h-80 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
        <div
          className="hidden lg:block absolute bottom-1/4 -right-20 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .perspective-1000 {
          perspective: 2500px;
        }
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes zero-gravity {
          0% { transform: translate(0, 0) rotate(-5deg); }
          25% { transform: translate(-8px, -20px) rotate(-8deg); }
          50% { transform: translate(12px, -35px) rotate(2deg); }
          75% { transform: translate(20px, -15px) rotate(-3deg); }
          100% { transform: translate(0, 0) rotate(-5deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 80s linear infinite;
        }
        .animate-zero-gravity {
          animation: zero-gravity 10s ease-in-out infinite;
        }
        .scroll-fade-in {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s ease-out, transform 0.9s ease-out;
          will-change: opacity, transform;
        }
        .scroll-fade-in.fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
      `,
        }}
      />
    </motion.div>
  );
};

export default AboutPage;
