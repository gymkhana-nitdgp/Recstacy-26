import React from 'react';
import { TheaterStage } from '../components/TheaterStage';

const ContactPage: React.FC = () => {
  return (
    // FIX: Removed 'pt-20'. 
    // 'h-screen' ensures it takes exactly 100% of the viewport height, no more, no less.
    <div className="bg-black h-screen overflow-hidden"> 
      <TheaterStage forceClosed={true} />
    </div>
  );
};

export default ContactPage;