import React, { useEffect } from 'react';
import { TheaterStage2 } from '../components/TheaterStage2';

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // FIX: Removed 'pt-20'. 
    // 'h-screen' ensures it takes exactly 100% of the viewport height, no more, no less.
    <div className="bg-black min-h-screen overflow-hidden flex flex-col"> 
      <div className="flex-1 h-screen overflow-hidden">
        <TheaterStage2 forceClosed={true} />
      </div>
      
      {/* Developed by footer */}
      <div className="relative w-full z-50 bg-black/95 md:bg-black/80 md:backdrop-blur-md py-2 px-4 text-center border-t border-gray-800 mt-auto">
      <p className="text-gray-300 text-sm md:text-base">
        Developed by:{" "}
        
        <a
          href="https://www.instagram.com/snehaaaa_2208/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFEBD0] font-semibold hover:opacity-80 transition-opacity"
        >
          Sneha
        </a>{" "}
        ,{" "}
        <a
          href="https://www.instagram.com/nirvikjana/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFEBD0] font-semibold hover:opacity-80 transition-opacity"
        >
          Nirvik
        </a>{" "}
        and{" "}
        <a
          href="https://www.instagram.com/imchitta07/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFEBD0] font-semibold hover:opacity-80 transition-opacity"
        >
          Chitta
        </a>
      </p>
    </div>
    </div>
  );
};

export default ContactPage;