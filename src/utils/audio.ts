import { ASSETS } from '../constants'; // Adjust path if needed

// Create a single audio instance for the whole app
export const globalAudio = new Audio(ASSETS.BG_MUSIC);

// OPTIMIZATION 1: Configuration
globalAudio.loop = true;
globalAudio.volume = 0.5;
globalAudio.preload = 'none'; // <--- CRITICAL: Don't download audio until user clicks Play

// OPTIMIZATION 2: Battery Saver / CPU Saver
// Automatically pause music if user switches tabs or minimizes phone
if (typeof document !== 'undefined') {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !globalAudio.paused) {
      globalAudio.pause();
      // Tag it so we know to resume when they come back
      (globalAudio as any)._wasPlaying = true;
    } else if (!document.hidden && (globalAudio as any)._wasPlaying) {
      globalAudio.play().catch(() => {});
      (globalAudio as any)._wasPlaying = false;
    }
  });
}

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