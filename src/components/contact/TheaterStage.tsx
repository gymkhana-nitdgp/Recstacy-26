import React, { useRef, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HangingCard from "./HangingCard";
import { CurtainSide } from "../CurtainSide";
import * as THREE from "three";
import { TEAMMEMBERS } from "../../constants";
import Footer from "../Footer";
gsap.registerPlugin(ScrollTrigger);

interface TheaterStageProps {
  forceClosed?: boolean;
}

const getProgress = (raw: number, forceClosed: boolean) => {
  if (forceClosed) return 1;
  const p = (raw - 0.2) / (0.9 - 0.2);
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
      const startX = -viewport.width / 1.5;
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
      const startX = viewport.width / 1.5;
      const endX = 0;
      group.current.position.x = THREE.MathUtils.lerp(startX, endX, progress);
    }
  });
  return <group ref={group}>{children}</group>;
};

export const TheaterStage: React.FC<TheaterStageProps> = ({ forceClosed = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 25, damping: 35, mass: 1 });
  const leftXTransform = useTransform(smoothProgress, [0.15, 0.95], ["-100%", "0%"]);
  const rightXTransform = useTransform(smoothProgress, [0.15, 0.95], ["100%", "0%"]);
  const titleOpacityTransform = useTransform(smoothProgress, [0.15, 0.85], [0, 1]);

  const leftX = forceClosed ? "0%" : leftXTransform;
  const rightX = forceClosed ? "0%" : rightXTransform;
  const titleOpacity = forceClosed ? 1 : titleOpacityTransform;

  const [isMobile, setIsMobile] = useState(false);

  // Scroll-triggered entrance: fade and slide up when section enters viewport
  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.set(containerRef.current, { opacity: 0, y: 60 });
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getGridPos = (i: number, isLeftGroup: boolean): [number, number, number] => {
    // forceclosed-> false = home
    // forceclosed-> true = button
    if (isMobile) {
      const columnX = isLeftGroup ? -1.3 : 1.3;
      const yStart = 3.5;
      const yGap = 2.1;
      if (forceClosed) return [columnX, yStart - i * yGap -0.2, 0];
      return [columnX, yStart - i * yGap - 0.6, 0];
    } else {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const xSpacing = 2.2;
      const ySpacing = 2.4;
      const sideCenterX = isLeftGroup ? -2.8 : 2.8;
      const x = sideCenterX + (col === 0 ? -xSpacing / 2 : xSpacing / 2);
      const y = 1.0 - row * ySpacing;
      if (forceClosed) {
        return [x, y + 0.3, 0];
      }
      return [x, y + 0.6, 0];
    }
  };

  const getHeightClass = () => {
    if (isMobile) return "h-[100vh]";
    if (forceClosed) return "h-screen w-full overflow-hidden";
    return "h-[100vh]";
  };

  return (
    <>
      <motion.div ref={containerRef} className={`relative bg-black ${getHeightClass()}`}>
        <div className={`sticky top-0 w-full h-screen overflow-hidden`}>
          <CurtainSide x={leftX} side="left" />
          <CurtainSide x={rightX} side="right" />

          <motion.div
            className="absolute inset-0 z-40"
            style={{ pointerEvents: isMobile ? "none" : "auto", touchAction: "pan-y" }}
          >
            <Canvas
              camera={{ position: [0, 0, 18], fov: isMobile ? 32 : 20 }}
              dpr={[1, 1.5]}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: true,
              }}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            >
              <Suspense fallback={null}>
                <LeftCurtainGroup smoothProgress={smoothProgress} forceClosed={forceClosed}>
                  {TEAMMEMBERS.slice(0, 4).map((ele, i) => (
                    <HangingCard key={ele.id} position={getGridPos(i, true)} attributes={ele} />
                  ))}
                </LeftCurtainGroup>

                <RightCurtainGroup smoothProgress={smoothProgress} forceClosed={forceClosed}>
                  {TEAMMEMBERS.slice(4, 8).map((m, i) => (
                    <HangingCard key={m.id} position={getGridPos(i, false)} attributes={m} />
                  ))}
                </RightCurtainGroup>
              </Suspense>
            </Canvas>
          </motion.div>

          <motion.div
            style={{ opacity: titleOpacity }}
            className="absolute top-8 md:top-31 left-0 right-0 z-50 text-center pointer-events-none px-4"
          >
            <h1
              className="text-[10vw] md:text-6xl font-black text-[#FFEBD0] uppercase leading-tight pt-[30px]"
              style={{
                fontFamily: "'Mosca Laroke', sans-serif",
                textShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 40px rgba(255, 100, 0, 0.3)",
              }}
            >
              Contact Us
            </h1>
          </motion.div>
        </div>
        <Footer />
      </motion.div>
      <Footer />
    </>
  );
};
