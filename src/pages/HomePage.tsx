import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../sections/Hero';
import InitialLoader from '../components/InitialLoader';
import { usePageTransition } from '../context/TransitionContext'; 
import { TheaterStage } from '../components/TheaterStage';
// 1. IMPORT THE AUDIO UTILITY
import { playGlobalAudio } from '../utils/audio'; 
import AboutPage from './AboutPage';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const { currentLoader, endTransition } = usePageTransition();
  const isTransitioning = currentLoader !== 'none';

  const [showInitialLoader, setShowInitialLoader] = useState(() => {
      if (typeof window !== 'undefined') {
          const hasSeen = sessionStorage.getItem('hasSeenIntro');
          return !hasSeen; 
      }
      return false; 
  });

  const [animationsStarted, setAnimationsStarted] = useState(!showInitialLoader);

  // Scroll to top when component mounts or when coming from routing
  useEffect(() => {
    window.scrollTo(0, 0);
    // Also try with a small delay to ensure it happens
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  // Scroll to top and end transition when leaving transition state
  useEffect(() => {
    if (currentLoader === 'routing' && !isTransitioning) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, 0);
        endTransition();
      }, 100);
    }
  }, [currentLoader, isTransitioning, endTransition]);

  useEffect(() => {
    if (!isTransitioning && !showInitialLoader) {
        setAnimationsStarted(true);
        setTimeout(() => ScrollTrigger.refresh(), 500);
        
        // 2. ATTEMPT TO RESUME AUDIO
        // Since we skipped the loader (where the play button was), 
        // we try to start the audio manually here.
        playGlobalAudio(); 
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
        
        {/* Replaced local AboutUsSection with the imported AboutPage */}
        <AboutPage />
        
        <TheaterStage forceClosed={false} />

        {/* Developed by footer */}
        <div className="bg-black py-4 px-4 text-center border-t border-gray-800">
          <p className="text-gray-300 text-sm md:text-base">
            Developed by: <a href="https://www.instagram.com/snehaaaa_2208/" target="_blank" rel="noopener noreferrer" className="text-[#FFEBD0] font-semibold hover:opacity-80 transition-opacity">Sneha</a> and <a href="https://www.instagram.com/ritam_koley_10/" target="_blank" rel="noopener noreferrer" className="text-[#FFEBD0] font-semibold hover:opacity-80 transition-opacity">Ritam</a>
          </p>
        </div>
      </main>
    </>
  );
};

export default HomePage;