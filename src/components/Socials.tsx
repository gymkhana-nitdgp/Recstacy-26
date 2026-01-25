import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ASSETS } from '../constants';

interface SocialProps {
  play: boolean;
}

export const DesktopLanyards: React.FC<SocialProps> = ({ play }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const instaRef = useRef<HTMLAnchorElement>(null);
  const fbRef = useRef<HTMLAnchorElement>(null);
  const instaIconRef = useRef<HTMLDivElement>(null);
  const fbIconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!play) {
      gsap.set(".lanyard", { y: -500 });
      return;
    }

    gsap.fromTo(".lanyard", 
      { y: -500 }, 
      { 
        y: 0, 
        duration: 1.8, 
        ease: "back.out(1.7)", 
        stagger: 0.2
      }
    );

    const startSwing = (target: any, duration: number, angle: number, delay: number) => {
      gsap.to(target, { 
        rotation: angle, 
        duration: duration, 
        repeat: -1, 
        yoyo: true, 
        ease: "sine.inOut", 
        transformOrigin: "top center", 
        delay: delay 
      });
      gsap.set(target, { rotation: -angle });
    };

    if (instaRef.current) startSwing(instaRef.current, 3.5, 6, 0);
    if (fbRef.current) startSwing(fbRef.current, 4.5, 4, 0.5);

  }, { scope: containerRef, dependencies: [play] });

  const handleEnter = (target: any) => { gsap.to(target, { y: -10, scale: 1.1, duration: 0.4, ease: "back.out(1.7)" }); };
  const handleLeave = (target: any) => { gsap.to(target, { y: 0, scale: 1, duration: 0.5, ease: "bounce.out" }); };

  // OPTIMIZATION: Reduced from 3 expensive drop-shadows to 1 distinct shadow + 1 glow.
  const moonImageClasses = "w-14 h-14 md:w-20 md:h-20 rounded-full transition-all duration-300 filter drop-shadow-[0_0_8px_rgba(0,0,0,1)] drop-shadow-[0_0_25px_rgba(255,100,0,0.6)] group-hover:invert group-hover:grayscale group-hover:brightness-110 group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]";

  return (
    // OPTIMIZATION: 'will-change-transform' tells the browser this element moves
    <div ref={containerRef} className="flex absolute top-0 right-10 lg:right-16 z-50 gap-1 md:gap-4 items-start pointer-events-auto will-change-transform">
      <a ref={fbRef} href="https://www.facebook.com/share/1D1RkSBVcb/" target="_blank" rel="noopener noreferrer" className="lanyard group relative flex flex-col items-center origin-top">
        <div className="w-[1px] h-[4.2rem] md:h-32 bg-gradient-to-b from-transparent via-white/20 to-white/90 pointer-events-none drop-shadow-sm"></div>
        <div ref={fbIconRef} className="relative cursor-pointer -mt-2" onMouseEnter={() => handleEnter(fbIconRef.current)} onMouseLeave={() => handleLeave(fbIconRef.current)}>
          <img src={ASSETS.FB_MOON_IMG} alt="Facebook" className={moonImageClasses} />
        </div>
      </a>
      <a ref={instaRef} href="https://www.instagram.com/recstacy.nitdgp?igsh=MWtiMDVweHRqMzl2cg==" target="_blank" rel="noopener noreferrer" className="lanyard group relative flex flex-col items-center origin-top">
        <div className="w-[1px] h-[5rem] md:h-40 bg-gradient-to-b from-transparent via-white/20 to-white/90 pointer-events-none drop-shadow-sm"></div>
        <div ref={instaIconRef} className="relative cursor-pointer -mt-2" onMouseEnter={() => handleEnter(instaIconRef.current)} onMouseLeave={() => handleLeave(instaIconRef.current)}>
          <img src={ASSETS.INSTA_MOON_IMG} alt="Instagram" className={moonImageClasses} />
        </div>
      </a>
    </div>
  );
};

export const MobileSocialDock: React.FC = () => {
  // Kept empty as per your code
  return (
    <div className="flex absolute bottom-6 left-0 right-0 z-50 justify-center gap-6 pointer-events-auto"></div>
  );
};