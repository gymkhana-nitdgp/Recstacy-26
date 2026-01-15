import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS ---
// Ensure these exist in your /public folder
const ASHURA_IMG = "/ashura.png"; 
const ROCKS_GROUP_IMG = "/rocks-group.png"; 
const FB_MOON_IMG = "/cres.png"; 
const INSTA_MOON_IMG = "/moon.png";
const HAMBURGER_IMG = "/hamburger.png"; 

// ==========================================
// NAVBAR 
// ==========================================
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to(".hamburger-icon", { 
        y: -50, 
        opacity: 0,
        rotation: -90, 
        duration: 0.5, 
        ease: "power2.in" 
      })
      .to(menuRef.current, {
        clipPath: "circle(150% at 90% 10%)",
        opacity: 1,
        pointerEvents: "all",
        duration: 0.8,
        ease: "power3.inOut"
      }, "-=0.3")
      .from(".mobile-link", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.4");

  }, { scope: containerRef });

  useEffect(() => {
    if (tl.current) {
      isOpen ? tl.current.play() : tl.current.reverse();
    }
  }, [isOpen]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "/about" },
    { name: "EVENTS", path: "/events" },
    { name: "CONTACT", path: "/contact" }
  ];

  return (
    <div id="navbar-container" ref={containerRef} className="fixed top-0 left-0 w-full z-[60] px-6 py-6 pointer-events-none font-[family-name:var(--font-man-of-space)]">
      
      {/* DESKTOP NAV */}
      <div className="hidden md:flex pointer-events-auto absolute top-8 left-12 gap-8 items-center z-[60]">
         {navLinks.map((link) => (
           <Link 
             key={link.name} 
             to={link.path}
             className="text-[#FFEBD0] text-sm tracking-widest opacity-70 hover:opacity-100 hover:text-orange-500 transition-all duration-300 drop-shadow-md"
             style={{ fontFamily: "'Man of Space', sans-serif" }}
           >
             {link.name}
           </Link>
         ))}
      </div>

      {/* MOBILE TRIGGER */}
      <div className="md:hidden absolute top-6 left-6 pointer-events-auto z-[70]">
        <button 
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center justify-center focus:outline-none"
          aria-label="Menu"
        >
         <img 
           src={HAMBURGER_IMG} 
           alt="Menu" 
           className="hamburger-icon w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(255,100,0,0.8)] transition-transform group-hover:scale-110"
         />
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[65] flex flex-col items-center justify-center pointer-events-none opacity-0"
        style={{ clipPath: "circle(0% at 10% 10%)" }} 
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 left-6 text-white/50 hover:text-white pointer-events-auto p-2"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <nav className="flex flex-col gap-8 text-center pointer-events-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className="mobile-link text-3xl font-black text-[#FFEBD0] tracking-[0.2em] hover:text-orange-500 transition-colors drop-shadow-[0_0_15px_rgba(255,69,0,0.5)]"
              style={{ fontFamily: "'Man of Space', sans-serif" }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

    </div>
  );
};

