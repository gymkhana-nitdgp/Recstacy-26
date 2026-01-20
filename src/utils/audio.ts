import { ASSETS } from '../../public/assets/constants'; // Adjust path if needed

// Create a single audio instance for the whole app
export const globalAudio = new Audio(ASSETS.BG_MUSIC);
globalAudio.loop = true;
globalAudio.volume = 0.5;

// Helper to safely play audio
export const playGlobalAudio = async () => {
  try {
    if (globalAudio.paused) {
      await globalAudio.play();
    }
  } catch (err) {
    console.warn("Audio play failed (likely browser blocked):", err);
  }
};

// Helper to toggle
export const toggleGlobalAudio = () => {
  if (globalAudio.paused) {
    playGlobalAudio();
    return true; // isPlaying
  } else {
    globalAudio.pause();
    return false; // isPaused
  }
};