import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../sections/Hero';
import Sponsors from '../sections/Sponsors';
import InitialLoader from '../components/InitialLoader';
import { useTransition } from '../context/TransitionContext';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const { isTransitioning } = useTransition();
  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

  // Logic to control loader type
  const [loaderType, setLoaderType] = useState<'initial' | 'none'>(
     hasSeenIntro ? 'none' : 'initial'
  );

  const [animationsStarted, setAnimationsStarted] = useState(false);

  // Simple check: When transition ends, start animations
  useEffect(() => {
    if (!isTransitioning) {
        setAnimationsStarted(true);
        // Small refresh to ensure ScrollTrigger catches up after loader vanishes
        setTimeout(() => ScrollTrigger.refresh(), 100);
    } else {
        setAnimationsStarted(false);
    }
  }, [isTransitioning]);

  const handleInitialComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setLoaderType('none');
    setAnimationsStarted(true);
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  return (
    <>
      {/* Initial Video Loader (First Visit Only) */}
      {!isTransitioning && loaderType === 'initial' && (
        <InitialLoader onComplete={handleInitialComplete} />
      )}

      {/* Main Content */}
      <main className="bg-black">
        {/* Pass props to start animation only when safe */}
        <Hero startAnimation={animationsStarted && !isTransitioning} />
        <Sponsors />
      </main>

      {/* Footer Spacer */}
      <div className="w-full h-screen bg-black relative z-30" />
    </>
  );
};

export default HomePage;