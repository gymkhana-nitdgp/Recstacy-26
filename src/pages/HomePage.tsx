import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../sections/Hero';
import InitialLoader from '../components/InitialLoader';
import { usePageTransition } from '../context/TransitionContext'; 
import { TheaterStage } from '../components/TheaterStage';

gsap.registerPlugin(ScrollTrigger);

const AboutUsSection: React.FC = () => {
  return (
    // ADDED MORE PADDING AND MARGIN: py-24 and mb-20
    <section className="w-full bg-zinc-900 flex flex-col items-center justify-center relative z-20 border-t border-white/10 py-24 mb-20">
      <div className="max-w-4xl text-center px-6">
        <h2 className="text-4xl md:text-6xl font-black text-[#FFEBD0] mb-6 tracking-wide uppercase">
          About Us
        </h2>
        <p className="text-white/60 text-lg md:text-xl leading-relaxed">
          Recstacy is the annual cultural fest of NIT Durgapur.
        </p>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  const { currentLoader } = usePageTransition();
  const isTransitioning = currentLoader !== 'none';

  const [showInitialLoader, setShowInitialLoader] = useState(() => {
      if (typeof window !== 'undefined') {
          const hasSeen = sessionStorage.getItem('hasSeenIntro');
          return !hasSeen; 
      }
      return false; 
  });

  const [animationsStarted, setAnimationsStarted] = useState(!showInitialLoader);

  useEffect(() => {
    if (!isTransitioning && !showInitialLoader) {
        setAnimationsStarted(true);
        setTimeout(() => ScrollTrigger.refresh(), 500);
    }
  }, [isTransitioning, showInitialLoader]);

  const handleInitialComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowInitialLoader(false);
    setAnimationsStarted(true);
    setTimeout(() => ScrollTrigger.refresh(), 500);
  };

  return (
    <>
      {!isTransitioning && showInitialLoader && (
        <InitialLoader onComplete={handleInitialComplete} />
      )}

      <main className="bg-black min-h-screen">
        <Hero startAnimation={animationsStarted} />
        
        {/* About Us Section with extra spacing now */}
        <AboutUsSection />
        
        {/* Contact Us (TheaterStage) */}
        <TheaterStage forceClosed={false} />
      </main>
    </>
  );
};

export default HomePage;