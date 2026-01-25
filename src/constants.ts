const P1 = "/assets/people/person1.png";
const P2 = "/assets/people/person2.png";
const P3 = "/assets/people/person3.png";
const P4 = "/assets/people/person4.png";
const P5 = "/assets/people/person5.png";
const P6 = "/assets/people/person6.png";
const P7 = "/assets/people/person7.jpeg";
const P8 = "/assets/people/person8.png";

const promNight = "/posters/LC_Prom.png";
const darpan = "/posters/GoonjPoster.png";
const kalakriti = "/posters/kalakriti.jpg";
const stellar = "/posters/Stellar.png";
const interCollege = "/posters/INTER_COLLEGE.png";
const lastLap = "/posters/LASTLAP.png";
const valo = "/posters/valorant.jpeg";
const goneViral = "/posters/Gone_Viral_Quiz.jpg";
const facePainting = "/posters/FACE_PAINTING_poster.png";


import type { Poster, Dev, CardInter } from './types';

export const POSTERS: Poster[] = [
  {
    id: '1',
    title: 'Prom Night',
    venue: 'Lords Arena',
    date: new Date(2026, 0, 29, 0, 0, 0, 0),
    description: "There’s a special kind of magic in nights like these, where getting dressed up feels like stepping into a Disney story. A story where ordinary moments start to feel like memories in the making.\nAnd somewhere in that quiet, you hear the rhythm of heels against the floor and see a boy waiting with hands tucked in his pockets, hoping she’s walking toward him.\nHosted by The Literary Circle and Students Gymkhana, the night promises warmth, tenderness, and a spark meant to be remembered. Come as your brightest self, bring your dearest, and let the night turn into a memory.",
    imageUrl: promNight,
    registerLink: "https://forms.gle/BziJarmZLDjYvHYn7"
  },
  {
    id: '2',
    title: 'गूँज',
    venue: 'नए ऑडिटोरियम',
    date: new Date(2026, 0, 31, 15, 0, 0, 0),
    description: "ख़ामोशी की तह से जब अल्फ़ाज़ निकलते हैं,\nटूटे दिल भी मुकम्मल से लगते हैं,\nये गुमनाम लफ़्ज़ों की गूँज भी अजीब है जहाँ,\nसोए हुए शब्द भी मुस्कुराए से लगते हैं।\n\nगूँज सिर्फ़ एक कार्यक्रम नहीं, बल्कि शब्दों, भावनाओं और संवेदनाओं की गूँज है। इस मंच पर आमंत्रित किए जाते हैं ऐसे विशिष्ट कलाकार, जो अपनी रचनाओं, कविताओं और अभिव्यक्तियों से पूरे माहौल को जीवंत कर देते हैं। उनकी हर पंक्ति दिल को छूती है, हर विचार मन को आंदोलित करता है और हर प्रस्तुति श्रोताओं को आनंद और प्रेरणा से भर देती है।\nगूँज में शब्द बोलते हैं, भावनाएँ बहती हैं और कला अपने शिखर पर पहुँचती है।\nआइए, इस अनोखे अनुभव का हिस्सा बनें और महसूस करें उन आवाज़ों की गूँज, जो देर तक आपके दिल में बनी रहेगी।",
    imageUrl: darpan,
  },
  {
    id: '3',
    title: 'Kalakriti',
    venue: 'Ovals Ground',
    date: new Date(2026, 0, 30, 0, 0, 0, 0),
    endDate: new Date(2026, 1, 1, 0, 0, 0, 0),
    description: "The Official Art and Photography exhibition of NIT DURGAPUR \"We don’t just capture faces, We capture the energy, the chaos, and the soul. Let the lights fade, but let the memories glow.\" RECSTACY is back, and the vibe is unmatched! Team Strokes invites you to freeze time at our exclusive Photobooth. Whether you're here for the music, the art, or the memories, make sure you step into the frame and take a piece of the fest home with you.\n\n Gather your squad, pick a prop, and let us immortalize your RECstacy moments.",
    imageUrl: kalakriti,
  },
  {
    id: '4',
    title: 'Stellar Scavenger',
    venue: 'Ovals Ground',
    date: new Date(2026, 0, 30, 0, 0, 0, 0),
    description: "Step into a universe where every clue is a prophecy and every checkpoint is a new realm. Inspired by cosmic odysseys, space epics, and survival games, Stellar Scavengers is a high-speed campus-wide treasure hunt where wit, teamwork, and instinct decide your fate.\n\n Decode riddles. Navigate hidden stations. Beat the clock. Race through 9 celestial checkpoints to reach the final trial of 12 intense task zones.\n\nOnly the fastest minds survive the cosmos.\n\nSuit up scavengers. The galaxy is yours.",
    imageUrl: stellar,
  },
  {
    id: '5',
    title: 'Face Painting',
    venue: 'Ovals Ground',
    date: new Date(2026, 0, 30, 0, 0, 0, 0),
    endDate: new Date(2026, 1, 1, 0, 0, 0, 0),
    description: "Step into a universe where every clue is a prophecy and every checkpoint is a new realm. Inspired by cosmic odysseys, space epics, and survival games, Stellar Scavengers is a high-speed campus-wide treasure hunt where wit, teamwork, and instinct decide your fate.\n\n Decode riddles. Navigate hidden stations. Beat the clock. Race through 9 celestial checkpoints to reach the final trial of 12 intense task zones.\n\nOnly the fastest minds survive the cosmos.\n\nSuit up scavengers. The galaxy is yours.",
    imageUrl: facePainting,
  },
  {
    id: '6',
    title: 'Inter - College Mela Quiz',
    venue: 'SAC Auditorium',
    date: new Date(2026, 1, 1, 10, 0, 0, 0),
    description: "Do you find yourself dissecting the hidden metaphors in a classic novel or identifying a film director by a single camera angle? If the intersection of creative genius and cultural history is where you thrive, your moment has arrived.\n\nThe Students’ Gymkhana, NIT Durgapur, in collaboration with QuizInc, the official knowledge club of NIT Durgapur, proudly presents the INTER - COLLEGE MELA QUIZ at Recstacy 2026. This isn't just a competition; it’s a high-octane celebration of media, entertainment, literature, and arts. Whether you are a cinephile, a bookworm, or a pop-culture enthusiast, the stage is set for you to battle it out the ultimate glory for your college.\n\nBring your team, navigate the twists of our \"Infinite Pounce,\" and claim your crown in this ultimate inter-college cultural showdown at Recstacy 2026.",
    imageUrl: interCollege,
  },
  {
    id: '7',
    title: 'The Last Lap',
    venue: 'NAB 303',
    date: new Date(2026, 0, 30, 14, 0, 0, 0),
    description: "From stardust to scoreboards, the journey from possibility to peak performance comes alive through sport.\n\nPresented by Students' Gymkhana, in collaboration with QuizInc, the World-Cup Quiz dives into the global tournaments of 2026, where nations collide and legends emerge—echoing Messi at the Maracanã, Kohli under lights at Eden Gardens, and Serena on centre court.\n\nAcross pitches, tracks, and courts, questions unfold through iconic stages—Azteca’s World Cup aura, Wankhede Stadium’s cricketing frenzy, and the Wagener Stadium’s hockey intensity—where rivalries peak and glory is decided.\n\nStep into a universe where world cups are the ultimate test. Feel the build-up, chase the moments, and see if your knowledge can rise when champions are made.",
    imageUrl: lastLap,
    registerLink: "https://forms.gle/5h6b5p1i2pr8wP7Z7"
  },
  {
    id: '8',
    title: 'Gone Viral Quiz',
    venue: 'NAB 303',
    date: new Date(2026, 0, 31, 14, 0, 0, 0),
    description: "Think you’re the ultimate trendsetter? Can you quote every viral reel and identify a meme from a single pixel?\n\nStudents' Gymkhana in collaboration with QuizInc is bringing the chaos of the internet to the stage. Presenting the Gone Viral Quiz at Recstacy!\n\nFrom legendary vines to record-breaking trends, we are testing your \"Internet IQ.\" Whether you are a pop-culture stan or a meme connoisseur, this is your moment to shine amidst the Recstacy hype.\n\nDon’t just scroll through the feed, own it.",
    imageUrl: goneViral,
    registerLink: "https://forms.gle/hKzrtkhaxywqh9tp7"
  },
  {
    id: '9',
    title: 'Valorant Campus Cup',
    venue: 'NIT Durgapur',
    date: new Date(2026, 0, 30, 10, 0, 0, 0),
    endDate: new Date(2026, 0, 31, 0, 0, 0, 0),
    description: "Jio Games × NIT Durgapur × Recstacy '26 Gear up for high-octane competition as Recstacy 2026 brings you the Valorant Campus Cup, in collaboration with JioGames, where precision, strategy, and teamwork collide in an arena built for champions. Watch elite squads battle through intense match-ups, electrifying clutches, and tactical masterclasses in one of the most anticipated esports spectacles of the fest.",
    imageUrl: valo,
    registerLink: "https://drive.google.com/file/d/14O-leKq4EMGMi8DDiMhikl4qkGpmbNz1/view?usp=drivesdk"
  },
  
];


export const DEVS: Dev[] = [
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
  { id: 6, name: "Abhra", role: "Senior Member", instaId: "abhra_00", img: P6 },
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