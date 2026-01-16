import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ASSETS } from '../assets/constants';

export const DesktopLanyards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const instaRef = useRef<HTMLAnchorElement>(null);
  const fbRef = useRef<HTMLAnchorElement>(null);
  const instaIconRef = useRef<HTMLDivElement>(null);
  const fbIconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".lanyard", { 
      y: -500, 
      duration: 1.8, 
      ease: "back.out(1.7)",
      stagger: 0.2 
    });

    const startSwing = (target: any, duration: number, angle: number, delay: number) => {
      gsap.to(target, { rotation: angle, duration: duration, repeat: -1, yoyo: true, ease: "sine.inOut", transformOrigin: "top center", delay: delay });
      gsap.set(target, { rotation: -angle });
    };
    if (instaRef.current) startSwing(instaRef.current, 3.5, 6, 0);
    if (fbRef.current) startSwing(fbRef.current, 4.5, 4, 0.5);
  }, { scope: containerRef });

  const handleEnter = (target: any) => { gsap.to(target, { y: -10, scale: 1.1, duration: 0.4, ease: "back.out(1.7)" }); };
  const handleLeave = (target: any) => { gsap.to(target, { y: 0, scale: 1, duration: 0.5, ease: "bounce.out" }); };

  const moonImageClasses = "w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 filter drop-shadow-[0_0_8px_rgba(0,0,0,1)] drop-shadow-[0_0_15px_rgba(255,69,0,0.9)] drop-shadow-[0_0_25px_rgba(255,100,0,0.6)] group-hover:invert group-hover:grayscale group-hover:brightness-110 group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]";

  return (
    <div ref={containerRef} className="hidden md:flex absolute top-0 right-16 z-50 gap-4 items-start pointer-events-auto">
      <a ref={fbRef} href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="lanyard group relative flex flex-col items-center origin-top">
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-white/90 pointer-events-none drop-shadow-[0_0_2px_rgba(0,0,0,1)]"></div>
        <div ref={fbIconRef} className="relative cursor-pointer -mt-2" onMouseEnter={() => handleEnter(fbIconRef.current)} onMouseLeave={() => handleLeave(fbIconRef.current)}>
          <img src={ASSETS.FB_MOON_IMG} alt="Facebook" className={moonImageClasses} />
        </div>
      </a>
      <a ref={instaRef} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="lanyard group relative flex flex-col items-center origin-top">
        <div className="w-[1px] h-40 bg-gradient-to-b from-transparent via-white/20 to-white/90 pointer-events-none drop-shadow-[0_0_2px_rgba(0,0,0,1)]"></div>
        <div ref={instaIconRef} className="relative cursor-pointer -mt-2" onMouseEnter={() => handleEnter(instaIconRef.current)} onMouseLeave={() => handleLeave(instaIconRef.current)}>
          <img src={ASSETS.INSTA_MOON_IMG} alt="Instagram" className={moonImageClasses} />
        </div>
      </a>
    </div>
  );
};

export const MobileSocialDock: React.FC = () => {
  return (
    <div className="flex md:hidden absolute bottom-6 left-0 right-0 z-50 justify-center gap-6 pointer-events-auto"></div>
  );
};