import React, { useRef, useMemo, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. SPONSOR DATA ---
const MOBILE_ORDER = [
  // Row 1 (4 items)
  { name: "Microsoft", src: "/sponsors/microsoft.png" },
  { name: "IBM", src: "/sponsors/ibm.png" },
  { name: "Adobe", src: "/sponsors/adobe.png" },
  { name: "Nvidia", src: "/sponsors/nvidia.png" },
  // Row 2 (5 items)
  { name: "HP", src: "/sponsors/hp.png" },
  { name: "Flipkart", src: "/sponsors/flipkart.png" },
  { name: "SBI", src: "/sponsors/sbi.png" },
  { name: "Airtel", src: "/sponsors/airtel.png" },
  { name: "OLA", src: "/sponsors/ola.png" },
  // Row 3 (5 items)
  { name: "Indian Oil", src: "/sponsors/indianoil.png" },
  { name: "Nestle", src: "/sponsors/nestle.png" },
  { name: "Aircel", src: "/sponsors/aircel.png" },
  { name: "HP Petrol", src: "/sponsors/hp_petrol.png" },
  { name: "Dominos", src: "/sponsors/dominos.png" },
  // Row 4 (3 items)
  { name: "Red FM", src: "/sponsors/redfm.png" },
  { name: "Youth Express", src: "/sponsors/youthexpress.png" },
  { name: "EY", src: "/sponsors/ey.png" },
  // Row 5 (3 items)
  { name: "Manaksia", src: "/sponsors/manaksia.png" },
  { name: "Godrej", src: "/sponsors/godrej.png" },
  { name: "Coca Cola", src: "/sponsors/cocacola.png" },
  // Row 6 (3 items)
  { name: "ICICI", src: "/sponsors/icici.png" },
  { name: "Ingram", src: "/sponsors/ingram.png" },
  { name: "Indigo", src: "/sponsors/indigo.png" },
  // Row 7 (3 items)
  { name: "Red Bull", src: "/sponsors/redbull.png" },
  { name: "Avaya", src: "/sponsors/avaya.png" },
  { name: "Erudite", src: "/sponsors/erudite.png" },
];

// --- 2. DESKTOP LOGIC ---
const LAST_ON_DESKTOP = ["Manaksia", "EY", "ICICI", "Avaya", "Aircel"];

const SponsorsPage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // OPTIMIZATION 1: Mobile Detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const desktopSponsors = useMemo(() => {
    const normal = MOBILE_ORDER.filter(s => !LAST_ON_DESKTOP.includes(s.name));
    const last = MOBILE_ORDER.filter(s => LAST_ON_DESKTOP.includes(s.name));
    return [...normal, ...last];
  }, []);

  useGSAP(() => {
    // 1. BACKGROUND FADE IN
    gsap.fromTo(bgRef.current, 
      { opacity: 0 }, 
      {
        opacity: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: 1,
        }
      }
    );

    // 2. CONTENT ENTRANCE & EXIT
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", 
        end: "bottom 15%",
        toggleActions: "play reverse play reverse", 
      }
    });

    tl.fromTo([titleRef.current, ".sponsor-img"], 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.01, ease: "power2.out" }
    );

    // 3. EXIT FADE OUT
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -50,
      ease: "power1.in",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: 1,
      }
    });

  }, { scope: sectionRef });

  return (
    <>
      <section 
        ref={sectionRef} 
        className="relative w-full min-h-screen flex flex-col items-center overflow-hidden bg-black z-40 pt-[2vh]"
      >
        {/* BACKGROUND */}
        <div 
          ref={bgRef}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          // OPTIMIZATION 2: Simplified Mask for Mobile (optional, but good practice)
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          {/* OPTIMIZATION 3: Conditional Rendering for Background Image */}
          <div className={`absolute inset-0 bg-cover bg-center bg-fixed ${isMobile ? "bg-[url('/sponsor_phone.png')]" : "bg-[url('/sponsor_desktop.png')]"}`} />
          <div className="absolute inset-0 bg-black/20" /> 
        </div>

        {/* CONTENT WRAPPER */}
        <div ref={containerRef} className="relative z-10 w-full max-w-[95rem] px-2 pt-48 pb-10 flex flex-col items-center">
          
          {/* OPTIMIZATION 4: Cheaper Text Shadow on Mobile */}
          <h2 
            ref={titleRef}
            className="font-black text-[#FFEBD0] text-5xl md:text-7xl mb-8 tracking-widest uppercase select-none text-center"
            style={{ 
              fontFamily: "'Mosca Laroke', sans-serif",
              textShadow: isMobile ? "0 0 10px rgba(255, 165, 0, 0.4)" : "0 0 30px rgba(255, 165, 0, 0.4)" 
            }}
          >
            Past Sponsors
          </h2>

          {/* MOBILE LAYOUT */}
          <div className="flex flex-col gap-1 w-full md:hidden px-2">
              <div className="grid grid-cols-4 gap-1">
                  {MOBILE_ORDER.slice(0, 4).map((s, i) => <MobileLogo key={i} src={s.src} />)}
              </div>
              <div className="grid grid-cols-5 gap-1">
                  {MOBILE_ORDER.slice(4, 9).map((s, i) => <MobileLogo key={i} src={s.src} />)}
              </div>
              <div className="grid grid-cols-5 gap-1">
                  {MOBILE_ORDER.slice(9, 14).map((s, i) => <MobileLogo key={i} src={s.src} />)}
              </div>
              <div className="grid grid-cols-3 gap-1 px-8">
                  {MOBILE_ORDER.slice(14, 17).map((s, i) => <MobileLogo key={i} src={s.src} />)}
              </div>
               <div className="grid grid-cols-3 gap-1 px-8">
                  {MOBILE_ORDER.slice(17, 20).map((s, i) => <MobileLogo key={i} src={s.src} />)}
              </div>
               <div className="grid grid-cols-3 gap-1 px-8">
                  {MOBILE_ORDER.slice(20, 23).map((s, i) => <MobileLogo key={i} src={s.src} />)}
              </div>
               <div className="grid grid-cols-3 gap-1 px-8">
                  {MOBILE_ORDER.slice(23, 26).map((s, i) => <MobileLogo key={i} src={s.src} />)}
              </div>
          </div>

          {/* DESKTOP LAYOUT */}
          <div className="hidden md:flex flex-wrap justify-center gap-x-6 gap-y-6 w-full px-10">
              {desktopSponsors.map((sponsor, index) => (
                  <div key={index} className="w-32 lg:w-40 h-24 flex items-center justify-center">
                      <img 
                          src={sponsor.src} 
                          alt={sponsor.name}
                          loading="lazy" // OPTIMIZATION 5: Lazy Load Desktop Images
                          className="sponsor-img w-auto h-full max-h-full max-w-full object-contain filter drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform duration-300"
                      />
                  </div>
              ))}
          </div>

        </div>
      </section>

      {/* SPACER */}
      <div className="w-full h-[50vh] bg-black relative z-30" />
    </>
  );
};

// OPTIMIZATION 6: Clean Mobile Logo Component
// Removed 'drop-shadow' class entirely for mobile
const MobileLogo = ({ src }: { src: string }) => (
    <div className="flex items-center justify-center h-14 p-0.5">
        <img 
            src={src} 
            loading="lazy" // Enable Lazy Loading
            className="sponsor-img max-w-full max-h-full object-contain" // Removed drop-shadow
            alt="sponsor" 
        />
    </div>
);

export default SponsorsPage;