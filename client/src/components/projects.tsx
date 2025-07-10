import { projects } from "../data/projects";
import { FaGithub } from "react-icons/fa";
export const Projects = () => {
  return (
    <div className="flex flex-col p-10 -mt-60 gap-10">
        <div><div className="text-5xl font-bold uppercase w-80 whitespace-nowrap text-start">Projects</div><br/><p>Here are some of the selected projects that showcase my passion for front-end development</p></div>
<div className=" flex flex-row justify-between">
    <div className="w-[500px] h-[500px] bg-slate-400 flex justify-center rounded-2xl content-center"><img className="h-[100] w-[400]" src="logo.png" alt="project" /></div>
     <div className="bg-black text-white p-6 max-w-md border border-gray-800">
      <h2 className="text-sm font-semibold text-gray-400 mb-4">PROJECT INFO</h2>

      <div className="border-t border-gray-600 py-3 flex justify-between text-sm">
        <span className="text-gray-300">Client</span>
        <span>World News</span>
      </div>

      <div className="border-t border-gray-600 py-3 flex justify-between text-sm">
        <span className="text-gray-300">Year</span>
        <span>2022</span>
      </div>

      <div className="border-t border-gray-600 py-3 flex justify-between text-sm">
        <span className="text-gray-300">Role</span>
        <span>Front-end Developer</span>
      </div>

      <div className="border-t border-gray-600 pt-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-lime-400 hover:underline text-sm gap-2"
        >
          SEE ON GITHUB <FaGithub size={18} />
        </a>
      </div>
    </div>
</div>
      
    </div>
  );
}