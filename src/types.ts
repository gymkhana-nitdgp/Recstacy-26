export interface Poster {
  id: string | number;
  title: string;
  venue: string;
  date: Date;
  endDate?: Date; 
  description: string;
  imageUrl: string;      
  registerLink?: string;
}

/**

id: '1',
    title: 'Prom Night',
    venue: 'Lords Arena',
    date: '29-01-2026',
    time: "",
    description: "There’s a special kind of magic in nights like these, where getting dressed up feels like stepping into a Disney story. A story where ordinary moments start to feel like memories in the making.\nAnd somewhere in that quiet, you hear the rhythm of heels against the floor and see a boy waiting with hands tucked in his pockets, hoping she’s walking toward him.\nHosted by The Literary Circle and Students Gymkhana, the night promises warmth, tenderness, and a spark meant to be remembered. Come as your brightest self, bring your dearest, and let the night turn into a memory.",
    imageUrl: promNight,
    registerLink: "https://forms.gle/BziJarmZLDjYvHYn7"

 */

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

export interface CardInter {
  id?: number;
  name: string;
  role: string;
  img: string;
  instaId: string;
}