// ==========================================
// SOCIAL LANYARDS
// ==========================================
const DesktopLanyards = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const instaRef = useRef<HTMLAnchorElement>(null);
    const fbRef = useRef<HTMLAnchorElement>(null);
    const instaIconRef = useRef<HTMLDivElement>(null);
    const fbIconRef = useRef<HTMLDivElement>(null);
  
    useGSAP(() => {
      gsap.from(".lanyard", { y: -500, duration: 1.5, ease: "bounce.out", stagger: 0.2 });
      const startSwing = (target: any, duration: number, angle: number, delay: number) => {
        gsap.to(target, { rotation: angle, duration: duration, repeat: -1, yoyo: true, ease: "sine.inOut", transformOrigin: "top center", delay: delay });
        gsap.set(target, { rotation: -angle });
      };
      if (instaRef.current) startSwing(instaRef.current, 3.5, 6, 0);
      if (fbRef.current) startSwing(fbRef.current, 4.5, 4, 0.5);
    }, { scope: containerRef });
  
    const handleEnter = (target: any) => { gsap.to(target, { y: -10, scale: 1.1, duration: 0.4, ease: "back.out(1.7)" }); };
    const handleLeave = (target: any) => { gsap.to(target, { y: 0, scale: 1, duration: 0.5, ease: "bounce.out" }); };
    const moonImageClasses = "w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 filter drop-shadow-[0_0_15px_rgba(255,80,0,0.9)] group-hover:invert group-hover:grayscale group-hover:brightness-110 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]";
  
    return (
      <div ref={containerRef} className="hidden md:flex absolute top-0 right-16 z-50 gap-4 items-start pointer-events-auto">
        <a ref={fbRef} href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="lanyard group relative flex flex-col items-center origin-top">
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-white/90 pointer-events-none"></div>
          <div ref={fbIconRef} className="relative cursor-pointer -mt-2" onMouseEnter={() => handleEnter(fbIconRef.current)} onMouseLeave={() => handleLeave(fbIconRef.current)}>
             <img src={FB_MOON_IMG} alt="Facebook" className={moonImageClasses} />
          </div>
        </a>
        <a ref={instaRef} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="lanyard group relative flex flex-col items-center origin-top">
          <div className="w-[1px] h-40 bg-gradient-to-b from-transparent via-white/20 to-white/90 pointer-events-none"></div>
          <div ref={instaIconRef} className="relative cursor-pointer -mt-2" onMouseEnter={() => handleEnter(instaIconRef.current)} onMouseLeave={() => handleLeave(instaIconRef.current)}>
             <img src={INSTA_MOON_IMG} alt="Instagram" className={moonImageClasses} />
          </div>
        </a>
      </div>
    );
};

const MobileSocialDock = () => {
    return (
      <div className="flex md:hidden absolute bottom-6 left-0 right-0 z-50 justify-center gap-6 pointer-events-auto"></div>
    );
};

