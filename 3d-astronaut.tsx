import React, { useRef, Suspense } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// --- 3D IMPORTS ---
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// --- ASSET DEFINITIONS ---
const ASTRONAUT_MODEL = "/astronaut 3d model.glb"; // Make sure exact filename matches
const FB_MOON_IMG = "/cres.png";   
const INSTA_MOON_IMG = "/moon.png"; 

// --- 1. DESKTOP LANYARDS (The Moon Version) ---
const DesktopLanyards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const instaRef = useRef<HTMLAnchorElement>(null);
  const fbRef = useRef<HTMLAnchorElement>(null);
  const instaIconRef = useRef<HTMLDivElement>(null);
  const fbIconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!instaRef.current || !fbRef.current) return;

    // Drop Animation
    gsap.from([instaRef.current, fbRef.current], {
      y: -500, duration: 2, ease: "bounce.out", stagger: 0.2, delay: 0.2
    });

    // Swing Animation
    const startSwing = (target: any, duration: number, angle: number, delay: number) => {
      gsap.to(target, { rotation: angle, duration: duration, repeat: -1, yoyo: true, ease: "sine.inOut", transformOrigin: "top center", delay: delay });
      gsap.set(target, { rotation: -angle });
    };
    startSwing(instaRef.current, 3.5, 6, 1.5);
    startSwing(fbRef.current, 4.5, 4, 2.0);
  }, { scope: containerRef });

  const handleEnter = (target: any) => { gsap.to(target, { y: -10, scale: 1.05, duration: 0.4, ease: "back.out(1.7)" }); };
  const handleLeave = (target: any) => { gsap.to(target, { y: 0, scale: 1, duration: 0.5, ease: "bounce.out" }); };

  const moonImageClasses = "w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] group-hover:invert group-hover:grayscale group-hover:brightness-110 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]";

  return (
    <div ref={containerRef} className="hidden md:flex fixed top-0 right-16 z-50 gap-4 items-start pointer-events-auto">
      {/* Facebook (Left - Short String) */}
      <a ref={fbRef} href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center origin-top">
        <div className="absolute -top-1 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]"></div>
        <div className="w-[1px] h-32 bg-gradient-to-b from-white/50 to-white/80 pointer-events-none"></div>
        <div ref={fbIconRef} className="relative cursor-pointer -mt-2" onMouseEnter={() => handleEnter(fbIconRef.current)} onMouseLeave={() => handleLeave(fbIconRef.current)}>
           <img src={FB_MOON_IMG} alt="Facebook" className={moonImageClasses} />
        </div>
      </a>
      {/* Instagram (Right - Long String) */}
      <a ref={instaRef} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center origin-top">
        <div className="absolute -top-1 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]"></div>
        <div className="w-[1px] h-40 bg-gradient-to-b from-white/50 to-white/80 pointer-events-none"></div>
        <div ref={instaIconRef} className="relative cursor-pointer -mt-2" onMouseEnter={() => handleEnter(instaIconRef.current)} onMouseLeave={() => handleLeave(instaIconRef.current)}>
           <img src={INSTA_MOON_IMG} alt="Instagram" className={moonImageClasses} />
        </div>
      </a>
    </div>
  );
};

// --- 2. MOBILE DOCK ---
const MobileSocialDock = () => {
  return (
    <div className="flex md:hidden fixed bottom-6 left-0 right-0 z-50 justify-center gap-6 pointer-events-auto">
      <a href="https://instagram.com" className="group flex items-center px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md active:scale-95 transition-transform">
        <span className="text-white font-bold text-sm tracking-[0.2em] opacity-80" style={{ fontFamily: "'Orbitron', sans-serif" }}>INSTA</span>
      </a>
      <a href="https://facebook.com" className="group flex items-center px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md active:scale-95 transition-transform">
        <span className="text-white font-bold text-sm tracking-[0.2em] opacity-80" style={{ fontFamily: "'Orbitron', sans-serif" }}>FB</span>
      </a>
    </div>
  );
};

