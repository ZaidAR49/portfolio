import { projects } from "../data/projects-data";
import { FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Projects = () => {
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
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-sm font-semibold mb-6"
          >
            Portfolio
          </motion.div>
          <h2 className="section-title mb-6">
            Featured Projects
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
            A collection of projects that showcase my passion for building robust and interactive web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Project Image Carousel */}
                <div className={`relative ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[var(--bg-tertiary)] aspect-video bg-[var(--bg-secondary)] group-hover:border-[var(--accent)]/50 transition-all duration-300">
                    <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-semibold border backdrop-blur-md z-10 ${stateColor(project.state)}`}>
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
                        className="p-3 rounded-lg bg-black/70 text-white hover:bg-[var(--accent)] transition-colors backdrop-blur-sm"
                      >
                        <FaChevronLeft size={18} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleImageChange("next", index); }}
                        className="p-3 rounded-lg bg-black/70 text-white hover:bg-[var(--accent)] transition-colors backdrop-blur-sm"
                      >
                        <FaChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className={`space-y-6 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                      {project.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--bg-tertiary)]">
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Year</span>
                      <span className="font-semibold text-[var(--text-primary)]">{project.year}</span>
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Role</span>
                      <span className="font-semibold text-[var(--text-primary)]">{project.role}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Technologies</span>
                      <span className="font-semibold text-[var(--accent)]">{project.tech}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2"
                    >
                      <FaGithub size={18} />
                      <span>View Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

