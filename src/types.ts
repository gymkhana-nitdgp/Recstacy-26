
export interface Movie {
  id: string;
  title: string;
  year: string;
  duration: string;
  rating: number;
  genre: string[];
  description: string;
  imageUrl: string;
  platformIcon?: string;
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