// --- 3. COUNTDOWN ---
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
      if (diff <= 0) return { d: 0, h: 0, m: 0 };
      return {
        d: Math.floor(diff / (86400000)),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000)
      };
    };

    const finalValues = getRemaining();
    const tracker = { d: 0, h: 0, m: 0 };
    const tl = gsap.timeline();

    tl.to(tracker, {
      d: finalValues.d, h: finalValues.h, m: finalValues.m,
      duration: 2.5, ease: "power3.out", snap: { d: 1, h: 1, m: 1 },
      onUpdate: () => {
        if (daysRef.current) daysRef.current.innerText = fmt(tracker.d);
        if (hoursRef.current) hoursRef.current.innerText = fmt(tracker.h);
        if (minsRef.current) minsRef.current.innerText = fmt(tracker.m);
      },
      onComplete: () => {
        const interval = setInterval(() => {
          const current = getRemaining();
          if (daysRef.current) daysRef.current.innerText = fmt(current.d);
          if (hoursRef.current) hoursRef.current.innerText = fmt(current.h);
          if (minsRef.current) minsRef.current.innerText = fmt(current.m);
        }, 1000);
        return () => clearInterval(interval);
      }
    });
  }, []);

  const labels = ["DAYS", "HOURS", "MINS"];
  const refs = [daysRef, hoursRef, minsRef];

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-auto md:left-auto md:right-10 md:bottom-10 md:translate-x-0 md:translate-y-0 flex gap-4 md:gap-6 z-30 select-none pointer-events-none items-start" style={{ fontFamily: "'Man of Space', sans-serif" }}>
      {labels.map((label, idx) => (
        <React.Fragment key={idx}>
          <div className="flex flex-col items-center">
            <span ref={refs[idx]} className="text-5xl md:text-7xl font-black leading-none text-white/50 w-[1.5em] text-center">00</span>
            <span className="text-[10px] md:text-sm tracking-widest text-white/30 mt-2">{label}</span>
          </div>
          {idx < labels.length - 1 && <div className="text-4xl md:text-6xl text-white/40 -mt-1 md:-mt-2">:</div>}
        </React.Fragment>
      ))}
    </div>
  );
};

// --- 4. THE 3D ASTRONAUT COMPONENT ---
const Astronaut3D = () => {
  const { scene } = useGLTF(ASTRONAUT_MODEL);
  const ref = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  // Replicate the previous GSAP Figure-8 logic using useFrame
  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime() * 0.35; // Speed of orbit
    
    // Calculate responsiveness based on viewport width (units, not pixels)
    // Adjust these multipliers to change how wide the figure-8 is
    const widthRadius = viewport.width * 0.18; 
    const heightRadius = viewport.width * 0.05;

    // 1. Automatic Figure-8 Movement
    const autoX = widthRadius * Math.sin(t);
    const autoY = heightRadius * Math.sin(t * 2);

    // 2. Mouse Parallax (Interactive movement)
    // mouse.x goes from -1 to 1. We multiply to give it some range.
    const mouseX = (mouse.x * viewport.width) * 0.05;
    const mouseY = (mouse.y * viewport.height) * 0.05;

    // Apply positions
    ref.current.position.x = autoX + mouseX;
    ref.current.position.y = autoY + mouseY;

    // 3. Rotation logic
    // Add a slow spin + tilt based on movement
    ref.current.rotation.y = t * 0.5 + (mouse.x * 0.5); // Spin
    ref.current.rotation.z = Math.sin(t) * 0.1 + (mouse.x * 0.1); // Slight Tilt
  });

  return (
    // Adjust scale here if the model is too big/small
    <primitive 
      object={scene} 
      ref={ref} 
      scale={2} 
      rotation={[0.3, Math.PI, 0]} // Initial rotation adjustment
    />
  );
};

// --- 5. MAIN APP ---
const App: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-start pt-[15vh] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
      
      <DesktopLanyards />
      <MobileSocialDock />

      {/* The 3D Scene Wrapper */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          {/* Environment helps metallic parts look shiny */}
          <Environment preset="city" />
          
          <Suspense fallback={null}>
             <Astronaut3D />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative flex items-center justify-center pointer-events-none">
        <h1 
          ref={textRef}
          className="font-black text-white text-[13vw] md:text-[6vw] tracking-[0.2em] select-none z-10 mix-blend-difference pl-4 text-neon"
          style={{ fontFamily: "'Mosca Laroke', sans-serif" }} 
        >
          RECSTACY
        </h1>
      </div>

      <Countdown />
    </div>
  );
};

export default App;