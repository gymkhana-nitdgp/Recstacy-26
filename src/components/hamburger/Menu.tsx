import { useRef, useState } from "react";
import gsap from "gsap";
import LOGO from "/logo.png";
import { useGSAP } from "@gsap/react";
import Modal from "./components/Modal";
import { useBreakpoints } from "./hooks/useBreakpoints";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  
  const container = useRef<HTMLDivElement>(null);
  const chakraRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const { isMd } = useBreakpoints();
  const toggleMenu = () => {
    if (!isOpen) {
      setIsRendered(true); // Mount to DOM
      setIsOpen(true);     // Trigger "In" animation
    } else {
      setIsOpen(false);    // Trigger "Out" animation (logic below handles unmounting)
    }
  };

  useGSAP(
    () => {
      tl.current = gsap.timeline({ paused: true, repeat: -1 }).to(chakraRef.current, {
        rotation: 360,
        duration: 8,
        ease: "none",
      });
    },
    { scope: container }
  );

  const handleMouseEnter = () => {
    tl.current!.play();
    gsap.to(chakraRef.current, { opacity: 1, scale: 1.5, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    tl.current!.pause();
    gsap.to(chakraRef.current, { opacity: 0, scale: 1, duration: 0.3 });
  };

  // The Animation Controller
  useGSAP(() => {
    if (isOpen && isRendered) {
      const tlOpen = gsap.timeline();
      tlOpen
        .to(modalRef.current, {
          display: "flex",
          clipPath: "circle(0% at 50px 50px)",
          duration: 0,
        })
        .to(modalRef.current, {
          clipPath: "circle(150% at 40px 40px)",
          duration: 1,
          ease: "expo.inOut",
        })
        .from(".nav-item", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.5");
    } else if (!isOpen && isRendered) {
      // EXIT ANIMATION
      gsap.to(modalRef.current, {
        clipPath: "circle(0% at 50px 50px)",
        duration: 0.8,
        ease: "power4.in",
        onComplete: () => {
          setIsRendered(false); // FINALLY remove from DOM after animation finishes
        },
      });
    }
  }, [isOpen, isRendered]);

  return (
    <div ref={container}>
      <div
        className="relative z-100 cursor-pointer inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleMenu}
      >
        <div
          ref={chakraRef}
          className={`${isMd ? "top-1 left-1 w-12 h-12 absolute border-2 border-dashed border-zinc-400 rounded-full opacity-0" : "hidden"}`}
        />
        <img
          src={LOGO}
          alt="logo image"
          className={`h-${isMd ? 14 : 12} z-10 relative hover:rotate-180 hover:scale-105 transition-transform duration-500`}
        />
      </div>
      
      {/* Use isRendered instead of isOpen to keep the component alive during exit */}
      {isRendered && <Modal modalRef={modalRef} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default HamburgerMenu;