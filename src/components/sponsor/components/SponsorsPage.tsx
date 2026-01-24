import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOBILE_ORDER, LAST_ON_DESKTOP } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const SponsorsPage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const partnersContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const desktopSponsors = React.useMemo(() => {
    const normal = MOBILE_ORDER.filter((s) => !LAST_ON_DESKTOP.includes(s.name));
    const last = MOBILE_ORDER.filter((s) => LAST_ON_DESKTOP.includes(s.name));
    return [...normal, ...last];
  }, []);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      // 1. Initial State: Title centered in middle of screen (exactly at 50% vertical center)
      const titleH2 = titleGroupRef.current?.querySelector("h2") as HTMLElement;
      // Center using yPercent: -50 (centers vertically) and y: 0 (no additional offset)
      gsap.set(titleGroupRef.current, {
        scale: 1,
        yPercent: -50, // Centers vertically (since top: 50%)
        y: 0,
        opacity: 1,
      });
      if (titleH2) {
        gsap.set(titleH2, {
          fontSize: isMobile ? "15vw" : "14vw",
        });
      }

      gsap.set(partnersContentRef.current, {
        opacity: 0,
        y: "100vh", // Start completely off-screen
      });

      gsap.set(".sponsor-img-wrapper", {
        opacity: 0,
        y: 30,
        scale: 0.9,
      });

      // 2. Transformation Timeline with improved scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Calculate safe positioning to prevent overlap
      // Title starts centered (y: 0), moves up and scales down
      const titleScale = isMobile ? 0.8 : 0.5;
      const titleTopPosition = isMobile ? "-30vh" : "-35vh"; // Move to top
      const titleFontSize = isMobile ? "12vw" : "10vw"; // Increased final font size at end of scroll
      const contentTopPosition = isMobile ? "-18vh" : "-10vh"; // Much reduced gap between SPONSOR title and OFFICIAL PARTNERS text for mobile

      // Animate Title: center -> top, large -> small (both scale and fontSize)
      tl.to(
        titleGroupRef.current,
        {
          y: titleTopPosition,
          scale: titleScale,
          letterSpacing: "0.1em",
          duration: 1.8,
          ease: "power2.inOut",
        },
        0,
      )
        // Animate font size separately for better control
        .to(
          titleH2,
          {
            fontSize: titleFontSize,
            duration: 1.8,
            ease: "power2.inOut",
          },
          0,
        )
        // Pull content up and reveal it below the title
        .to(
          partnersContentRef.current,
          {
            opacity: 1,
            y: contentTopPosition,
            duration: 1.5,
            ease: "power2.out",
          },
          0.4,
        )
        // Stagger logos with smoother animation
        .to(
          ".sponsor-img-wrapper",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: {
              amount: 1.2,
              from: "center",
              grid: "auto",
            },
            duration: 1.0,
            ease: "power2.out",
          },
          0.6,
        );

      // Subtle BG parallax
      tl.to(
        bgRef.current,
        {
          scale: 1.03,
          duration: 2,
          ease: "none",
        },
        0,
      );

      // Handle window resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: sectionRef },
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black z-40"
        style={{ minHeight: "100vh", height: "100vh" }}
      >
        {/* BACKGROUND LAYER */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* MAIN VIEWPORT CONTAINER */}
        <div
          ref={containerRef}
          className="relative z-10 w-full p-10 min-w-[100vw] h-full flex flex-col justify-evenly items-center overflow-hidden"
        >
          {/* THE HERO TITLE -> STARTS CENTERED, MOVES TO TOP ON SCROLL */}
          <div
            ref={titleGroupRef}
            className="absolute z-30 flex flex-col items-center justify-center pointer-events-none w-full px-4"
            style={{ transformOrigin: "center center", top: "50%" }}
          >
            <h2
              className="font-mosca text-[#FFEBD0] text-6xl sm:text-6xl leading-none tracking-tight uppercase select-none text-center whitespace-nowrap mt-[50]"
              style={{
                textShadow: "0 0 50px rgba(255, 165, 0, 0.4)",
              }}
            >
              Sponsors
            </h2>
            <div className="h-0.5 w-1/4 max-w-[300px] bg-orange-500/60 mt-4 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
          </div>

          {/* REVEALED CONTENT (PARTNER GRID) */}
          <div
            ref={partnersContentRef}
            className="w-full flex flex-col items-center no-scrollbar px-4 md:[margin-top:30vh] [margin-top:38vh]"
            style={{ transformOrigin: "center center" }}
          >
            <div className="w-full flex flex-col items-center">
              <div className="text-white text-center font-bold uppercase tracking-[0.3em] text-[14px] md:text-[18px] mb-10 opacity-90">
                Official Partners
              </div>

              {/* MOBILE GRID - Optimized for vertical space */}
              <div className="flex flex-col gap-2 w-full md:hidden mb-8">
                <div className="grid grid-cols-4 gap-2">
                  {MOBILE_ORDER.slice(0, 4).map((s, i) => (
                    <MobileLogo key={i} src={s.src} />
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {MOBILE_ORDER.slice(4, 9).map((s, i) => (
                    <MobileLogo key={i} src={s.src} />
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {MOBILE_ORDER.slice(9, 14).map((s, i) => (
                    <MobileLogo key={i} src={s.src} />
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {MOBILE_ORDER.slice(14, 18).map((s, i) => (
                    <MobileLogo key={i} src={s.src} />
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {MOBILE_ORDER.slice(18, 22).map((s, i) => (
                    <MobileLogo key={i} src={s.src} />
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {MOBILE_ORDER.slice(22, 26).map((s, i) => (
                    <MobileLogo key={i} src={s.src} />
                  ))}
                </div>
              </div>

              {/* DESKTOP GRID */}
              <div className="hidden md:flex flex-wrap justify-center gap-6 w-full px-10 max-w-7xl pb-8">
                {desktopSponsors.map((sponsor, index) => (
                  <div
                    key={index}
                    className="sponsor-img-wrapper w-32 lg:w-44 h-24 flex items-center justify-center bg-zinc-900/40 rounded-2xl p-6 border border-white/5 backdrop-blur-xl group hover:border-orange-500/40 hover:bg-zinc-800/60 transition-all duration-500 shadow-xl"
                  >
                    <img
                      src={sponsor.src}
                      alt={sponsor.name}
                      className="sponsor-img w-full h-full object-contain transition-all duration-700 transform group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const MobileLogo: React.FC<{ src: string }> = ({ src }) => (
  <div className="sponsor-img-wrapper flex items-center justify-center h-14 p-2 bg-zinc-900/70 rounded-lg border border-white/5 backdrop-blur-md">
    <img
      src={src}
      className="sponsor-img max-w-full max-h-full object-contain"
      alt="partner"
      loading="lazy"
    />
  </div>
);

export default SponsorsPage;