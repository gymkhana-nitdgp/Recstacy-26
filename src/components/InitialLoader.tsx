import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ASSETS } from '../../public/assets/constants'; 
import { playGlobalAudio } from '../utils/audio'; // Import global play function

interface Props {
  onComplete: () => void;
}

const InitialLoader: React.FC<Props> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [showEnterButton, setShowEnterButton] = useState(false);

  useEffect(() => {
    if (desktopVideoRef.current) desktopVideoRef.current.volume = 1.0;
    if (mobileVideoRef.current) mobileVideoRef.current.volume = 1.0;
  }, []);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime >= 8) {
      video.pause();
      setShowEnterButton(true);
    }
  };

  const handleEnterClick = () => {
    // START AUDIO HERE
    playGlobalAudio();

    // Fade out animation
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: onComplete
    });
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-auto overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={desktopVideoRef}
          src={ASSETS.LOAD_VIDEO_DESKTOP}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-auto max-w-none"
        />
        <video
          ref={mobileVideoRef}
          src={ASSETS.LOAD_VIDEO_MOBILE}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="block md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-auto max-w-none"
        />
      </div>

      {showEnterButton && (
        <div className="absolute z-20 top-[65%] md:top-[62%] left-1/2 -translate-x-1/2 animate-fade-in w-full flex justify-center">
          <button
            onClick={handleEnterClick}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-[2px] border-white/20 backdrop-blur-sm transition-all duration-300 ease-out hover:border-amber-400/80 hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 px-6 py-3 w-[80%] max-w-[280px] md:px-12 md:py-4 md:w-auto md:max-w-none"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10 font-cinzel text-xs md:text-base tracking-widest md:tracking-[0.2em] uppercase glow-text text-white whitespace-nowrap group-hover:text-black transition-colors duration-300">
              Enter into Nirvana
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default InitialLoader;