export interface Movie {
  id: string | number;
  title: string;
  year: string | number;
  duration?: string;
  rating?: number;
  genre: string[];
  description: string;
  
  // REQUIRED: This is the source for your card front image
  imageUrl: string;      
  
  videoUrl?: string;     
  platformIcon?: string; 
  director?: string;     
  seasons?: string;
}

export interface AIInsight {
  reasonToWatch: string;
  vibe: string;
  similarMovies: string[];
}

export interface MediaControlProps {
  onPrev?: () => void;
  onNext?: () => void;
  onTogglePlay?: () => void;
  isPlaying?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  bodyClassName?: string;
}

export interface Dev {
  href: string;
  label: string;
}