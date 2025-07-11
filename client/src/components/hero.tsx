import { useNavigate } from "react-router-dom";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiPostgresql, SiTailwindcss, SiJavascript, SiTypescript } from "react-icons/si";
export const Hero = () => {
  const navigate = useNavigate();
  const techIcons = [
    { icon: <FaReact />, name: "React" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <FaHtml5 />, name: "HTML5" },
    { icon: <FaCss3Alt />, name: "CSS3" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
     { icon: <FaReact />, name: "React" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <FaHtml5 />, name: "HTML5" },
    { icon: <FaCss3Alt />, name: "CSS3" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
     { icon: <FaReact />, name: "React" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <FaHtml5 />, name: "HTML5" },
    { icon: <FaCss3Alt />, name: "CSS3" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
  
  ];
  return (
    <>
  
    <div className="hero min-h-screen -mt-20">
      <div className="hero-content text-start flex-row justify-between gap-96 ">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold uppercase w-80 whitespace-nowrap">Hi, I'm Zaid Radaideh</h1>
          <p className="py-6">
             I’m a passionate <strong>Software Engineer</strong> focused on creating beautiful, high-performance web applications 
          </p>
          <div className="btn-primary" onClick={()=>{navigate("/contact")}}>Contact me</div>

      
        </div>
        <div>
            <img className="border-4 border-spacing-64 border-gray-400 w-96 h-96 rounded " src="me.jpg" alt="me" />
        </div>
      </div>
   
    </div>
    <div>
         
       <div className="flex justify-center ">
          <div className="carousel carousel-center rounded-box  opacity-60 mt-10 max-w-screen-md">
          
      {techIcons.map((tech, index) => (
        <div key={index} className="carousel-item w-24 h-24 flex flex-col items-center justify-center">
          <div className="text-4xl">{tech.icon}</div>
          <span className="text-sm mt-2">{tech.name}</span>
        </div>
      ))  }
    </div>
    
       </div>
    </div>
    {/*line and space*/}
 
       <div className="w-full h-px bg-white opacity-30"></div>
      <div className="h-80"></div>
    </>
  );
};