// import React, { useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { usePageTransition } from '../context/TransitionContext';
// import { CurtainSide } from './CurtainSide'; // Reuse your existing component

// export default function CurtainLoader() {
//   const { currentLoader, endTransition, targetPath } = usePageTransition();
//   const navigate = useNavigate();
  
//   // Animation controls for left and right curtains
//   const leftControls = useAnimation();
//   const rightControls = useAnimation();

//   // Configuration
//   const isActive = currentLoader === 'curtain';
//   const TRANSITION_DURATION = 0.8; // Seconds to close/open

//   useEffect(() => {
//     const sequence = async () => {
//       if (isActive) {
//         // 1. START: Ensure curtains are off-screen (Open)
//         leftControls.set({ x: '-100%' });
//         rightControls.set({ x: '100%' });

//         // 2. CLOSE CURTAINS (Cover screen)
//         await Promise.all([
//           leftControls.start({ x: '0%', transition: { duration: TRANSITION_DURATION, ease: 'easeInOut' } }),
//           rightControls.start({ x: '0%', transition: { duration: TRANSITION_DURATION, ease: 'easeInOut' } })
//         ]);

//         // 3. NAVIGATE (Behind the curtains)
//         navigate(targetPath);
//         window.scrollTo(0, 0);
        
//         // Small pause to let the DOM update and stabilize
//         await new Promise(resolve => setTimeout(resolve, 300));

//         // 4. OPEN CURTAINS (Reveal new page)
//         await Promise.all([
//           leftControls.start({ x: '-100%', transition: { duration: TRANSITION_DURATION, ease: 'easeInOut' } }),
//           rightControls.start({ x: '100%', transition: { duration: TRANSITION_DURATION, ease: 'easeInOut' } })
//         ]);

//         // 5. CLEANUP
//         endTransition();
//       }
//     };

//     sequence();
//   }, [isActive, targetPath, navigate, endTransition, leftControls, rightControls]);

//   // Don't render if not active to save performance
//   // We keep it rendered but hidden if you want persistent assets, but null is better for z-index safety
//   if (!isActive) return null;

//   return (
//     <div className="fixed inset-0 z-[99999] pointer-events-none flex">
//       {/* Left Curtain Container */}
//       <div className="relative w-1/2 h-full overflow-hidden">
//         {/* We pass the MotionValue/Controls directly to x */}
//         {/* @ts-ignore - Frame motion controls compatible with string x prop */}
//         <CurtainSide side="left" x={leftControls} />
//       </div>

//       {/* Right Curtain Container */}
//       <div className="relative w-1/2 h-full overflow-hidden">
//         {/* @ts-ignore */}
//         <CurtainSide side="right" x={rightControls} />
//       </div>
//     </div>
//   );
// }