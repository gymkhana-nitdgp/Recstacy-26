import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';

// OPTIMIZATION: Simplified to just 'curtain'
type LoaderType = 'none' | 'curtain'; 

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

  const startTransition = useMemo(() => (type: LoaderType, path: string = '/') => {
    setTargetPath(path);
    setCurrentLoader(type);
  }, []);

  const endTransition = useMemo(() => () => {
    setCurrentLoader('none');
  }, []);

  const value = useMemo(() => ({
    currentLoader,
    targetPath,
    startTransition,
    endTransition
  }), [currentLoader, targetPath, startTransition, endTransition]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
};

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) throw new Error('usePageTransition must be used within a TransitionProvider');
  return context;
};