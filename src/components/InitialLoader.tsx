import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ASSETS } from '../../public/assets/constants'; 
import { playGlobalAudio } from '../utils/audio';

interface Props {
  onComplete: () => void;
}

const InitialLoader: React.FC<Props> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("");

  useEffect(() => {
    // Detect mobile vs desktop for video source
    const mobile = window.innerWidth < 768;
    setVideoSrc(mobile ? ASSETS.LOAD_VIDEO_MOBILE : ASSETS.LOAD_VIDEO_DESKTOP);
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = 1.0;
  }, [videoSrc]);

  const handleVideoEnd = () => {
    if (videoRef.current) {
        videoRef.current.pause();
        setShowEnterButton(true);
    }
  };

  const handleEnterClick = () => {
    playGlobalAudio();
    
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: onComplete
    });
  };

  if (!videoSrc) return <div className="fixed inset-0 bg-black z-[100]" />;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-auto overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
        />
      </div>

      {showEnterButton && (
        // FIX: Increased top value to shift button downwards
        // Old: top-[65%] md:top-[62%]
        // New: top-[80%] md:top-[80%]
        <div className="absolute z-20 top-[80%] md:top-[80%] left-1/2 -translate-x-1/2 animate-fade-in w-full flex justify-center">
          <button
            onClick={handleEnterClick}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-[2px] border-white/20 
                       md:backdrop-blur-sm bg-black/20 md:bg-transparent
                       transition-all duration-300 ease-out hover:border-amber-400/80 
                       active:scale-95 px-6 py-3 w-[80%] max-w-[280px] md:px-12 md:py-4 md:w-auto md:max-w-none"
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