import { FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Project {
  state: "completed" | "in progress" | "Suspend" | string;
  title: string;
  description: string;
  images: string[];
  role: string;
  github_url: string;
  year: number;
  technologies: string;
  client: string;
  sort_order: number;
  id: number;
  user_id: number;
}

export const Projects = ({ projects }: { projects: Project[] }) => {
  projects.sort((a, b) => a.sort_order - b.sort_order);

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
              <ProjectCarousel project={project} />

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
                  <div >
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Technologies</span>
                      <span className="font-semibold text-[var(--accent)]">{project.technologies}</span></div>
                  </div>
                  <div >
                    <span className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Client</span>
                    <span className="font-semibold text-[var(--text-primary)]">{project.client}</span>
                  </div>

                </div>

                <div className="flex gap-4 mt-2">
                  <a
                    href={project.github_url}
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

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0
  })
};

const ProjectCarousel = ({ project }: { project: Project }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we want infinite paging
  const imageIndex = Math.abs(page % project.images.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="w-full lg:w-1/2 relative group">
      {/* Animated Border */}
      <div className="absolute -inset-1 rounded-2xl overflow-hidden z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-[150%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,var(--accent)_90deg,transparent_180deg,var(--accent)_270deg,transparent_360deg)] absolute top-[-25%] left-0 right-0 mx-auto opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--bg-secondary)] aspect-video bg-[var(--bg-secondary)] z-10">
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md z-10 ${stateColor(project.state)}`}>
          {project.state}
        </div>

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={page}
            src={project.images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full object-cover cursor-grab active:cursor-grabbing"
            alt={project.title}
          />
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity duration-300 z-10 pointer-events-none">
          <button
            onClick={(e) => { e.stopPropagation(); paginate(-1); }}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-[var(--accent)] transition-colors backdrop-blur-sm pointer-events-auto"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); paginate(1); }}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-[var(--accent)] transition-colors backdrop-blur-sm pointer-events-auto"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {project.images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setPage([page + (index - imageIndex), index > imageIndex ? 1 : -1]);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === imageIndex
                ? "bg-[var(--accent)] w-6"
                : "bg-gray-500/50 hover:bg-white/80"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

