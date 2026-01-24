import { useState, useEffect } from 'react';
import { globalAudio, toggleGlobalAudio } from '../utils/audio';


const AudioControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(!globalAudio.paused);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    globalAudio.addEventListener('play', handlePlay);
    globalAudio.addEventListener('pause', handlePause);

    return () => {
      globalAudio.removeEventListener('play', handlePlay);
      globalAudio.removeEventListener('pause', handlePause);
    };
  }, []);

  const handleToggle = () => {
    const playing = toggleGlobalAudio();
    setIsPlaying(playing);
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-6 right-6 z-[80] pointer-events-auto group"
      aria-label="Toggle Music"
    >
      {/* OPTIMIZED LINE BELOW: 
          1. Removed `backdrop-blur-md` for mobile (added `md:` prefix).
          2. Replaced `drop-shadow` with `shadow-lg` (cheaper).
          3. Added `bg-black/50` for mobile readability since blur is gone. 
      */}
      <div className="relative w-12 h-12 flex items-center justify-center 
                      bg-gray-900/80 md:bg-white/10 
                      md:backdrop-blur-md 
                      rounded-full border border-white/20 
                      hover:bg-white/20 transition-all duration-300 
                      shadow-lg md:drop-shadow-[0_0_10px_rgba(255,100,0,0.5)]">
        {isPlaying ? (
          <svg className="w-6 h-6 text-[#FFEBD0] drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default AudioControl;