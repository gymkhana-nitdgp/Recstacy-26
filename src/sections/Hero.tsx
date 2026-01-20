import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../../public/assets/constants';

// UI Components
import AudioControl from '../components/AudioControl';
import { DesktopLanyards, MobileSocialDock } from '../components/Socials';
import Countdown from '../components/Countdown';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  startAnimation: boolean;
}

const Hero: React.FC<HeroProps> = ({ startAnimation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const ashuraRef = useRef<HTMLImageElement>(null);
  
  const videoGroupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const rocksDeepRef = useRef<HTMLDivElement>(null);
  const rocksBackRef = useRef<HTMLDivElement>(null);
  const rocksMidRef = useRef<HTMLDivElement>(null);
  const rocksFrontRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // 1. MOUSE INTERACTION (Magnetic Text + Parallax)
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xNorm = (clientX / window.innerWidth) * 2 - 1; 

      // A. Smooth Background Parallax
      gsap.to(".scene-wrapper", { x: 10 * xNorm, duration: 2, ease: "power3.out", overwrite: "auto" });
      gsap.to(rocksDeepRef.current, { x: 5 * xNorm, duration: 2.5, ease: "power3.out", overwrite: "auto" });
      gsap.to(rocksBackRef.current, { x: 8 * xNorm, duration: 2.5, ease: "power3.out", overwrite: "auto" });
      gsap.to(rocksMidRef.current, { x: 15 * xNorm, duration: 2.5, ease: "power3.out", overwrite: "auto" });
      gsap.to(rocksFrontRef.current, { x: 20 * xNorm, duration: 2.5, ease: "power3.out", overwrite: "auto" });

      // B. Magnetic Text Logic
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      
      // Activation Radius (400px around center)
      const TRIGGER_RADIUS = 400; 

      if (distance < TRIGGER_RADIUS) {
        // Calculate pull strength (1.0 at center -> 0.0 at edge)
        const intensity = 1 - (distance / TRIGGER_RADIUS);

        gsap.to(textRef.current, {
          x: deltaX * 0.2 * intensity, // Pull text towards mouse
          y: deltaY * 0.2 * intensity,
          rotationY: (deltaX * 0.05) * intensity, // 3D Tilt Left/Right
          rotationX: -(deltaY * 0.05) * intensity, // 3D Tilt Up/Down
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else {
        // Reset to center smoothly
        gsap.to(textRef.current, {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 2. SCROLL ANIMATION CONFIG (Unchanged)
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        }
      });
      tl.to(".ui-layer", { y: -200, opacity: 0, duration: 0.3 }, 0);
      tl.to(".scene-wrapper", { y: -500, scale: 0.8, duration: 0.5 }, 0);
      tl.to(videoGroupRef.current, { y: -500, duration: 0.5, ease: "power1.inOut" }, 0);
      tl.to(overlayRef.current, { opacity: 1, duration: 0.5, ease: "power1.inOut" }, 0);
      tl.to(rocksDeepRef.current, { y: "-130vh", ease: "none", duration: 1 }, 0);
      tl.to(rocksBackRef.current, { y: "-150vh", ease: "none", duration: 1 }, 0);
      tl.to(rocksMidRef.current, { y: "-180vh", ease: "none", duration: 1 }, 0);
      tl.to(rocksFrontRef.current, { y: "-210vh", ease: "none", duration: 1 }, 0);
      tl.to(".rock-layer", { filter: "brightness(0)", duration: 0.4, ease: "power2.in" }, 0.2);
      
      tl.to(ashuraRef.current, {
        keyframes: [
          { x: "-50vw", y: "-50vh", xPercent: 50, yPercent: 50, scale: 1.5, duration: 0.5, ease: "power2.out" },
          { y: "-180vh", scale: 1.5, duration: 0.5, ease: "power1.in" }
        ]
      }, 0);
    });

    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        }
      });
      tl.to(".ui-layer", { y: -100, opacity: 0, duration: 0.3 }, 0);
      tl.to(".scene-wrapper", { y: -400, scale: 0.9, duration: 0.5 }, 0);
      tl.to(videoGroupRef.current, { y: -400, duration: 0.5, ease: "power1.inOut" }, 0);
      tl.to(overlayRef.current, { opacity: 1, duration: 0.5, ease: "power1.inOut" }, 0);
      tl.to(rocksDeepRef.current, { y: "-100vh", ease: "none", duration: 1 }, 0);
      tl.to(rocksBackRef.current, { y: "-110vh", ease: "none", duration: 1 }, 0);
      tl.to(rocksMidRef.current, { y: "-120vh", ease: "none", duration: 1 }, 0);
      tl.to(rocksFrontRef.current, { y: "-130vh", ease: "none", duration: 1 }, 0);
      tl.to(".rock-layer", { filter: "brightness(0)", duration: 0.4, ease: "power2.in" }, 0.2);
      tl.to(ashuraRef.current, {
        keyframes: [
          { x: "-50vw", y: "-45vh", xPercent: 50, yPercent: 50, scale: 1.5, duration: 0.5, ease: "power2.out" },
          { y: "-160vh", scale: 1.5, duration: 0.5, ease: "power1.in" }
        ]
      }, 0);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mm.revert();
    };
  }, { scope: containerRef });

  const glowClass = "filter drop-shadow-[0_5px_15px_rgba(0,0,0,1)] drop-shadow-[0_0_20px_rgba(255,69,0,0.8)] drop-shadow-[0_0_40px_rgba(255,100,0,0.5)]";

  return (
    <div ref={containerRef} className="relative w-full h-screen md:h-screen bg-black overflow-hidden flex flex-col items-center justify-center pt-0 lg:justify-start lg:pt-[15vh]">

      <AudioControl />

      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 md:opacity-70 pointer-events-none" src={ASSETS.NEBULA_VIDEO} />

      <div ref={videoGroupRef} className="absolute inset-0 w-full h-full z-[5] pointer-events-none">
        <video autoPlay loop muted playsInline src={ASSETS.BACK_VIDEO} className="w-full h-full object-cover brightness-[0.6] md:brightness-100" />
        <div ref={overlayRef} className="absolute inset-0 bg-black opacity-0" />
      </div>

      <div className="ui-layer absolute inset-0 w-full h-full z-[60] pointer-events-none">
        <DesktopLanyards play={startAnimation} />
        <MobileSocialDock />
        <Countdown />
      </div>

      {/* Added perspective to wrapper for realistic 3D Text Tilt */}
      <div className="scene-wrapper relative flex items-center justify-center z-10 -mt-8 md:-mt-16 perspective-[1000px]">
        
        {/* TEXT (Original Decoration + Magnetic Effect) */}
        <h1 
            ref={textRef} 
            className="font-black text-[#FFEBD0] text-[15vw] lg:text-[8vw] tracking-[0.1em] lg:tracking-[0.2em] select-none text-center 
            z-10 mix-blend-difference pl-4
            
            /* DECORATION: Warm Glow & Gold Stroke */
            [text-shadow:0_5px_15px_rgba(0,0,0,1),0_0_30px_rgba(255,69,0,0.9),0_0_60px_rgba(255,100,0,0.6),0_0_90px_rgba(255,50,0,0.4)]
            [-webkit-text-stroke:1px_rgba(255,235,208,0.3)] md:[-webkit-text-stroke:1.5px_rgba(255,235,208,0.3)]" 
            
            style={{ 
                fontFamily: "'Mosca Laroke', sans-serif",
                transformStyle: "preserve-3d" // Needed for magnetic tilt
            }}
        >
          RECSTACY
        </h1>
      </div>

      {/* ROCKS */}
      <div ref={rocksDeepRef} className={`rock-layer absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-[150%] md:w-[200%] lg:w-[150%] z-10 pointer-events-none flex justify-center lg:justify-start blur-[2px] top-[80vh] lg:top-[75vh] ${glowClass}`} style={{ filter: 'brightness(0.3)' }}>
        <img src={ASSETS.ROCKS_GROUP_IMG} className="w-[60%] md:w-[40%] lg:w-[25%] object-contain scale-90 lg:scale-75" alt="" />
        <img src={ASSETS.ROCKS_GROUP_IMG} className="hidden lg:block w-[25%] object-contain scale-75" alt="" />
        <img src={ASSETS.ROCKS_GROUP_IMG} className="hidden md:block lg:hidden absolute left-[10%] w-[35%] opacity-80 -rotate-12" alt="" />
        <img src={ASSETS.ROCKS_GROUP_IMG} className="hidden md:block lg:hidden absolute right-[10%] w-[35%] opacity-80 rotate-12" alt="" />
      </div>

      <div ref={rocksBackRef} className={`rock-layer absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-[160%] md:w-[220%] lg:w-[150%] z-20 pointer-events-none flex justify-center lg:justify-start blur-[1px] top-[85vh] lg:top-[95vh] ${glowClass}`} style={{ filter: 'brightness(0.5)' }}>
        <img src={ASSETS.ROCKS_GROUP_IMG} className="w-[70%] md:w-[45%] lg:w-[30%] object-contain rotate-12" alt="" />
        <img src={ASSETS.ROCKS_GROUP_IMG} className="hidden lg:block w-[30%] object-contain -rotate-12" alt="" />
        <img src={ASSETS.ROCKS_GROUP_IMG} className="hidden md:block lg:hidden absolute left-[5%] w-[40%] -rotate-6 scale-x-[-1]" alt="" />
        <img src={ASSETS.ROCKS_GROUP_IMG} className="hidden md:block lg:hidden absolute right-[5%] w-[40%] rotate-6" alt="" />
      </div>

      <div ref={rocksMidRef} className={`rock-layer absolute left-1/2 -translate-x-1/2 lg:-left-20 lg:translate-x-0 w-[180%] md:w-[240%] lg:w-[200%] z-30 pointer-events-none flex justify-center lg:justify-start top-[110vh] lg:top-[120vh] ${glowClass}`} style={{ filter: 'brightness(0.8)' }}>
        <img src={ASSETS.ROCKS_GROUP_IMG} className="w-[80%] md:w-[50%] lg:w-[35%] object-contain" alt="" />
        <img src={ASSETS.ROCKS_GROUP_IMG} className="hidden lg:block w-[35%] object-contain scale-x-[-1]" alt="" />
        <img src={ASSETS.ROCKS_GROUP_IMG} className="hidden md:block lg:hidden absolute left-[0] w-[45%] rotate-3" alt="" />
        <img src={ASSETS.ROCKS_GROUP_IMG} className="hidden md:block lg:hidden absolute right-[0] w-[45%] -rotate-3 scale-x-[-1]" alt="" />
      </div>

      <div ref={rocksFrontRef} className={`rock-layer absolute left-1/2 -translate-x-1/2 lg:-left-10 lg:translate-x-0 w-[200%] md:w-[260%] lg:w-[200%] z-40 pointer-events-none flex justify-center lg:justify-start top-[120vh] lg:top-[135vh] ${glowClass}`} style={{ filter: 'brightness(1)' }}>
        <img src={ASSETS.ROCKS_GROUP_IMG} className="w-[100%] md:w-[60%] lg:w-[40%] object-contain rotate-6 blur-[1px]" alt="" />
        <img src={ASSETS.ROCKS_GROUP_IMG} className="hidden lg:block w-[40%] object-contain scale-105 -rotate-6 blur-[0.5px]" alt="" />
        <img src={ASSETS.ROCKS_GROUP_IMG} className="hidden md:block lg:hidden absolute -left-10 w-[55%] -rotate-12 blur-[0.5px]" alt="" />
        <img src={ASSETS.ROCKS_GROUP_IMG} className="hidden md:block lg:hidden absolute -right-10 w-[55%] rotate-12 blur-[0.5px] scale-x-[-1]" alt="" />
      </div>

      <img
        ref={ashuraRef}
        src={ASSETS.ASHURA_IMG}
        alt="Ashura Deity"
        className={`absolute bottom-0 right-0 z-[50] pointer-events-none object-contain w-[45vw] lg:w-[20vw] ${glowClass}`}
      />
    </div>
  );
};

export default Hero;