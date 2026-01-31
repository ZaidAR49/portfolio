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
  FaTachometerAlt
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../contexts/theme-context";
import { isOwnerModeEnabled } from "../helpers/storage-helper";
import { logger } from "../helpers/logger.healper";
export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(false);

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

  useEffect(() => {
    setIsOwnerMode(isOwnerModeEnabled());
    logger.log("isOwnerMode", isOwnerMode);
  }, [isOwnerMode]);
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

  if (isOwnerModeEnabled()) {
    logger.log("Owner mode enabled");
    navItems.push({ name: "Dashboard", icon: <FaTachometerAlt />, path: "dashboard", id: "dashboard-btn" });
  }

  const handleNavigation = (path: string) => {
    if (path === "projects") {
      navigate("/", { state: { scrollTo: "projects" } });
    } else if (path === "footer") {
      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    } else if (path === "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      navigate("/" + path);
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "py-3 bg-slate-50 dark:bg-slate-900 border-b border-[var(--text-secondary)]/10"
        : "py-5 bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavigation("/")}
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
            <img src="/favicon.svg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent)] hidden sm:block">
            ZAR
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              id={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:text-[var(--accent)] ${location.pathname === (item.path.startsWith("/") ? item.path : "/" + item.path)
                ? "text-[var(--accent)]"
                : "text-[var(--text-secondary)]"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm"
          >
            {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm hover:text-[var(--accent)] transition-colors"
          >
            {isMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`absolute top-full left-0 right-0 md:hidden transition-all duration-300 ease-out ${isMenuOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <div className="flex justify-end px-4">
          <nav className="w-full max-w-[280px] mt-2 bg-[var(--bg-primary)] rounded-2xl shadow-2xl border border-[var(--text-secondary)]/10 overflow-hidden">
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 ${location.pathname === (item.path.startsWith("/") ? item.path : "/" + item.path)
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
