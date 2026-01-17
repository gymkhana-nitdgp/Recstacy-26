import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ASSETS } from '../assets/constants';
import { useTransition } from '../context/TransitionContext'; // <--- Import Context

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Get the transition trigger from our custom context
  const { triggerTransition } = useTransition();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to(".hamburger-icon", {
        opacity: 0, 
        rotation: 360, 
        duration: 1.2, 
        ease: "power4.inOut"
      })
      .to(menuRef.current, {
        clipPath: "circle(150% at 90% 10%)",
        opacity: 1,
        pointerEvents: "all",
        duration: 0.8,
        ease: "power3.inOut"
      }, "-=0.8") 
      .from(".mobile-link", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.4");

  }, { scope: containerRef });

  useEffect(() => {
    if (tl.current) {
      isOpen ? tl.current.play() : tl.current.reverse();
    }
  }, [isOpen]);

  // --- NEW: Handle Navigation Click ---
  // Instead of letting <Link> handle it, we intercept the click,
  // prevent default behavior, and trigger our Spline Gateway transition.
  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    
    // 1. Close mobile menu if it's open
    if (isOpen) setIsOpen(false);

    // 2. If we are already on this page, do nothing (optional optimization)
    if (location.pathname === path) return;

    // 3. Trigger the sliding door animation + navigation
    triggerTransition(path);
  };

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "/about" },
    { name: "EVENTS", path: "/events" },
    { name: "CONTACT", path: "/contact" }
  ];

  return (
    <div id="navbar-container" ref={containerRef} className="fixed top-0 left-0 w-full z-[60] px-6 py-6 pointer-events-none font-[family-name:var(--font-man-of-space)]">
      
      {/* DESKTOP NAV */}
      <div className="hidden md:flex pointer-events-auto absolute top-8 left-12 gap-8 items-center z-[60]">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            onClick={(e) => handleNavClick(e, link.path)}
            className="text-[#FFEBD0] text-sm tracking-widest opacity-90 hover:opacity-100 hover:text-orange-500 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] cursor-pointer"
            style={{ fontFamily: "'Man of Space', sans-serif" }}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* MOBILE HAMBURGER BUTTON */}
      <div className="md:hidden absolute top-6 left-6 pointer-events-auto z-[70]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center justify-center focus:outline-none"
          aria-label="Menu"
        >
          <img
            src={ASSETS.HAMBURGER}
            alt="Menu"
            className="hamburger-icon w-20 h-20 object-contain filter brightness-[0.7] drop-shadow-[0_0_10px_rgba(0,0,0,1)] drop-shadow-[0_0_15px_rgba(255,100,0,0.8)] transition-transform group-hover:scale-110"
          />
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[65] flex flex-col items-center justify-center pointer-events-none opacity-0"
        style={{ clipPath: "circle(0% at 10% 10%)" }}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 left-6 text-white/50 hover:text-white pointer-events-auto p-2"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* MOBILE LINKS */}
        <nav className="flex flex-col gap-8 text-center pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className="mobile-link text-3xl font-black text-[#FFEBD0] tracking-[0.2em] hover:text-orange-500 transition-colors filter drop-shadow-[0_0_10px_rgba(0,0,0,1)] drop-shadow-[0_0_15px_rgba(255,69,0,0.5)] cursor-pointer"
              style={{ fontFamily: "'Man of Space', sans-serif" }}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;