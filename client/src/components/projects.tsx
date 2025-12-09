import { projects } from "../data/projects-data";
import { FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Projects = () => {
  projects.sort((a, b) => a.order - b.order);
  const [imageIndices, setImageIndices] = useState(() => projects.map(() => 0));

  const handleImageChange = (direction: "next" | "prev", projectIndex: number) => {
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

  const stateColor = (state: string) => {
    switch (state.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
      case "in progress":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50";
      case "suspend":
        return "bg-rose-500/20 text-rose-400 border-rose-500/50";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50";
    }
  };

  return (
    <section id="projects" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--accent)] font-bold tracking-wider uppercase mb-4 text-sm md:text-base"
          >
            My Work
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Featured Projects
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] text-lg"
          >
            A collection of projects that showcase my passion for building robust and interactive web applications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-64">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}
            >
              {/* Project Image Carousel */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--bg-secondary)] aspect-video bg-[var(--bg-secondary)]">
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md z-10 ${stateColor(project.state)}`}>
                    {project.state}
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imageIndices[index]}
                      src={project.image[imageIndices[index]]}
                      alt={project.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Carousel Controls */}
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleImageChange("prev", index); }}
                      className="p-2 rounded-full bg-black/50 text-white hover:bg-[var(--accent)] transition-colors backdrop-blur-sm"
                    >
                      <FaChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleImageChange("next", index); }}
                      className="p-2 rounded-full bg-black/50 text-white hover:bg-[var(--accent)] transition-colors backdrop-blur-sm"
                    >
                      <FaChevronRight size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className={`absolute -bottom-4 -right-4 w-full h-full border-2 border-[var(--accent)]/20 rounded-2xl -z-10 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2`} />
              </div>

              {/* Project Details */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                  {project.title}
                </h3>
                
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--bg-secondary)]">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Year</span>
                    <span className="font-semibold text-[var(--text-primary)]">{project.year}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Role</span>
                    <span className="font-semibold text-[var(--text-primary)]">{project.role}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Technologies</span>
                    <span className="font-semibold text-[var(--accent)]">{project.tech}</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                  >
                    <FaGithub size={20} />
                    <span>View Code</span>
                  </a>
                  {/* Placeholder for live demo if added later */}
                  {/* <a href="#" className="px-6 py-3 rounded-full font-semibold text-[var(--text-primary)] border border-[var(--text-secondary)]/30 hover:border-[var(--accent)] transition-all flex items-center gap-2">
                    <FaExternalLinkAlt size={16} />
                    <span>Live Demo</span>
                  </a> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

