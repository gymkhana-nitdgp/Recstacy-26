import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Menu from "./hamburger/Menu";
import { usePageTransition } from '../context/TransitionContext'; // <--- UPDATED HOOK NAME

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Use the updated context hook
  const { startTransition, endTransition } = usePageTransition();

  // Close mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location]);

  // --- YOUR ORIGINAL GSAP ANIMATION ---
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
      if (isOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isOpen]);

  // --- UPDATED NAVIGATION LOGIC ---
  const handleNavClick = (e: React.MouseEvent, path: string, isScrollLink: boolean = false) => {
    e.preventDefault();
    
    // 1. Close mobile menu
    if (isOpen) setIsOpen(false);

    // 2. Prevent reloading current page (unless it's a scroll link or Home refresh)
    if (location.pathname === path && !isScrollLink && path !== '/') return;

    // --- CASE 1: HOME NAVIGATION (RoutingLoader) ---
    if (path === '/') {
        // CRITICAL CHANGE: We pass '/' as the second argument.
        // We DO NOT manually setTimeout/navigate here. 
        // The RoutingLoader component receives this path and handles the navigation/timing.
        startTransition('routing', '/');
    } 
    
    // --- CASE 2: FORWARD NAVIGATION (Other Pages) ---
    else {
        startTransition('forward', path);

        // For forward navigation (simple CSS loader), we keep your manual timing
        setTimeout(() => {
            if (isScrollLink) {
                // Handle Sponsors Scroll Logic
                if (location.pathname !== '/') {
                    navigate('/'); 
                    setTimeout(() => {
                        const element = document.getElementById(path.replace('/#', ''));
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                } else {
                    const element = document.getElementById(path.replace('/#', ''));
                    element?.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                navigate(path);
            }
            
            // Lift curtain manually for forward loader
            setTimeout(endTransition, 500);
        }, 2000); // 2s wait for Forward animation
    }
  };

  const navLinks = [
    { name: "HOME", path: "/", isScroll: false },
    { name: "EVENTS", path: "/events", isScroll: false },
    { name: "SPONSORS", path: "/sponsors", isScroll: false },
    { name: "CONTACT", path: "/contact", isScroll: false },
  ];

  return (
    <div id="navbar-container" ref={containerRef} className="fixed top-0 left-0 w-full z-[60] px-6 py-6 pointer-events-none font-[family-name:var(--font-man-of-space)]">
      
      {/* DESKTOP NAV */}
      <div className="hidden md:flex pointer-events-auto absolute top-8 left-12 gap-8 items-center z-[60]">
        <Menu />
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            onClick={(e) => handleNavClick(e, link.path, link.isScroll)}
            className="text-[#FFEBD0] text-sm tracking-widest opacity-90 hover:opacity-100 hover:text-orange-500 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] cursor-pointer"
            style={{ fontFamily: "'Man of Space', sans-serif" }}
          >
            {link.name}
          </a>
        ))}
      </div>
      <div className="md:hidden absolute top-6 left-6 pointer-events-auto z-[70]">
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;