const Footer = () => {
  return (
    // OPTIMIZATION:
    // 1. Removed 'backdrop-blur-md' for mobile (added 'md:' prefix).
    // 2. Increased opacity of background 'bg-black/95' on mobile so it's still readable without blur.
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
  );
};

export default Footer;