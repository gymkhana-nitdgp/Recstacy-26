import React, { useEffect } from 'react';
import { TheaterStage } from '../components/TheaterStage';

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // FIX: Removed 'pt-20'. 
    // 'h-screen' ensures it takes exactly 100% of the viewport height, no more, no less.
    <div className="bg-black min-h-screen overflow-hidden flex flex-col"> 
      <div className="flex-1 h-screen overflow-hidden">
        <TheaterStage forceClosed={true} />
      </div>
      
      {/* Developed by footer */}
      <div className="bg-black py-4 px-4 text-center border-t border-gray-800">
        <p className="text-gray-300 text-sm md:text-base">
          Developed by: <a href="https://www.instagram.com/snehaaaa_2208/" target="_blank" rel="noopener noreferrer" className="text-[#FFEBD0] font-semibold hover:opacity-80 transition-opacity">Sneha</a> and <a href="https://www.instagram.com/ritam_koley_10/" target="_blank" rel="noopener noreferrer" className="text-[#FFEBD0] font-semibold hover:opacity-80 transition-opacity">Ritam</a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;