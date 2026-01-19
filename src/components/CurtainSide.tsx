import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface CurtainSideProps {
  x: string | MotionValue<string>;
  side: 'left' | 'right';
  scale?: MotionValue<number>;
}

export const CurtainSide: React.FC<CurtainSideProps> = ({ x, side, scale }) => {
  // CHANGED: pointing to local asset
  const curtainImg = "/assets/curtains.png";

  return (
    <motion.div
      style={{ 
        x, 
        scaleY: scale || 1, 
        [side === 'left' ? 'left' : 'right']: 0 
      }}
      className="absolute top-0 h-full w-1/2 z-20 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]"
    >
      <div 
        className="absolute inset-0 w-full h-full bg-red-950"
        style={{
          backgroundImage: `url(${curtainImg})`,
          backgroundSize: '100% 100%', 
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
        <div className={`absolute top-0 bottom-0 w-32 pointer-events-none ${
            side === 'left' 
              ? 'right-0 bg-gradient-to-l from-black/80 to-transparent' 
              : 'left-0 bg-gradient-to-r from-black/80 to-transparent'
          }`}
        />
      </div>
    </motion.div>
  );
};