// ==========================================
// COUNTDOWN
// ==========================================
const Countdown = () => {
    const daysRef = useRef<HTMLSpanElement>(null);
    const hoursRef = useRef<HTMLSpanElement>(null);
    const minsRef = useRef<HTMLSpanElement>(null);
    const fmt = (n: number) => Math.floor(n).toString().padStart(2, '0');
  
    useGSAP(() => {
      const targetDate = new Date("2026-02-01T00:00:00").getTime();
      const getRemaining = () => {
         const now = new Date().getTime();
         const diff = targetDate - now;
         return diff <= 0 ? { d: 0, h: 0, m: 0 } : { d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000) };
      };
      const tracker = { d: 0, h: 0, m: 0 };
      gsap.to(tracker, {
         d: getRemaining().d, h: getRemaining().h, m: getRemaining().m,
         duration: 2.5, ease: "power3.out", snap: { d: 1, h: 1, m: 1 },
         onUpdate: () => {
           if (daysRef.current) daysRef.current.innerText = fmt(tracker.d);
           if (hoursRef.current) hoursRef.current.innerText = fmt(tracker.h);
           if (minsRef.current) minsRef.current.innerText = fmt(tracker.m);
         }
      });
    }, []);
  
    const labels = ["DAYS", "HOURS", "MINS"];
    const refs = [daysRef, hoursRef, minsRef];
  
    return (
      <div 
        className={`
          absolute z-40 select-none pointer-events-none flex gap-4 md:gap-6 items-start
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          md:top-auto md:bottom-12 md:left-12 md:translate-x-0 md:translate-y-0
        `}
        style={{ fontFamily: "'Man of Space', sans-serif" }}
      >
        {labels.map((label, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center">
              <span ref={refs[idx]} className="text-4xl md:text-6xl font-black leading-none text-white/50 w-[1.5em] text-center">00</span>
              <span className="text-[10px] md:text-xs tracking-widest text-white/30 mt-2">{label}</span>
            </div>
            {idx < labels.length - 1 && (
              <div className="text-3xl md:text-5xl text-white/40 -mt-1 md:-mt-2">:</div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
};

// ==========================================
// HERO (Mobile Fix: Corner Start + Same Scroll Effect)
// ==========================================
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const ashuraRef = useRef<HTMLImageElement>(null);
  
  // Refs for rock layers
  const rocksDeepRef = useRef<HTMLDivElement>(null);
  const rocksBackRef = useRef<HTMLDivElement>(null);
  const rocksMidRef = useRef<HTMLDivElement>(null);
  const rocksFrontRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // 1. Mouse Parallax (Applies to both)
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX } = e;
      const xNorm = (clientX / window.innerWidth) * 2 - 1;
      
      gsap.to(".scene-wrapper", { x: 10 * xNorm, duration: 1.5, ease: "power2.out" });
      gsap.to(rocksDeepRef.current, { x: 5 * xNorm, duration: 2, ease: "power2.out" });
      gsap.to(rocksBackRef.current, { x: 8 * xNorm, duration: 2, ease: "power2.out" });
      gsap.to(rocksMidRef.current, { x: 15 * xNorm, duration: 2, ease: "power2.out" });
      gsap.to(rocksFrontRef.current, { x: 20 * xNorm, duration: 2, ease: "power2.out" });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 2. SCROLL ANIMATION CONFIG
    
    // --- DESKTOP (min-width: 768px) ---
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", 
          scrub: 1, 
          pin: true,
        }
      });
      // UI Exit
      tl.to(".ui-layer", { y: -200, opacity: 0, duration: 0.3 }, 0);
      tl.to(".scene-wrapper", { y: -500, scale: 0.8, duration: 0.5 }, 0);
      
      // Rocks Move Up
      tl.to(rocksDeepRef.current, { y: "-130vh", ease: "none", duration: 1 }, 0);
      tl.to(rocksBackRef.current, { y: "-150vh", ease: "none", duration: 1 }, 0);
      tl.to(rocksMidRef.current, { y: "-180vh", ease: "none", duration: 1 }, 0);
      tl.to(rocksFrontRef.current, { y: "-210vh", ease: "none", duration: 1 }, 0);

      // Darken
      tl.to(".rock-layer", { filter: "brightness(0)", duration: 0.4, ease: "power2.in" }, 0.2);

      // Ashura: Corner -> Center -> Up
      tl.to(ashuraRef.current, {
          keyframes: [
            { x: "-50vw", y: "-50vh", xPercent: 50, yPercent: 50, scale: 1.5, duration: 0.5, ease: "power2.out" },
            { y: "-180vh", scale: 1.5, duration: 0.5, ease: "power1.in" }
          ]
      }, 0);
      tl.to("#navbar-container", { y: -100, opacity: 0, duration: 0.3 }, 0.5);
    });

    // --- MOBILE (max-width: 767px) ---
    // GOAL: Same "Corner to Center" effect, just tuned for portrait
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Slightly faster
          scrub: 1, 
          pin: true,
        }
      });

      // UI Exit
      tl.to(".ui-layer", { y: -100, opacity: 0, duration: 0.3 }, 0);
      tl.to(".scene-wrapper", { y: -300, scale: 0.8, duration: 0.5 }, 0);

      // Rocks Move Up (Synced with Ashura)
      tl.to(rocksDeepRef.current, { y: "-100vh", ease: "none", duration: 1 }, 0);
      tl.to(rocksBackRef.current, { y: "-120vh", ease: "none", duration: 1 }, 0);
      tl.to(rocksMidRef.current, { y: "-140vh", ease: "none", duration: 1 }, 0);
      tl.to(rocksFrontRef.current, { y: "-160vh", ease: "none", duration: 1 }, 0);

      // Darken
      tl.to(".rock-layer", { filter: "brightness(0)", duration: 0.4, ease: "power2.in" }, 0.2);

      // Ashura: Corner -> Center -> Up
      // Mobile screen width is smaller, so x shift is smaller.
      tl.to(ashuraRef.current, {
          keyframes: [
            {
               // Move LEFT to center screen (approx -50vw moves it left by half screen width)
               // Adjusted xPercent/yPercent to keep anchor centered
               x: "-50vw", 
               y: "-50vh", 
               xPercent: 50, 
               yPercent: 50,
               scale: 1.8, // Bigger scale on mobile to fill screen when centered
               duration: 0.5, 
               ease: "power2.out"
            },
            {
               y: "-150vh", // Exit Up
               scale: 1.8, 
               duration: 0.5, 
               ease: "power1.in"
            }
          ]
      }, 0);

      tl.to("#navbar-container", { y: -100, opacity: 0, duration: 0.3 }, 0.5);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mm.revert();
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-start pt-[15vh]">
      
      {/* UI LAYER */}
      <div className="ui-layer absolute inset-0 w-full h-full z-[60] pointer-events-none">
        <DesktopLanyards />
        <MobileSocialDock />
        <Countdown />
      </div>

      <div className="scene-wrapper relative flex items-center justify-center z-10">
        <h1 ref={textRef} className="font-black text-[#FFEBD0] text-[15vw] md:text-[8vw] tracking-[0.1em] md:tracking-[0.2em] select-none text-center drop-shadow-[0_0_20px_rgba(255,69,0,0.8)] md:drop-shadow-[0_0_40px_rgba(255,69,0,0.95)]" style={{ fontFamily: "'Mosca Laroke', sans-serif" }}>
          RECSTACY
        </h1>
      </div>

      {/* ROCK LAYERS 
          Mobile: Full width (w-full), lower down (top-[60vh]+), smaller scale so they look like a floor.
      */}
      
      {/* DEEP BACK LAYER */}
      <div 
        ref={rocksDeepRef} 
        className="rock-layer absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-[120%] md:w-[150%] z-10 pointer-events-none flex justify-center md:justify-start blur-[2px] top-[60vh] md:top-[75vh]"
        style={{ filter: 'brightness(0.3)' }}
      >
        <img src={ROCKS_GROUP_IMG} className="w-[40%] md:w-[25%] object-contain scale-75" alt="" />
        <img src={ROCKS_GROUP_IMG} className="hidden md:block w-[25%] object-contain scale-75" alt="" />
      </div>

      {/* BACK LAYER */}
      <div 
        ref={rocksBackRef} 
        className="rock-layer absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-[120%] md:w-[150%] z-20 pointer-events-none flex justify-center md:justify-start blur-[1px] top-[70vh] md:top-[95vh]"
        style={{ filter: 'brightness(0.5)' }}
      >
        <img src={ROCKS_GROUP_IMG} className="w-[50%] md:w-[30%] object-contain rotate-12" alt="" />
        <img src={ROCKS_GROUP_IMG} className="hidden md:block w-[30%] object-contain -rotate-12" alt="" />
      </div>

      {/* MID LAYER */}
      <div 
        ref={rocksMidRef} 
        className="rock-layer absolute left-1/2 -translate-x-1/2 md:-left-20 md:translate-x-0 w-[150%] md:w-[200%] z-30 pointer-events-none flex justify-center md:justify-start top-[80vh] md:top-[120vh]"
        style={{ filter: 'brightness(0.8)' }}
      >
        <img src={ROCKS_GROUP_IMG} className="w-[60%] md:w-[35%] object-contain" alt="" />
        <img src={ROCKS_GROUP_IMG} className="hidden md:block w-[35%] object-contain scale-x-[-1]" alt="" />
      </div>

      {/* FRONT LAYER */}
      <div 
        ref={rocksFrontRef} 
        className="rock-layer absolute left-1/2 -translate-x-1/2 md:-left-10 md:translate-x-0 w-[180%] md:w-[200%] z-40 pointer-events-none flex justify-center md:justify-start top-[90vh] md:top-[135vh]"
        style={{ filter: 'brightness(1)' }}
      >
        <img src={ROCKS_GROUP_IMG} className="w-[70%] md:w-[40%] object-contain rotate-6 blur-[1px]" alt="" />
        <img src={ROCKS_GROUP_IMG} className="hidden md:block w-[40%] object-contain scale-105 -rotate-6 blur-[0.5px]" alt="" />
      </div>

      {/* ASHURA IMAGE
          Unified CSS: Always bottom-right, but Width changes.
          Mobile: w-[45vw] (small corner)
          Desktop: w-[15vw] (small corner)
      */}
      <img 
        ref={ashuraRef}
        src={ASHURA_IMG} 
        alt="Ashura Deity" 
        className="absolute bottom-0 right-0 z-[50] pointer-events-none object-contain drop-shadow-[0_0_50px_rgba(255,100,0,0.6)] w-[45vw] md:w-[15vw]"
      />
    </div>
  );
};

// --- APP ROOT ---
const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<div className="h-screen flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">About Us Page</div>} />
          <Route path="/events" element={<div className="h-screen flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">Events Page</div>} />
          <Route path="/contact" element={<div className="h-screen flex items-center justify-center text-4xl font-bold text-[#FFEBD0]">Contact Page</div>} />
        </Routes>
        <div className="h-screen w-full bg-black flex items-center justify-center relative z-40">
            <h2 className="text-white font-bold text-2xl">Content Below Fold</h2>
        </div>
      </div>
    </Router>
  );
}

export default App;