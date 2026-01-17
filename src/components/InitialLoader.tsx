import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ASSETS } from '../assets/constants';

interface Props {
  onComplete: () => void;
}

const InitialLoader: React.FC<Props> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Ensure volume is up (in case user unmutes later)
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.volume = 1.0; 
    }
  }, []);

  const handleVideoEnd = () => {
    // Fade out animation
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: onComplete
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-auto"
    >
      <video
        ref={videoRef}
        src={ASSETS.LOAD_VIDEO}
        autoPlay
        muted // <--- REQUIRED FOR AUTOPLAY WITHOUT CLICK
        playsInline
        onEnded={handleVideoEnd}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default InitialLoader;