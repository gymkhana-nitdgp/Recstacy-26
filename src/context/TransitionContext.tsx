import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface TransitionContextType {
  triggerTransition: (path: string) => void;
  isTransitioning: boolean;
  setIsTransitioning: (v: boolean) => void;
  targetPath: React.MutableRefObject<string>;
}

// Default values to prevent crashing if provider is missing
const TransitionContext = createContext<TransitionContextType>({
  triggerTransition: () => {},
  isTransitioning: false,
  setIsTransitioning: () => {},
  targetPath: { current: '/' } as any,
});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const targetPath = useRef('/');

  const triggerTransition = (path: string) => {
    targetPath.current = path; 
    setIsTransitioning(true); 
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition, isTransitioning, setIsTransitioning, targetPath }}>
      {children}
    </TransitionContext.Provider>
  );
};