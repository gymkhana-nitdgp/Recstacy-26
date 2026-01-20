import { GoogleGenAI, Type } from "@google/genai";
import type { AIInsight, Movie } from '../types';

// 1. FIXED: Use import.meta.env for Vite
// 2. FIXED: Use the correct env variable name
const apiKey = import.meta.env.VITE_API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export async function getMovieInsight(movie: Movie): Promise<AIInsight> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Updated to a stable model (gemini-3 is not widely available yet)
      contents: `Provide a cinematic insight for the movie "${movie.title}" (${movie.year}). 
      Tell me why I should watch it, its general "vibe", and 3 similar movies.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reasonToWatch: { type: Type.STRING, description: "A compelling 1-sentence reason to watch." },
            vibe: { type: Type.STRING, description: "3 words that describe the atmosphere." },
            similarMovies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 similar movie titles."
            }
          },
          required: ["reasonToWatch", "vibe", "similarMovies"]
        }
      }
    });

    // Handle potential null/undefined response structure safely
const text = response.text || '{}';
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails or quota is exceeded
    return {
      reasonToWatch: "A masterpiece of modern cinema that you shouldn't miss.",
      vibe: "Intense, Emotional, Epic",
      similarMovies: ["The Dark Knight", "Blade Runner 2049", "Arrival"]
    };
  }
}