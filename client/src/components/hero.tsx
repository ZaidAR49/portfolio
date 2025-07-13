import { useNavigate } from "react-router-dom";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt} from "react-icons/fa";
import { SiPostgresql, SiTailwindcss, SiJavascript, SiTypescript, SiSharp} from "react-icons/si";
import { userInfo } from "../data/about";
export const Hero = () => {
  const navigate = useNavigate();
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
    
    <div className="hero min-h-screen ">
      <div className="hero-content text-start flex-row justify-between gap-96 ">
        <div className="max-w-md">
          <h1 className="header-primary">Hi, I'm <br /> {userInfo.name}</h1>
          <p className="py-6">
             I’m a passionate <strong>Software Engineer</strong> {userInfo.descHero}
          </p>
          <div className="btn-primary" onClick={()=>{navigate("/contact")}}>Contact me</div>

      
        </div>
        <div>
            <img className="border-4 border-spacing-64 border-gray-400 w-96 h-96 rounded " src="me.jpg" alt="me" />
        </div>
      </div>
   
    </div>
    <div>
         
       <div className="flex-col gap-0  justify-center max-w-lg mx-auto mt-10">
          <div className="carousel  carousel-center rounded-box  opacity-60 my-10 w-full">
          
      {techIcons.map((tech, index) => (
        <div key={index} className="carousel-item w-24 h-24 flex flex-col items-center justify-center">
          <div className="text-4xl">{tech.icon}</div>
          <span className="text-sm mt-2">{tech.name}</span>
        </div>
      ))  }
      
    </div>
    <div className="text-4xl  opacity-60 ml-60 -mt-16 mb-10 ">...</div>
       </div>
    </div>
  </div>
    {/*line and space*/}
 
       <div className="w-full h-px bg-white opacity-30"></div>
      
    </>
  );
};