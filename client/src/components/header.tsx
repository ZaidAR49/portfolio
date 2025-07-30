import { useState } from "react";
import { FaHome, FaUser, FaEnvelope,FaProjectDiagram, FaBars, FaTimes} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/theme-context";

export const Header = () => {
    const {theme,toggleTheme}=useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const routes = [{
    name: "Home",
    icon: <FaHome/>,
    path: ""
    },


{
    name:"Projects",
    icon: <FaProjectDiagram/>,
    path: "projects"},
    {
    name: "About",
    icon: <FaUser/>,
    path: "about"
},
    {
    name:"contact",
    icon: <FaEnvelope/>,
    path: "footer"
},
];

const handleNavigation = (path: string) => {
    if (path === "projects") {
        // If not on home, navigate to home with scrollTo state
        navigate("/", { state: { scrollTo: "projects" } });
    } else if (path === "" || path === "about") {
        navigate("/" + path);
    } else {
        document.getElementById(path)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
};

  return (
    <>
<div onClick={toggleTheme}>{theme}</div>
      <div className="text-white p-4 flex flex-row items-center justify-between">
        <div>
          <img className="rounded-full w-24 h-24 " src="/logo.png" alt="" />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row gap-8 lg:gap-16 items-center p-3">
            {routes.map((route) => {
            return(
            <div className="hover:text-cyan-500 active:scale-95 cursor-pointer hover:scale-110" key= {route.path} onClick={()=>{ handleNavigation(route.path)}}> 
                <div className="flex flex-row gap-2 items-center">{route.icon}{route.name}</div>
            </div>
            );
        })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-cyan-500 transition-colors"
            >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
            <div className="flex flex-col p-4 space-y-4">
                {routes.map((route) => {
                return(
                <div 
                    className="hover:text-cyan-500 active:scale-95 cursor-pointer hover:scale-110 py-2" 
                    key= {route.path} 
                    onClick={() => handleNavigation(route.path)}
                > 
                    <div className="flex flex-row gap-3 items-center text-lg">{route.icon}{route.name}</div>
                </div>
                );
            })}
            </div>
        </div>
      )}
     
    </>
  );
};
