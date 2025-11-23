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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          ? "py-3 bg-[var(--bg-primary)]/10 backdrop-blur-md border-b border-[var(--text-secondary)]/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavigation("/")}
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
             <img src="/favicon.svg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent)] hidden sm:block">
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
              className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:text-[var(--accent)] ${
                location.pathname === (item.path.startsWith("/") ? item.path : "/" + item.path)
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
            className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors p-1"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-[75%] max-w-[320px] bg-[var(--bg-primary)] shadow-2xl transform transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full bg-[var(--bg-primary)]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--text-secondary)]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Z</span>
                </div>
                <span className="text-lg font-bold text-[var(--text-primary)]">ZAR</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-6">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                      location.pathname === (item.path.startsWith("/") ? item.path : "/" + item.path)
                        ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30"
                        : "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)]"
                    }`}
                    style={{ 
                      animation: isMenuOpen ? `slideUp 0.3s ease-out ${index * 0.05}s both` : 'none'
                    }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-base font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-[var(--text-secondary)]/10">
              <p className="text-xs text-[var(--text-secondary)] text-center">
                © 2025 Zaid Radaideh
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
