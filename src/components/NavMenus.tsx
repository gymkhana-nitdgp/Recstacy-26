const navLinks: {name: string; path: string; isScroll: boolean}[] = [
    // { name: "HOME", path: "/", isScroll: false },
    // { name: "EVENTS", path: "/events", isScroll: false },
    // { name: "SPONSORS", path: "/sponsors", isScroll: false },
    // { name: "CONTACT", path: "/contact", isScroll: false },
  ];
  
  const NavMenus = ({handleNavClick}: {handleNavClick: (e: React.MouseEvent, path: string, isScrollLink: boolean)=>void}) => {  
    return (
      <>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path, link.isScroll)}
              className={`
                text-[#FFEBD0] text-sm tracking-widest 
                opacity-90 active:opacity-100 md:hover:opacity-100 
                active:text-orange-500 md:hover:text-orange-500 
                
                /* OPTIMIZATION 1: Specific transition only (saves GPU from animating shadow) */
                transition-colors duration-300 
                
                /* OPTIMIZATION 2: Heavy drop-shadow only on Desktop */
                md:drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
                
                cursor-pointer
                
                /* OPTIMIZATION 3: Larger touch target for mobile fingers */
                py-2 md:py-0
              `}
              style={{ fontFamily: "'Man of Space', sans-serif" }}
            >
              {link.name}
            </a>
          ))}
      </>
    )
  }
  
  export default NavMenus