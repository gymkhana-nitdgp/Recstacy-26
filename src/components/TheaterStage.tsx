import React, { useRef, Suspense, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, useTexture } from '@react-three/drei';
import HangingCard from './HangingCard';
import { CurtainSide } from './CurtainSide';
import * as THREE from 'three';

// Define asset paths
const P1 = "/assets/people/person1.png";
const P2 = "/assets/people/person2.png";
const P3 = "/assets/people/person3.png";
const P4 = "/assets/people/person4.png";
const P5 = "/assets/people/person5.png";
const P6 = "/assets/people/person6.png";
const P7 = "/assets/people/person7.png";
const P8 = "/assets/people/person8.png";

const ALL_TEXTURES = [P1, P2, P3, P4, P5, P6, P7, P8];

const teamMembers = [
  { id: 1, name: "Debangshu", role: "Coordinator", instaId: "debangshu_here_", img: P1 },
  { id: 2, name: "Bikarna", role: "Coordinator", instaId: "bikarna_21", img: P2 },
  { id: 3, name: "Shreyan", role: "Coordinato", instaId: "shreyan_roy_", img: P3 },
  { id: 4, name: "Rishikesh", role: "Coordinator", instaId: "", img: P4 },
  { id: 5, name: "Soham", role: "Member", instaId: "sohamchatrg", img: P5 },
  { id: 6, name: "Abhra", role: "Member", instaId: "abhra_00", img: P6 },
  { id: 7, name: "Ritam", role: "Member", instaId: "ritam_koley_10", img: P7 },
  { id: 8, name: "Zafar", role: "Member", instaId: "zaf_ar029", img: P8 },
];

interface TheaterStageProps {
  forceClosed?: boolean;
}

const getProgress = (raw: number, forceClosed: boolean) => {
    if (forceClosed) return 1;
    let p = (raw - 0.2) / (0.9 - 0.2); 
    return Math.max(0, Math.min(1, p));
};

const LeftCurtainGroup = ({ children, smoothProgress, forceClosed }: { children: React.ReactNode, smoothProgress: MotionValue<number>, forceClosed: boolean }) => {
    const group = useRef<THREE.Group>(null);
    const { viewport } = useThree();
    useFrame(() => {
        if(group.current) {
            const raw = smoothProgress.get(); 
            const progress = getProgress(raw, forceClosed);
            const startX = -viewport.width / 1.5;
            const endX = 0;
            group.current.position.x = THREE.MathUtils.lerp(startX, endX, progress);
        }
    })
    return <group ref={group}>{children}</group>
}

const RightCurtainGroup = ({ children, smoothProgress, forceClosed }: { children: React.ReactNode, smoothProgress: MotionValue<number>, forceClosed: boolean }) => {
    const group = useRef<THREE.Group>(null);
    const { viewport } = useThree();
    useFrame(() => {
        if(group.current) {
            const raw = smoothProgress.get();
            const progress = getProgress(raw, forceClosed);
            const startX = viewport.width / 1.5;
            const endX = 0;
            group.current.position.x = THREE.MathUtils.lerp(startX, endX, progress);
        }
    })
    return <group ref={group}>{children}</group>
}

export const TheaterStage: React.FC<TheaterStageProps> = ({ forceClosed = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 25, damping: 35, mass: 1 });
  const leftX = forceClosed ? "0%" : useTransform(smoothProgress, [0.15, 0.95], ["-100%", "0%"]);
  const rightX = forceClosed ? "0%" : useTransform(smoothProgress, [0.15, 0.95], ["100%", "0%"]);
  const titleOpacity = forceClosed ? 1 : useTransform(smoothProgress, [0.15, 0.85], [0, 1]); 

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
      // Preload textures for the component
      useTexture.preload(ALL_TEXTURES);
  }, []);

  const getGridPos = (i: number, isLeftGroup: boolean): [number, number, number] => {
      if (isMobile) {
          const columnX = isLeftGroup ? -1.5 : 1.5; 
          const yStart = 3.5; 
          const yGap = 2.2; 
          return [columnX, yStart - (i * yGap), 0];
      } else {
          const col = i % 2; 
          const row = Math.floor(i / 2);
          const xSpacing = 2.2; 
          const ySpacing = 2.2; 
          const sideCenterX = isLeftGroup ? -2.8 : 2.8;
          const x = sideCenterX + (col === 0 ? -xSpacing/2 : xSpacing/2);
          const y = 1.0 - (row * ySpacing);
          return [x, y, 0];
      }
  };

  const getHeightClass = () => {
      if (isMobile) return "h-[250vh]";
      if (forceClosed) return "h-screen w-full overflow-hidden"; 
      return "h-[350vh]";
  };

  return (
    <div ref={containerRef} className={`relative bg-black ${getHeightClass()}`}>
      <div className={`sticky top-0 w-full h-screen overflow-hidden`}>
        
        <CurtainSide x={leftX} side="left" />
        <CurtainSide x={rightX} side="right" />

        <motion.div 
          className="absolute inset-0 z-40" 
          style={{ pointerEvents: isMobile ? 'none' : 'auto', touchAction: 'pan-y' }}
        >
            <Canvas 
                camera={{ position: [0, 0, 18], fov: isMobile ? 32 : 20 }}
                dpr={[1, 1.5]}
                gl={{ 
                  alpha: true, 
                  antialias: true,
                  powerPreference: "high-performance",
                  stencil: false,
                  depth: true 
                }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
                <ambientLight intensity={2} />
                <Environment blur={0.75}>
                    <Lightformer intensity={2} color="white" position={[0, -1, 5]} scale={[10, 1, 1]} />
                    <Lightformer intensity={3} color="white" position={[-1, -1, 1]} scale={[10, 1, 1]} />
                </Environment>

                <Suspense fallback={null}>
                    <LeftCurtainGroup smoothProgress={smoothProgress} forceClosed={forceClosed}>
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
                    </LeftCurtainGroup>

                    <RightCurtainGroup smoothProgress={smoothProgress} forceClosed={forceClosed}>
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
                    </RightCurtainGroup>
                </Suspense>
            </Canvas>
        </motion.div>

        <motion.div 
          style={{ opacity: titleOpacity }}
          className="absolute top-6 md:top-31 left-0 right-0 z-50 text-center pointer-events-none px-4"
        >
           <h1 
             className="text-[10vw] md:text-6xl font-black text-[#FFEBD0] uppercase leading-tight"
             style={{ 
                fontFamily: "'Mosca Laroke', sans-serif",
                textShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 40px rgba(255, 100, 0, 0.3)" 
             }}
           >
             Contact Us
           </h1>
        </motion.div>
      </div>
    </div>
  );
};