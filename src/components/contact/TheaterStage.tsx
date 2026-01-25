import React, { useRef, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import HangingCard from "./HangingCard";
import { CurtainSide } from "../CurtainSide";
import { TEAMMEMBERS } from "../../constants";
import Footer from "../Footer";

interface TheaterStageProps {
  forceClosed?: boolean;
}

const getProgress = (raw: number, forceClosed: boolean) => {
  if (forceClosed) return 1;
  // Lowered limit slightly to ensure animation definitely finishes on shorter mobile scroll
  const limit = 0.9; 
  const p = raw / limit;
  return Math.max(0, Math.min(1, p));
};

const LeftCurtainGroup = ({
  children,
  smoothProgress,
  forceClosed,
}: {
  children: React.ReactNode;
  smoothProgress: MotionValue<number>;
  forceClosed: boolean;
}) => {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  useFrame(() => {
    if (group.current) {
      const raw = smoothProgress.get();
      const progress = getProgress(raw, forceClosed);
      const startX = -viewport.width / 1.2;
      const endX = 0;
      group.current.position.x = THREE.MathUtils.lerp(startX, endX, progress);
    }
  });
  return <group ref={group}>{children}</group>;
};

const RightCurtainGroup = ({
  children,
  smoothProgress,
  forceClosed,
}: {
  children: React.ReactNode;
  smoothProgress: MotionValue<number>;
  forceClosed: boolean;
}) => {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  useFrame(() => {
    if (group.current) {
      const raw = smoothProgress.get();
      const progress = getProgress(raw, forceClosed);
      const startX = viewport.width / 1.2;
      const endX = 0;
      group.current.position.x = THREE.MathUtils.lerp(startX, endX, progress);
    }
  });
  return <group ref={group}>{children}</group>;
};

export const TheaterStage: React.FC<TheaterStageProps> = ({ forceClosed = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  /** * FIX 1: Tighter Spring Physics 
   * Stiffness 120 (was 15) makes it respond immediately to the finger.
   * Damping 20 prevents it from wobbling but keeps it smooth.
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120, 
    damping: 20, 
    mass: 0.5 
  });

  const scrollLimit = 0.9;
  const leftXTransform = useTransform(smoothProgress, [0, scrollLimit], ["-100%", "0%"]);
  const rightXTransform = useTransform(smoothProgress, [0, scrollLimit], ["100%", "0%"]);
  const titleOpacityTransform = useTransform(smoothProgress, [scrollLimit * 0.8, scrollLimit], [0, 1]);

  const leftX = forceClosed ? "0%" : leftXTransform;
  const rightX = forceClosed ? "0%" : rightXTransform;
  const titleOpacity = forceClosed ? 1 : titleOpacityTransform;

  const getGridPos = (i: number, isLeftGroup: boolean): [number, number, number] => {
    if (isMobile) {
      const columnX = isLeftGroup ? -1.3 : 1.3;
      const yStart = 3.5;
      const yGap = 2.1;
      return [columnX, yStart - i * yGap - (forceClosed ? 0.2 : 0.6), 0];
    } else {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const xSpacing = 2.2;
      const ySpacing = 2.4;
      const sideCenterX = isLeftGroup ? -2.8 : 2.8;
      const x = sideCenterX + (col === 0 ? -xSpacing / 2 : xSpacing / 2);
      const y = 0.5 - row * ySpacing; 
      return [x, y + (forceClosed ? 0.3 : 0.6), 0];
    }
  };

  /**
   * FIX 2: Reduced Mobile Scroll Height
   * Changed h-[200vh] to h-[140vh] on mobile.
   * This reduces the physical distance the user must scroll.
   */
  const containerHeight = forceClosed 
    ? "h-screen" 
    : "h-[140vh] md:h-[200vh]"; 

  return (
    <>
      <div 
        ref={containerRef} 
        className={`relative bg-black w-full -mt-1 ${containerHeight}`}
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          
          <CurtainSide x={leftX} side="left" />
          <CurtainSide x={rightX} side="right" />

          <motion.div 
            className="absolute inset-0 z-40" 
            // FIX 3: Allow Vertical Pan
            // 'none' blocks scrolling. 'pan-y' allows the browser to handle vertical scrolling naturally.
            style={{ touchAction: "pan-y" }}
          >
            <Canvas
              camera={{ position: [0, 0, 18], fov: isMobile ? 35 : 20 }}
              dpr={[1, 1.5]} // Keep DPR reasonable for mobile performance
              gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
              style={{ width: "100%", height: "100%" }}
            >
              <Suspense fallback={null}>
                <LeftCurtainGroup 
                  smoothProgress={smoothProgress} 
                  forceClosed={forceClosed}
                >
                  {TEAMMEMBERS.slice(0, 4).map((ele, i) => (
                    <HangingCard key={ele.id} position={getGridPos(i, true)} attributes={ele} />
                  ))}
                </LeftCurtainGroup>

                <RightCurtainGroup 
                  smoothProgress={smoothProgress} 
                  forceClosed={forceClosed}
                >
                  {TEAMMEMBERS.slice(4, 8).map((m, i) => (
                    <HangingCard key={m.id} position={getGridPos(i, false)} attributes={m} />
                  ))}
                </RightCurtainGroup>
              </Suspense>
            </Canvas>
          </motion.div>

          <motion.div
            style={{ opacity: titleOpacity }}
            className="absolute top-[10%] md:top-[10%] left-0 right-0 z-50 text-center pointer-events-none px-4"
          >
            <h1
              className="text-[12vw] md:text-6xl font-black text-[#FFEBD0] uppercase leading-tight"
              style={{
                fontFamily: "'Mosca Laroke', sans-serif",
                textShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 40px rgba(255, 100, 0, 0.3)",
              }}
            >
              Contact Us
            </h1>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default TheaterStage;
