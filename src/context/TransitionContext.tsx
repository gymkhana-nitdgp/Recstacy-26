// Change line 1 to:
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react'; // Add this separate line
// Defines the loader states
type LoaderType = 'none' | 'forward' | 'routing';

interface TransitionContextType {
  currentLoader: LoaderType;
  targetPath: string; 
  startTransition: (type: LoaderType, path?: string) => void;
  endTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLoader, setCurrentLoader] = useState<LoaderType>('none');
  const [targetPath, setTargetPath] = useState<string>('/');

  const startTransition = (type: LoaderType, path: string = '/') => {
    setTargetPath(path);
    setCurrentLoader(type);
  };

  const endTransition = () => {
    setCurrentLoader('none');
  };

  return (
    <TransitionContext.Provider value={{ currentLoader, targetPath, startTransition, endTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

// We renamed this hook to avoid conflicts with React
export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) throw new Error('usePageTransition must be used within a TransitionProvider');
  return context;
};