const P1 = "/assets/people/person1.png";
const P2 = "/assets/people/person2.png";
const P3 = "/assets/people/person3.png";
const P4 = "/assets/people/person4.png";
const P5 = "/assets/people/person5.png";
const P6 = "/assets/people/person6.png";
const P7 = "/assets/people/person7.jpeg";
const P8 = "/assets/people/person8.png";

import type { Movie, Dev, CardInter } from './types';

export const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'The Last of Us',
    year: '2023',
    duration: '1 Season',
    rating: 8.8,
    genre: ['Drama', 'Action'],
    description: 'After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl.',
    imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Ted Lasso',
    year: '2020',
    duration: '3 Seasons',
    rating: 8.8,
    genre: ['Comedy', 'Sports'],
    description: 'American college football coach Ted Lasso heads to London to manage a struggling football team.',
    imageUrl: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Interstellar',
    year: '2014',
    duration: '2h 49m',
    rating: 8.7,
    genre: ['Sci-Fi', 'Drama'],
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Inception',
    year: '2010',
    duration: '2h 28m',
    rating: 8.8,
    genre: ['Action', 'Sci-Fi'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Dune: Part Two',
    year: '2024',
    duration: '2h 46m',
    rating: 8.6,
    genre: ['Action', 'Adventure'],
    description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge.',
    imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=2066&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Blade Runner 2049',
    year: '2017',
    duration: '2h 44m',
    rating: 8.0,
    genre: ['Sci-Fi', 'Thriller'],
    description: 'A young blade runner\'s discovery of a long-buried secret leads him to track down Deckard.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
  },
  {
    id: '7',
    title: 'Arrival',
    year: '2016',
    duration: '1h 56m',
    rating: 7.9,
    genre: ['Sci-Fi', 'Mystery'],
    description: 'A linguist works with the military to communicate with alien lifecrafts.',
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=2072&auto=format&fit=crop',
  },
  {
    id: '8',
    title: 'The Batman',
    year: '2022',
    duration: '2h 56m',
    rating: 7.8,
    genre: ['Action', 'Crime'],
    description: 'Batman ventures into Gotham City\'s underworld when a sadistic killer leaves a trail of cryptic clues.',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2037&auto=format&fit=crop',
  },
  {
    id: '9',
    title: 'Oppenheimer',
    year: '2023',
    duration: '3h',
    rating: 8.4,
    genre: ['Biography', 'Drama'],
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    imageUrl: 'https://images.unsplash.com/photo-1451187530230-b237ee60ef6e?q=80&w=2072&auto=format&fit=crop',
  },
  {
    id: '10',
    title: 'Succession',
    year: '2018-2023',
    duration: '4 Seasons',
    rating: 8.9,
    genre: ['Drama'],
    description: 'The Roy family is known for controlling the biggest media and entertainment company in the world.',
    imageUrl: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '11',
    title: 'The Mandalorian',
    year: '2019',
    duration: '3 Seasons',
    rating: 8.7,
    genre: ['Action', 'Sci-Fi'],
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2025&auto=format&fit=crop',
  },
  {
    id: '12',
    title: 'Stranger Things',
    year: '2016-2022',
    duration: '4 Seasons',
    rating: 8.7,
    genre: ['Horror', 'Sci-Fi'],
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '13',
    title: 'The Crown',
    year: '2016-2023',
    duration: '6 Seasons',
    rating: 8.6,
    genre: ['Drama', 'History'],
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign.',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0d38d6e9f0a?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: '14',
    title: 'The Matrix',
    year: '1999',
    duration: '2h 16m',
    rating: 8.7,
    genre: ['Action', 'Sci-Fi'],
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '15',
    title: 'Breaking Bad',
    year: '2008-2013',
    duration: '5 Seasons',
    rating: 9.5,
    genre: ['Crime', 'Drama'],
    description: 'A high school chemistry teacher turned methamphetamine manufacturer.',
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=2128&auto=format&fit=crop',
  }
];


export const DEVS: Array<Dev> = [
  {
    href: "ritam_koley_10",
    label: "Ritam" 
  },
  {
    href: "snehaaaa_2208" ,
    label: "Sneha" 
  },
  {
    href: "nirvikjana",
    label: "Nirvik" 
  },
  {
    href: "imchitta07",
    label: "Chitta" 
  },
];

export const TEAMMEMBERS: CardInter[] = [
  { id: 1, name: "Debangshu", role: "Event Head", instaId: "debangshu_here_", img: P1 },
  { id: 2, name: "Bikarna", role: "Chief Convener", instaId: "bikarna_21", img: P2 },
  { id: 3, name: "Shreyan", role: "CC Head", instaId: "shreyan_roy_", img: P3 },
  { id: 4, name: "Rishikesh", role: "Principal Coordinator", instaId: "", img: P4 },
  { id: 5, name: "Soham", role: "Executive Coordinator", instaId: "sohamchatrg", img: P5 },
  { id: 6, name: "Abhra", role: "SeniorMember", instaId: "abhra_00", img: P6 },
  { id: 7, name: "Ritam", role: "Developer", instaId: "ritam_koley_10", img: P7 },
  { id: 8, name: "Zafar", role: "Senior Member", instaId: "zaf_ar029", img: P8 },
];

export const ASSETS = {
  ASHURA_IMG: "/ashura.png",
  ROCKS_GROUP_IMG: "/rocks-group.png",
  FB_MOON_IMG: "/cres.png",
  INSTA_MOON_IMG: "/moon.png",
  HAMBURGER: "/hamburger.png",
  NEBULA_VIDEO: "/nebula.mp4",
  BACK_VIDEO: "/bg.mp4",
  BG_MUSIC: "/bgmusic.mp3",
  bgImage: "/black.png",
  LOAD_VIDEO_DESKTOP: "/assets/desktop_intro.mp4",
  LOAD_VIDEO_MOBILE: "/assets/reel_intro.mp4",
};