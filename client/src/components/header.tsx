import { useState, useEffect, useContext } from "react";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaProjectDiagram,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../contexts/theme-context";

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check initial scroll position
    setScrolled(window.scrollY > 20);
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset scroll state when navigating to a new page
  useEffect(() => {
    setScrolled(window.scrollY > 20);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", icon: <FaHome />, path: "/", id: "home-btn" },
    { name: "Projects", icon: <FaProjectDiagram />, path: "projects", id: "projects-btn" },
    { name: "About", icon: <FaUser />, path: "about", id: "about-btn" },
    { name: "Contact", icon: <FaEnvelope />, path: "footer", id: "contact-btn" },
  ];

  const handleNavigation = (path: string) => {
    if (path === "projects") {
      navigate("/", { state: { scrollTo: "projects" } });
    } else if (path === "footer") {
      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    } else if (path === "/") {
       navigate("/");
       window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate("/" + path);
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--bg-tertiary)] shadow-lg"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavigation("/")}
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-lg bg-gradient-to-br from-[var(--accent)] to-purple-600 p-0.5 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[var(--bg-primary)] rounded-lg flex items-center justify-center">
              <img src="/favicon.svg" alt="Logo" className="w-8 h-8 object-cover" />
            </div>
          </div>
          <span className="text-xl md:text-2xl font-bold text-gradient hidden sm:block">
            ZAR
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              id={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                location.pathname === (item.path.startsWith("/") ? item.path : "/" + item.path)
                  ? "text-[var(--accent)] bg-[var(--accent)]/10"
                  : "text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--bg-secondary)]"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </span>
            </button>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300 border border-[var(--bg-tertiary)]"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--bg-tertiary)]"
          >
            {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors p-2"
          >
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`absolute top-full left-0 right-0 md:hidden transition-all duration-300 ease-out ${
          isMenuOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2">
          <nav className="w-full bg-[var(--bg-primary)]/95 backdrop-blur-xl rounded-xl shadow-2xl border border-[var(--bg-tertiary)] overflow-hidden">
            <div className="p-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                    location.pathname === (item.path.startsWith("/") ? item.path : "/" + item.path)
                      ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30"
                      : "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)]"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
