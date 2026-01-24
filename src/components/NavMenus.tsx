const navLinks: { name: string; path: string; isScroll: boolean }[] = [
  { name: "HOME", path: "/", isScroll: false },
  { name: "EVENTS", path: "/events", isScroll: false },
  { name: "SPONSORS", path: "/sponsors", isScroll: false },
  { name: "CONTACT", path: "/contact", isScroll: false },
];

const NavMenus = ({
  handleNavClick,
}: {
  handleNavClick: (e: React.MouseEvent, path: string, isScrollLink: boolean) => void;
}) => {
  return (
    <>
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
    </>
  );
};

export default NavMenus;
