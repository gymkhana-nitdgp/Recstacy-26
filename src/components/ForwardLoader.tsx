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

    // 1. GPU SETUP: Set width to 50% immediately, but hide using scaleX: 0
    // This allows the GPU to handle the expansion effortlessly.
    tl.set(leftCurtainRef.current, { 
      width: "50%", 
      scaleX: 0, 
      transformOrigin: "left center" // Expands from left
    });
    tl.set(rightCurtainRef.current, { 
      width: "50%", 
      scaleX: 0, 
      transformOrigin: "right center" // Expands from right
    });

    // 2. CLOSE CURTAINS (Animate Scale instead of Width)
    tl.to([leftCurtainRef.current, rightCurtainRef.current], {
      scaleX: 1, // Scales up to fill the space
      duration: 0.8,
      ease: "power2.inOut",
      force3D: true, // Forces Hardware Acceleration
    })

    // 3. TRIGGER NAVIGATION
    .call(() => {
      if (onMidway) onMidway();
    })

    // 4. BUFFER
    .to({}, { duration: 0.3 }) 

    // 5. OPEN CURTAINS
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
        className="h-full bg-cover bg-right bg-no-repeat relative shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-20 will-change-transform"
        style={{ 
          backgroundImage: "url('/assets/curtains.png')",
          // Width is fixed, we animate transform only
        }}
      />
      <div 
        ref={rightCurtainRef}
        className="h-full bg-cover bg-left bg-no-repeat relative shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-20 will-change-transform"
        style={{ 
          backgroundImage: "url('/assets/curtains.png')",
          marginLeft: 'auto' 
        }}
      />
    </div>
  );
};

export default ForwardLoader;