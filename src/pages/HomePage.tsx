import React, { useState, useEffect, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../sections/Hero";
import InitialLoader from "../components/InitialLoader";
import { usePageTransition } from "../context/TransitionContext";
import { playGlobalAudio } from "../utils/audio";

const AboutPage = React.lazy(() => import("./AboutPage"));
const TheaterStage = React.lazy(() =>
  import("../components/contact/TheaterStage").then((module) => ({ default: module.TheaterStage })),
);

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const { currentLoader, endTransition } = usePageTransition();
  const isTransitioning = currentLoader !== "none";

  const [showInitialLoader, setShowInitialLoader] = useState(() => {
    if (typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("hasSeenIntro");
      return !hasSeen;
    }
    return false;
  });

  const [animationsStarted, setAnimationsStarted] = useState(!showInitialLoader);
  const [shouldRenderHeavyContent, setShouldRenderHeavyContent] = useState(!showInitialLoader);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentLoader === "forward" && !isTransitioning) {
      // Using 'forward' for SplineGateway
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, 0);
        endTransition();
      }, 100);
    }
  }, [currentLoader, isTransitioning, endTransition]);

  useEffect(() => {
    if (!isTransitioning && !showInitialLoader) {
      const timer = setTimeout(() => {
        setAnimationsStarted(true);
        setShouldRenderHeavyContent(true);
        ScrollTrigger.refresh();
        playGlobalAudio();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, showInitialLoader]);

  const handleInitialComplete = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    setShowInitialLoader(false);
    setAnimationsStarted(true);
    setShouldRenderHeavyContent(true);
    setTimeout(() => ScrollTrigger.refresh(), 500);
  };

  return (
    <>
      {!isTransitioning && showInitialLoader && (
        <InitialLoader onComplete={handleInitialComplete} />
      )}

      {/* Using ForwardLoader (SplineGateway) */}
      {/* <SplineGateway /> */}

      <main className="bg-black min-h-screen flex flex-col gap-0 relative">
        <Hero startAnimation={animationsStarted} />

        {shouldRenderHeavyContent && (
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <AboutPage />

            {/* FIX: Removed mt-[8px] to reduce gap */}
            <div className="w-full">
              <TheaterStage forceClosed={false} />
            </div>
          </Suspense>
        )}
      </main>
    </>
  );
};

export default HomePage;
