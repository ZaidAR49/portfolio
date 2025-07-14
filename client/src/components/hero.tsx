
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt} from "react-icons/fa";
import { SiPostgresql, SiTailwindcss, SiJavascript, SiTypescript, SiSharp} from "react-icons/si";
import { userInfo } from "../data/about";
export const Hero = () => {
  
  const techIcons = [
    { icon: <FaReact />, name: "React" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3Alt />, name: "CSS3" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
    {icon : <SiSharp />, name: "C#"},
   
  ];
  return (
    <>
  <div >
    
    <div className="hero min-h-screen animate-in fade-in slide-in-from-bottom duration-700 ">
      <div className="hero-content text-start flex-col lg:flex-row justify-between gap-8 lg:gap-96 px-4 lg:px-0">
        <div className="max-w-md ">
          <h1 className="header-primary text-4xl sm:text-5xl lg:text-6xl">Hi, I'm <br /> {userInfo.name}</h1>
          <p className="py-6">
             I'm a passionate <strong>Software Engineer</strong> {userInfo.descHero}
          </p>
          <div className="btn-primary" onClick={()=>{document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });}}>Contact me</div>

      
        </div>
        <div className="mt-8 lg:mt-0 sm:block hidden">
            <img className="border-4 border-spacing-64 border-gray-400 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded " src="me.jpg" alt="me" />
        </div>
      </div>
   
    </div>
    <div>
         
       <div className="flex-col gap-0 justify-center max-w-lg mx-auto sm:mt-10 -mt-10 px-4 lg:px-0">
          <div className="carousel carousel-center rounded-box opacity-60 my-10 w-full">
          
      {techIcons.map((tech, index) => (
        <div key={index} className="carousel-item w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center">
          <div className="text-3xl sm:text-4xl">{tech.icon}</div>
          <span className="text-xs sm:text-sm mt-2">{tech.name}</span>
        </div>
      ))  }
      
    </div>
    <div className="text-3xl sm:text-4xl opacity-60 ml-20 sm:ml-40 lg:ml-60 -mt-16 mb-10 ">...</div>
       </div>
    </div>
  </div>
    {/*line and space*/}
 
       <div className="w-full h-px bg-white opacity-30"></div>
      
    </>
  );
};