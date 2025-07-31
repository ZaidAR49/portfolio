import { useState } from "react";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaProjectDiagram,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/theme-context";

export const Header = () => {
  const { theme,toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
    const DarkMode =()=>{
    return(
   <label className="swap swap-rotate  flex flex-row w-fit">
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" className="theme-controller" value="synthwave"onClick={toggleTheme} />

  {/* sun icon */}
  <svg
    className={`swap-off h-6 w-6 fill-current text-${theme=="dark"?"white":"dark"} `}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

  {/* moon icon */}
  <svg
    className={`swap-on h-6 w-6 fill-current text-${theme=="dark"?"white":"dark"}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
 {  `${theme === "dark" ? "Light" : "Dark"} Mode`}
</label>);}

  const taps = [
    {
      name: "Home",
      icon: <FaHome />,
      path: "",
    },

    {
      name: "Projects",
      icon: <FaProjectDiagram />,
      path: "projects",
    },
    {
      name: "About",
      icon: <FaUser />,
      path: "about",
    },
    {
      name: "contact",
      icon: <FaEnvelope />,
      path: "footer",
    },
    {
        name:"",
        icon: DarkMode(),
        path:"darkMode"
    }
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
     
      <div className=" p-4 flex flex-row items-center justify-between">
        <div>
          <img className="rounded-full w-24 h-24 " src="favicon.svg" alt="" />
        </div>

        
        <div className="hidden md:flex flex-row gap-8 lg:gap-16 items-center p-3">
            {/* Dark Mode Toggle */}
          

{/* Desktop Navigation */}
          {taps.map((route) => {
            return (
              <div
                className="hover:text-cyan-500 active:scale-95 cursor-pointer hover:scale-110"
                key={route.path}
                onClick={() => {
                  handleNavigation(route.path);
                }}
              >
                <div className="flex flex-row gap-2 items-center">
                  {route.icon}
                  {route.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className=" hover:text-cyan-500 transition-colors"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800">
          <div className="flex flex-col p-4 space-y-4">
            {taps.map((route) => {
              return (
                <div
                  className="hover:text-cyan-500 active:scale-95 cursor-pointer hover:scale-110 py-2"
                  key={route.path}
                 {...route.path === "darkMode" ? {} : { onClick: () => handleNavigation(route.path) }}
                >
                  <div className="flex flex-row gap-3 items-center text-lg">
                    {route.icon}
                    {route.name}
                  </div>
                </div>
              );
            })}
            
          </div>
        </div>
      )}
    </>
  );
};
