import { projects } from "../data/projects-data";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
export const Projects = () => {
const [imageIndices, setImageIndices] = useState(() => projects.map(() => 0));


  const handleImageChange = (
  direction: "next" | "prev",
  projectIndex: number
) => {
  setImageIndices((prevIndices) => {
    const newIndices = [...prevIndices];
    const numImages = projects[projectIndex].image.length;
    if (direction === "next") {
      newIndices[projectIndex] = (newIndices[projectIndex] + 1) % numImages;
    } else {
      newIndices[projectIndex] =
        newIndices[projectIndex] === 0
          ? numImages - 1
          : newIndices[projectIndex] - 1;
    }
    return newIndices;
  });
};

  const stateColor = (index: number) => {
    switch (projects[index].state.toLowerCase()) {
      case "completed":
        return "bg-green-500 text-white";
      case "in progress":
        return "bg-yellow-600 text-white";
      case "suspend":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };
  return (
    <>
      <div
        id="projects"
        className="flex flex-col p-4 sm:py-6 lg:py-10 my-16 sm:my-24 lg:my-32  "
      >
        <div className=" p-10 sm:px-16 max-w-3xl ">
          <div className="header-primary text-3xl sm:text-4xl lg:text-6xl">
            Projects
          </div>
          <br />
          <p className="text-base sm:text-lg lg:text-xl">
            Here are some of the selected projects that showcase my passion for
            front-end development
          </p>
        </div>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.15, ease: "easeOut" }}
            className="flex flex-col lg:flex-row justify-between p-10 lg:p-32 xl:p-14  md:p-16"
          >
            <div className="w-full lg:w-[550px] h-[300px] sm:h-[400px] lg:h-[550px] bg-slate-900 flex justify-center rounded-xl center items-center relative">
              <div
                className={`absolute top-2 left-2 p-2 rounded-xl text-xs sm:text-sm ${stateColor(
                  index
                )}`}
              >
                {project.state}
              </div>
              <div
                id="slide1"
                className="carousel-item relative flex items-center justify-center"
              >
                <img
                  src={project.image[imageIndices[index]]}
                  className="h-48 w-48 sm:h-64 sm:w-64 lg:h-96 lg:w-96 rounded-xl object-cover"
                  alt="project"
                />

                <div
                  className="absolute inset-0 flex items-center justify-between -mx-8 sm:-mx-12 lg:-mx-16"
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      handleImageChange("next", index);
                    } else if (e.key === "ArrowLeft") {
                      handleImageChange("prev", index);
                    }
                  }}
                  tabIndex={0}
                   role="button"
                >
                  <div
                    onClick={() => {
                      handleImageChange("prev", index);
                    }}
                    className="text-2xl sm:text-3xl text-white hover:scale-125 transition cursor-pointer select-none"
                  >
                    ❮
                  </div>
                  <div
                    onClick={() => {
                      handleImageChange("next", index);
                    }}
                    className="text-2xl sm:text-3xl text-white hover:scale-125 transition cursor-pointer select-none"
                  >
                    ❯
                  </div>
                </div>
              </div>
            </div>
            {/*project desc*/}
            <div className="flex flex-col gap-4 sm:gap-6 lg:gap-7 mt-2 lg:mt-5 flex-nowrap max-w-2xl">
              <div className="header-secondary text-2xl sm:text-3xl lg:text-4xl">
                {project.title}{" "}
              </div>

              <p className="text-base sm:text-lg lg:text-xl">
                {project.description}
              </p>
              <div className="backgraund  p-4 sm:p-6 max-w-xl border border-gray-800">
                <h2 className="text-sm sm:text-base font-semibold mb-4">
                  PROJECT INFO
                </h2>

                <div className="border-t border-gray-600 py-3 flex justify-between text-sm sm:text-base">
                  <span>Year</span>
                  <span className="text-gray-400">{project.year}</span>
                </div>

                <div className="border-t border-gray-600 py-3 flex justify-between text-sm sm:text-base">
                  <span>Role</span>
                  <span className="text-gray-400 max-w-36">{project.role}</span>
                </div>
                <div className="border-t border-gray-600 py-3 flex justify-between text-sm sm:text-base">
                  <span>Techs</span>
                  <span className="text-gray-400 max-w-36">{project.tech}</span>
                </div>
              </div>
              <a
                className="btn-primary w-fit my-3 sm:my-4 lg:my-5 text-sm sm:text-base max-w-fit"
                href="https://github.com/ZaidAR49/Green-Bridge.git"
              >
                <FaGithub /> view in Github
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="w-full h-px background-oopposit opacity-30"></div>
    </>
  );
};
