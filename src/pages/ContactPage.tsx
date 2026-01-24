import React, { useEffect } from "react"; 
import { TheaterStage } from "../components/contact/TheaterStage";

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
    </div>
  );
};

export default ContactPage;
