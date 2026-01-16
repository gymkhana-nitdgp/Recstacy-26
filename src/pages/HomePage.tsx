import React from 'react';
import Hero from '../sections/Hero';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <div className="h-screen w-full bg-black flex items-center justify-center relative z-40">
        <h2 className="text-white font-bold text-2xl">Content Below Fold</h2>
      </div>
    </>
  );
};

export default HomePage;