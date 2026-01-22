// import { useRef } from 'react';
// import Spline from '@splinetool/react-spline';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { useNavigate } from 'react-router-dom';
// import { usePageTransition } from '../context/TransitionContext';

// export default function RoutingLoader() {
//   const containerRef = useRef<HTMLDivElement>(null);
  
//   const { currentLoader, endTransition, targetPath } = usePageTransition();
//   const navigate = useNavigate();

//   const isActive = currentLoader === 'routing';

//   const FADE_DURATION = 0.5; 
//   const PAUSE_DURATION = 2.0; 

//   useGSAP(() => {
//     if (!isActive || !containerRef.current) return;

//     const tl = gsap.timeline({
//       onComplete: () => {
//         endTransition();
//         // We don't need to manually hide here anymore, 
//         // the React conditional style below handles it when isActive becomes false.
//       }
//     });

//     // 1. Reset Opacity (It's already visible via style prop)
//     gsap.set(containerRef.current, { opacity: 0 });

//     // 2. FADE IN
//     tl.to(containerRef.current, {
//         opacity: 1,
//         duration: FADE_DURATION,
//         ease: "power2.inOut"
//     })
    
//     // 3. PAUSE
//     .to({}, { duration: PAUSE_DURATION })

//     // 4. NAVIGATE
//     .add(() => {
//         navigate(targetPath);
//         window.scrollTo(0, 0);
//     })

//     // 5. FADE OUT
//     .to(containerRef.current, {
//         opacity: 0,
//         duration: FADE_DURATION,
//         ease: "power2.inOut"
//     });

//   }, [isActive, targetPath, endTransition, navigate]);

//   return (
//     <div 
//       ref={containerRef}
//       className="fixed inset-0 z-[99999] items-center justify-center bg-black"
//       // --- FIX: CONTROL DISPLAY WITH REACT, NOT GSAP ---
//       // This ensures it is present in the DOM the exact millisecond 'isActive' becomes true
//       style={{ 
//           display: isActive ? 'flex' : 'none', 
//           opacity: 0 // Start at 0, let GSAP fade it in
//       }}
//     >
//         {/* Background Image */}
//         <div className="absolute inset-0 bg-[url('/helix_mobile.png')] md:bg-[url('/helix_desktop.png')] bg-cover bg-center pointer-events-none" />
//         <div 
//             className="absolute inset-0 pointer-events-none"
//             style={{
//                 background: 'radial-gradient(circle at center, rgba(0,0,0, 0.80) 0%, rgba(0,0,0, 0.60) 45%, transparent 100%)'
//             }}
//         />

//         <div className="w-full h-full relative z-10 flex items-center justify-center">
//             {/* Spline Model */}
//             <div className="relative w-full h-full z-10">
//                 <Spline 
//                     scene="https://prod.spline.design/1P0VjjbJNGozWFSC/scene.splinecode"
//                 />
//             </div>
//         </div>
//     </div>
//   );
// }