import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ForwardLoaderProps {
  onComplete: () => void;
  onMidway: () => void;
}

const ForwardLoader: React.FC<ForwardLoaderProps> = ({ onComplete, onMidway }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // GPU SETUP
    tl.set(leftCurtainRef.current, { 
      width: "50%", 
      scaleX: 0, 
      transformOrigin: "left center" 
    });
    tl.set(rightCurtainRef.current, { 
      width: "50%", 
      scaleX: 0, 
      transformOrigin: "right center" 
    });

    // CLOSE CURTAINS
    tl.to([leftCurtainRef.current, rightCurtainRef.current], {
      scaleX: 1,
      duration: 0.8,
      ease: "power2.inOut",
      force3D: true, 
    })

    // TRIGGER NAVIGATION
    .call(() => {
      if (onMidway) onMidway();
    })

    // BUFFER
    .to({}, { duration: 0.3 }) 

    // OPEN CURTAINS
    .to([leftCurtainRef.current, rightCurtainRef.current], {
      scaleX: 0,
      duration: 0.8,
      ease: "power2.inOut",
      force3D: true, 
    });

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex pointer-events-none"
    >
      <div 
        ref={leftCurtainRef}
        // OPTIMIZATION: Removed heavy shadow on mobile (added 'md:' prefix)
        className="h-full bg-cover bg-right bg-no-repeat relative md:shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-20 will-change-transform"
        style={{ 
          backgroundImage: "url('/assets/curtains.png')",
        }}
      />
      <div 
        ref={rightCurtainRef}
        // OPTIMIZATION: Removed heavy shadow on mobile (added 'md:' prefix)
        className="h-full bg-cover bg-left bg-no-repeat relative md:shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-20 will-change-transform"
        style={{ 
          backgroundImage: "url('/assets/curtains.png')",
          marginLeft: 'auto' 
        }}
      />
    </div>
  );
};

export default ForwardLoader;