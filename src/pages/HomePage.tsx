import React, { useState, useEffect } from 'react';
import Hero from '../sections/Hero';
import InitialLoader from '../components/InitialLoader';
import { useTransition } from '../context/TransitionContext';

const HomePage: React.FC = () => {
  const { isTransitioning } = useTransition();
  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

  const [loaderType, setLoaderType] = useState<'initial' | 'none'>(
     hasSeenIntro ? 'none' : 'initial'
  );

  // This state now ONLY controls when the Hero animations (rocks/lanyards) start.
  // It does NOT hide the page anymore.
  const [animationsStarted, setAnimationsStarted] = useState(!isTransitioning);

  useEffect(() => {
    if (isTransitioning) {
        setAnimationsStarted(false);
    } else {
        const t = setTimeout(() => setAnimationsStarted(true), 200);
        return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  const handleInitialComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setLoaderType('none');
    setAnimationsStarted(true);
  };

  return (
    <>
      {/* Initial Video Loader */}
      {!isTransitioning && loaderType === 'initial' && (
        <InitialLoader onComplete={handleInitialComplete} />
      )}

      {/* --- FIX: Removed 'opacity-0' logic based on transition ---
         The main content is now always visible (opacity-100) behind the loader.
         This prevents the black screen flash when the loader fades out.
      */}
      <main className="transition-opacity duration-1000 opacity-100">
        
        {/* We still pass the trigger so animations don't start early */}
        <Hero startAnimation={animationsStarted && loaderType === 'none'} />
        
        <div className="h-screen w-full bg-black flex items-center justify-center relative z-40">
          <h2 className="text-white font-bold text-2xl">Content Below Fold</h2>
        </div>
      </main>
    </>
  );
};

export default HomePage;