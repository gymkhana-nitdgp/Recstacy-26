import React, { useRef, Suspense, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useTexture } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HangingCard from "./HangingCard";
import { CurtainSide } from "./CurtainSide";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// --- CONSTANTS ---
const P1 = "/assets/people/person1.png";
const P2 = "/assets/people/person2.png";
const P3 = "/assets/people/person3.png";
const P4 = "/assets/people/person4.png";
const P5 = "/assets/people/person5.png";
const P6 = "/assets/people/person6.png";
const P7 = "/assets/people/person7.jpeg";
const P8 = "/assets/people/person8.png";

const ALL_TEXTURES = [P1, P2, P3, P4, P5, P6, P7, P8];

const teamMembers = [
  { id: 1, name: "Debangshu", role: "Event Head", instaId: "debangshu_here_", img: P1 },
  { id: 2, name: "Bikarna", role: "Chief Convener", instaId: "bikarna_21", img: P2 },
  { id: 3, name: "Shreyan", role: "CC Head", instaId: "shreyan_roy_", img: P3 },
  { id: 4, name: "Rishikesh", role: "Principal Coordinator", instaId: "", img: P4 },
  { id: 5, name: "Soham", role: "Executive Coordinator", instaId: "sohamchatrg", img: P5 },
  { id: 6, name: "Abhra", role: "SeniorMember", instaId: "abhra_00", img: P6 },
  { id: 7, name: "Ritam", role: "Developer", instaId: "ritam_koley_10", img: P7 },
  { id: 8, name: "Zafar", role: "Senior Member", instaId: "zaf_ar029", img: P8 },
];

// --- HELPER COMPONENTS ---

interface CurtainGroupProps {
  children: React.ReactNode;
  smoothProgress: MotionValue<number>; 
  forceClosed: boolean;
  side: 'left' | 'right';
}

const CurtainGroup: React.FC<CurtainGroupProps> = ({ children, smoothProgress, forceClosed, side }) => {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame(() => {
    if (!group.current) return;
    const raw = smoothProgress.get();
    let progress = forceClosed ? 1 : (raw - 0.1) / (0.85 - 0.1);
    progress = Math.max(0, Math.min(1, progress));

    const direction = side === 'left' ? -1 : 1;
    const startX = (viewport.width / 1.5) * direction;
    const endX = 0;

    group.current.position.x = THREE.MathUtils.lerp(startX, endX, progress);
  });

  return <group ref={group}>{children}</group>;
};

// --- MAIN COMPONENT ---

export const TheaterStage2: React.FC<{ forceClosed?: boolean; onClosed?: () => void }> = ({ 
    forceClosed = false, 
    onClosed 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    useTexture.preload(ALL_TEXTURES);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Physics: Slow and Cinematic
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 12, 
    damping: 18, 
    mass: 3 
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest > 0.95 && onClosed) {
      onClosed();
    }
  });

  const leftXTransform = useTransform(smoothProgress, [0.1, 0.85], ["-100%", "0%"]);
  const rightXTransform = useTransform(smoothProgress, [0.1, 0.85], ["100%", "0%"]);
  const titleOpacityTransform = useTransform(smoothProgress, [0.9, 0.98], [0, 1]);
  
  const leftX = forceClosed ? "0%" : leftXTransform;
  const rightX = forceClosed ? "0%" : rightXTransform;
  const titleOpacity = forceClosed ? 1 : titleOpacityTransform;

  const getGridPos = useMemo(() => (i: number, isLeftGroup: boolean): [number, number, number] => {
    if (isMobile) {
      const columnX = isLeftGroup ? -1.5 : 1.5;
      const yStart = 3.5;
      const yGap = 2.2;
      return [columnX, yStart - i * yGap, 0];
    } else {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const xSpacing = 2.2;
      const ySpacing = 2.2;
      const sideCenterX = isLeftGroup ? -2.8 : 2.8;
      const x = sideCenterX + (col === 0 ? -xSpacing / 2 : xSpacing / 2);
      const y = 1.0 - row * ySpacing;
      return [x, y, 0];
    }
  }, [isMobile]);

  // FIX 1: Safer GSAP Initialization
  // We use fromTo to ensure opacity starts at 0 and goes to 1, regardless of CSS state.
  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Force a refresh to handle lazy-load layout shifts
    ScrollTrigger.refresh();

    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Trigger slightly earlier
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  // FIX 2: Height Adjustment
  // Desktop needs 250vh-300vh to give the user "room" to scroll and close curtains.
  // 100vh was causing it to finish instantly or break.
  const heightClass = isMobile ? "h-[100vh]" : "h-[100vh]";

  return (
    <div 
      ref={containerRef} 
      className={`relative bg-black ${heightClass}`}
    >
      <div className={`sticky top-0 w-full h-screen overflow-hidden`}>
        
        <div className="absolute inset-0 z-30 pointer-events-none will-change-transform">
           <CurtainSide x={leftX} side="left" />
           <CurtainSide x={rightX} side="right" />
        </div>

        <motion.div
          className="absolute inset-0 z-40"
          style={{ pointerEvents: isMobile ? "none" : "auto", touchAction: "pan-y" }}
        >
          <Canvas
            camera={{ position: [0, 0, 18], fov: isMobile ? 32 : 20 }}
            dpr={[1, 1.5]} 
            gl={{
              alpha: true,
              antialias: !isMobile, 
              powerPreference: "high-performance",
              stencil: false,
              depth: true,
            }}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          >
            <ambientLight intensity={2} />
            {!isMobile ? (
              <Environment blur={0.75}>
                <Lightformer intensity={2} color="white" position={[0, -1, 5]} scale={[10, 1, 1]} />
                <Lightformer intensity={3} color="white" position={[-1, -1, 1]} scale={[10, 1, 1]} />
              </Environment>
            ) : (
               <directionalLight position={[5, 5, 5]} intensity={1.5} />
            )}

            <Suspense fallback={null}>
              <CurtainGroup side="left" smoothProgress={smoothProgress} forceClosed={forceClosed}>
                {teamMembers.slice(0, 4).map((m, i) => (
                  <HangingCard
                    key={m.id}
                    position={getGridPos(i, true)}
                    name={m.name}
                    role={m.role}
                    instaId={m.instaId}
                    imageUrl={m.img}
                  />
                ))}
              </CurtainGroup>

              <CurtainGroup side="right" smoothProgress={smoothProgress} forceClosed={forceClosed}>
                {teamMembers.slice(4, 8).map((m, i) => (
                  <HangingCard
                    key={m.id}
                    position={getGridPos(i, false)}
                    name={m.name}
                    role={m.role}
                    instaId={m.instaId}
                    imageUrl={m.img}
                  />
                ))}
              </CurtainGroup>
            </Suspense>
          </Canvas>
        </motion.div>

        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute top-6 md:top-31 left-0 right-0 z-50 text-center pointer-events-none px-4"
        >
          <h1
            className="block w-full text-[10vw] md:text-6xl font-black text-[#FFEBD0] uppercase leading-tight pt-[30px] md:pt-[100px] lg:pt-[100px]"
            style={{
              fontFamily: "'Mosca Laroke', sans-serif",
              textShadow: isMobile 
                ? "0 2px 5px rgba(0,0,0,0.8)" 
                : "0 10px 30px rgba(0,0,0,0.8), 0 0 40px rgba(255, 100, 0, 0.3)",
            }}
          >
            Contact Us
          </h1>
        </motion.div>
      </div>
    </div>
  );
};