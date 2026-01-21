import { useState, useEffect } from 'react';

// Tailwind default breakpoints
const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
};

export function useBreakpoints() {
  const [screens, setScreens] = useState({
    isSm: false,
    isMd: false,
    isLg: false,
  });

  useEffect(() => {
    // Create media query lists
    const smQuery = window.matchMedia(breakpoints.sm);
    const mdQuery = window.matchMedia(breakpoints.md);
    const lgQuery = window.matchMedia(breakpoints.lg);

    const updateScreens = () => {
      setScreens({
        isSm: smQuery.matches, // true if width >= 640px
        isMd: mdQuery.matches, // true if width >= 768px
        isLg: lgQuery.matches, // true if width >= 1024px
      });
    };

    // Initial check
    updateScreens();

    // Listen for changes
    smQuery.addEventListener('change', updateScreens);
    mdQuery.addEventListener('change', updateScreens);
    lgQuery.addEventListener('change', updateScreens);

    // Clean up
    return () => {
      smQuery.removeEventListener('change', updateScreens);
      mdQuery.removeEventListener('change', updateScreens);
      lgQuery.removeEventListener('change', updateScreens);
    };
  }, []);

  return screens;
}