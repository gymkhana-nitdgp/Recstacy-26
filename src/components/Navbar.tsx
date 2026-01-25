import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePageTransition } from "../context/TransitionContext";
import Menu from "./hamburger/Menu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  // const navigate = useNavigate();

  const { startTransition } = usePageTransition();

  // Close menu when route changes
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(timer);
  }, [location]);

  const handleNavClick = (e: React.MouseEvent, path: string, isScrollLink: boolean = false) => {
    e.preventDefault();

    if (isOpen) setIsOpen(false);

    // Prevent reloading current page
    if (location.pathname === path && !isScrollLink && path !== "/") return;

    // SCROLL LINK LOGIC
    if (isScrollLink && location.pathname === '/') {
       const element = document.getElementById(path.replace("/#", ""));
       element?.scrollIntoView({ behavior: "smooth" });
       return;
    }
    startTransition('forward', path);
  };

  return (
    <div 
      id="navbar-container"
      ref={containerRef}
      className="fixed top-0 left-0 w-full z-[60] px-6 py-6 pointer-events-none font-[family-name:var(--font-man-of-space)]"
    >
      <div className="hidden md:flex pointer-events-auto absolute top-8 left-12 gap-8 items-center z-[60]">
        <Menu handleNavClick={handleNavClick} desktop />
      </div>

      {/* MOBILE VIEW ADJUSTMENT */}
      <div 
        className="md:hidden absolute top-0 left-0 p-10 pointer-events-auto z-[70]" // Added p-5 to increase hit area container
        style={{ touchAction: 'none' }} 
      >
        <Menu handleNavClick={handleNavClick} desktop={false} />
      </div>
    </div>
  );
};

export default Navbar;