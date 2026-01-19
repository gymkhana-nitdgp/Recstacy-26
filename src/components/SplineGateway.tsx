import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';

export default function SplineGateway() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const { isTransitioning, setIsTransitioning, targetPath } = useTransition();
  const navigate = useNavigate();

  // Animation Configuration
  const SLIDE_DURATION = 0.8; 
  const PAUSE_DURATION = 0.3; // Short pause while fully covered

  useGSAP(() => {
    // Only run if triggered by Context
    if (!isTransitioning || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Animation finished: Hide loader and tell app we are done
        setIsTransitioning(false);
        if (containerRef.current) {
            gsap.set(containerRef.current, { display: 'none', xPercent: -100 });
        }
      }
    });

    // 1. Setup: Make visible and place off-screen to the LEFT
    gsap.set(containerRef.current, { display: 'flex', xPercent: -100 });

    // 2. SLIDE IN (Cover the screen)
    tl.to(containerRef.current, {
        xPercent: 0,
        duration: SLIDE_DURATION,
        ease: "power3.out",
        onComplete: () => {
            // --- CRITICAL MOMENT ---
            // Screen is covered. Now we switch pages.
            navigate(targetPath.current);
            window.scrollTo(0, 0);
        }
    })
    
    // 3. PAUSE (Optional: lets the 3D model breathe for a moment)
    .to(containerRef.current, {
        xPercent: 0, // Stay in place
        duration: PAUSE_DURATION, 
        ease: "none",
    })

    // 4. SLIDE OUT (Reveal the new page)
    .to(containerRef.current, {
        xPercent: 100, // Move off-screen to the RIGHT
        duration: SLIDE_DURATION,
        ease: "power3.in",
    });

  }, [isTransitioning]); // Runs whenever isTransitioning becomes true

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] items-center justify-center 
                 bg-cover bg-center bg-no-repeat
                 bg-black"
      style={{ 
        display: 'none', // Hidden by default, GSAP toggles this
        backgroundImage: `url('/helix_desktop.png')` // Fallback image if Spline lags
      }}
    >
        {/* Mobile/Desktop Background Image switching via Tailwind classes if needed */}
        <div className="absolute inset-0 bg-[url('/helix_mobile.png')] md:bg-[url('/helix_desktop.png')] bg-cover bg-center opacity-20 pointer-events-none" />

        <div className="w-full h-full relative z-10">
            {/* The Spline component is ALWAYS mounted here.
                This ensures it only loads once when the website opens.
            */}
            <Spline 
                scene="https://prod.spline.design/1P0VjjbJNGozWFSC/scene.splinecode"
                onLoad={() => setIsSplineLoaded(true)}
            />
            
            {/* Optional Loading Text (Only visible on very first site load) */}
            {!isSplineLoaded && (
                <div className="absolute bottom-10 right-10 text-white/50 font-mono text-xs animate-pulse">
                    INITIALIZING GATEWAY...
                </div>
            )}
        </div>
    </div>
  );
}