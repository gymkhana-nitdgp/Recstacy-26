import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';

export default function RoutingLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  
  const { isTransitioning, setIsTransitioning, targetPath } = useTransition();
  const navigate = useNavigate();

  const FADE_DURATION = 0.5; 
  const PAUSE_DURATION = 2.0; 

  useGSAP(() => {
    if (!isTransitioning || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        if (containerRef.current) {
            gsap.set(containerRef.current, { display: 'none', opacity: 0 });
        }
      }
    });

    // 1. SETUP
    gsap.set(containerRef.current, { display: 'flex', opacity: 0 });

    // 2. FADE IN
    tl.to(containerRef.current, {
        opacity: 1,
        duration: FADE_DURATION,
        ease: "power2.inOut",
        onComplete: () => {
            navigate(targetPath.current);
            window.scrollTo(0, 0);
        }
    })
    // 3. PAUSE
    .to(containerRef.current, {
        opacity: 1, 
        duration: PAUSE_DURATION, 
        ease: "none",
    })
    // 4. FADE OUT
    .to(containerRef.current, {
        opacity: 0,
        duration: FADE_DURATION,
        ease: "power2.inOut",
    });

  }, [isTransitioning]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] items-center justify-center bg-black"
      style={{ display: 'none', opacity: 0 }}
    >
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/helix_mobile.png')] md:bg-[url('/helix_desktop.png')] bg-cover bg-center pointer-events-none" />

        {/* --- BRIGHTNESS ADJUSTMENT HERE --- */}
        <div 
            className="absolute inset-0 pointer-events-none"
            style={{
                // Reduced opacity values to increase overall brightness
                // Center is now 0.8 (was 0.95), Mid is 0.6 (was 0.75)
                background: 'radial-gradient(circle at center, rgba(0,0,0, 0.80) 0%, rgba(0,0,0, 0.60) 45%, transparent 100%)'
            }}
        />

        <div className="w-full h-full relative z-10 flex items-center justify-center">
            {/* Spline Model */}
            <div className="relative w-full h-full z-10">
                <Spline 
                    scene="https://prod.spline.design/1P0VjjbJNGozWFSC/scene.splinecode"
                    onLoad={() => setIsSplineLoaded(true)}
                />
            </div>
            
            {!isSplineLoaded && (
                <div className="absolute bottom-10 right-10 text-white/50 font-mono text-xs animate-pulse z-20">
                    INITIALIZING GATEWAY...
                </div>
            )}
        </div>
    </div>
  );
}