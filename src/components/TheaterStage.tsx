import React, { useRef, Suspense, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { Physics as RapierPhysics } from '@react-three/rapier';
import SafeLanyard from './SafeLanyard';
import { CurtainSide } from './CurtainSide';

// Asset Imports
const p1 = "/assets/people/person1.png";
const p2 = "/assets/people/person2.png";
const p3 = "/assets/people/person3.png";
const p4 = "/assets/people/person4.png";
const p5 = "/assets/people/person5.png";
const p6 = "/assets/people/person6.png";
const p7 = p1; 
const p8 = p2;

const teamMembers = [
  { id: 1, name: "Alice", role: "Dev", email: "alice@recstacy.com", img: p1 },
  { id: 2, name: "Bob", role: "Design", email: "bob@recstacy.com", img: p2 },
  { id: 3, name: "Charlie", role: "Manager", email: "charlie@recstacy.com", img: p3 },
  { id: 4, name: "David", role: "Sales", email: "david@recstacy.com", img: p4 },
  { id: 5, name: "Eve", role: "Marketing", email: "eve@recstacy.com", img: p5 },
  { id: 6, name: "Frank", role: "Support", email: "frank@recstacy.com", img: p6 },
  { id: 7, name: "Grace", role: "HR", email: "grace@recstacy.com", img: p7 },
  { id: 8, name: "Hank", role: "Ops", email: "hank@recstacy.com", img: p8 },
];

interface TheaterStageProps {
  forceClosed?: boolean;
}

// REMOVED 'scrollProgress' prop entirely
const LanyardGroup = ({ forceClosed }: { forceClosed?: boolean }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const getPosition = (index: number, isMob: boolean): [number, number, number] => {
        if (isMob) {
            const col = index % 2; 
            const row = Math.floor(index / 2); 
            const x = col === 0 ? -1.3 : 1.3;
            const y = 2.8 - (row * 1.9);
            return [x, y, 0];
        } else {
            const col = index % 4; 
            const row = Math.floor(index / 4); 
            const x = -3.6 + (col * 2.4);
            const y = row === 0 ? 1.8 : -1.0;
            return [x, y, 0];
        }
    }

    return (
       <group>
          {teamMembers.map((member, i) => (
             <SafeLanyard 
                key={member.id}
                // STATIC POSITIONS ONLY - No fly up math here
                position={getPosition(i, isMobile)}
                name={member.name}
                role={member.role}
                email={member.email}
                imageUrl={member.img}
             />
          ))}
       </group>
    )
}

export const TheaterStage: React.FC<TheaterStageProps> = ({ forceClosed = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  
  // 1. Curtains: Close from 0% to 80% scroll
  const leftX = forceClosed ? "0%" : useTransform(smoothProgress, [0, 0.8], ["-30%", "0%"]);
  const rightX = forceClosed ? "0%" : useTransform(smoothProgress, [0, 0.8], ["30%", "0%"]);
  
  // 2. Title: Fades in early
  const titleOpacity = forceClosed ? 1 : useTransform(smoothProgress, [0.1, 0.6], [0, 1]);
  
  // 3. CARDS: Fade in STRICTLY AFTER curtains close (0.8 to 1.0)
  // This ensures they appear slowly only when the background is fully red/closed.
  const cardsOpacity = forceClosed ? 1 : useTransform(smoothProgress, [0.8, 1], [0, 1]);
  
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
  }, []);
  
  const getHeightClass = () => {
      if (!forceClosed) return "h-[200vh]"; 
      return "min-h-[150vh] md:h-screen md:min-h-screen"; 
  };

  return (
    <div ref={containerRef} className={`relative w-full bg-black z-30 ${getHeightClass()}`}>
      
      <div className={`sticky top-0 w-full overflow-hidden h-screen`}>
        
        <CurtainSide x={leftX} side="left" />
        <CurtainSide x={rightX} side="right" />

        <motion.div 
          className="absolute inset-0 z-40" 
          style={{ 
            opacity: isMobile && forceClosed ? 1 : cardsOpacity,
            pointerEvents: (isMobile && forceClosed) ? 'none' : 'auto'
          }}
        >
            <Canvas 
                camera={{ position: [0, 0, 18], fov: isMobile ? 28 : 20 }} 
                gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
                <ambientLight intensity={2} />
                <Environment blur={0.75}>
                    <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                </Environment>

                <Suspense fallback={null}>
                    <RapierPhysics gravity={[0, -40, 0]} timeStep={1/60}>
                        <LanyardGroup forceClosed={forceClosed} />
                    </RapierPhysics>
                </Suspense>
            </Canvas>
        </motion.div>

        <motion.div 
          style={{ opacity: titleOpacity }}
          className="absolute top-6 left-0 right-0 z-50 text-center pointer-events-none px-4"
        >
           <h1 className="text-[12vw] md:text-7xl font-black text-[#FFEBD0] uppercase tracking-widest drop-shadow-2xl leading-tight">
             Contact Us
           </h1>
           <p className="text-white/60 text-xs md:text-sm mt-2 tracking-widest font-light">
             {isMobile && forceClosed ? "SCROLL TO VIEW TEAM" : "DRAG CARDS TO INTERACT"}
           </p>
        </motion.div>

      </div>
    </div>
  );
};