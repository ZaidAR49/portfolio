import { projects } from "../data/projects";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
export const Projects = () => {
  const [index_image, setIndex_image] = useState(0);
  const handleImageChange = (direction: "next" | "prev",projectindex:number) => {
    if (direction === "next") {
      setIndex_image((prev) => (prev + 1) % projects[projectindex].image.length);
    } else {
      setIndex_image((prev) =>
        prev === 0 ? projects[projectindex].image.length - 1 : prev - 1
      );
    }
  };
  return (
     <>
    <div className="flex flex-col p-10 my-32 gap-10">
        <div><div className="header-primary">Projects</div><br/><p>Here are some of the selected projects that showcase my passion for front-end development</p></div>
{projects.map((project, index) => (
  <div key={index} className=" flex flex-row gap-36 my-16">
    <div className="w-[550px] h-[550px] bg-slate-900 flex justify-center rounded-xl center items-center relative">
      <div className={`absolute top-2 left-2 p-2 rounded-xl  ${project.state=="completed" ?"bg-green-700": "bg-yellow-200"}`}>{project.state}</div>
    <div id="slide1" className="carousel-item relative flex items-center justify-center">
  <img
    src={project.image[index_image]}
    className="h-96 w-96 rounded-xl object-fill"
    alt="project"
  />

  <div className="absolute inset-0 flex items-center justify-between -mx-16 ">
    <div onClick={()=>{handleImageChange("prev",index); console.log(index)}} className="text-3xl text-white hover:scale-125 transition cursor-pointer select-none">❮</div>
    <div onClick={()=>{handleImageChange("next",index); console.log(index)}} className="text-3xl text-white hover:scale-125 transition cursor-pointer select-none">❯</div>
  </div>
</div>

      </div>
    {/*project desc*/}
    <div className="flex flex-col gap-7 mt-5 flex-nowrap max-w-2xl">
<div className="header-secondary">{project.title} </div>

<p>{project.description}</p>
 <div className="bg-black text-white p-6 max-w-xl border border-gray-800">
      <h2 className="text-base font-semibold mb-4">PROJECT INFO</h2>

    

      <div className="border-t border-gray-600 py-3 flex justify-between text-base">
        <span >Year</span>
        <span className="text-gray-300">{project.year}</span>
      </div>

      <div className="border-t border-gray-600 py-3 flex justify-between text-base">
        <span >Role</span>
        <span className="text-gray-300">{project.role}</span>
      </div>

    </div>
<a className="btn-primary w-fit my-5" href="https://github.com/ZaidAR49/Green-Bridge.git"><FaGithub/> view in Github</a>
    </div>
    
    
    
    
</div>
))}
      
    </div>
    <div className="w-full h-px bg-white opacity-30"></div>
   </>
  );
}