import React from 'react';
import BackToHome from '../components/BackToHome'; // Import it

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl mb-10">About Us</h1>
      
      <p className="mb-10 max-w-md text-center text-white/70">
        This is the about page. Click below to see the loader animation again.
      </p>

      
      <BackToHome />
      
    </div>
  );
};

export default AboutPage;