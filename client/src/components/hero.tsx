
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { getIconForTechnology } from "../helpers/icon-mapper";

export const Hero = ({ userInfo, skillsData }: any) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      {/* Background Elements - Removed in favor of global 3D background */}


      <div className="container mx-auto px-4 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left z-10 lg:ml-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-[var(--accent)] font-bold tracking-wider uppercase mb-4 text-sm md:text-base">
              {userInfo.job_title}
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Hi, I'm <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent)]">
                {userInfo.name}
              </span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {userInfo.hero_description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="btn-primary"
                onClick={() => {
                  document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact Me
              </button>
              <button
                className="px-6 py-3 rounded-full font-semibold text-[var(--text-primary)] border border-[var(--text-secondary)]/30 hover:bg-[var(--bg-secondary)] hover:border-[var(--accent)] transition-all duration-300"
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore My Work
              </button>
            </div>
          </motion.div>
        </div>

        {/* Image Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex-1 relative max-w-md lg:max-w-lg"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto group perspective-1000">
            {/* Backing Glow (Static & Stable) */}
            <div className="absolute inset-4 bg-[var(--accent)] rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />

            {/* Main Card Container */}
            <div className="relative w-full h-full rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/10 shadow-2xl p-3 transition-transform duration-500 group-hover:-translate-y-2">

              {/* Inner Frame */}
              <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/5 relative bg-[var(--bg-primary)]">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={userInfo.picture_url}
                  alt={userInfo.name}
                  draggable="false"
                />

                {/* Professional Overlay Gradient (Subtle at bottom) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent opacity-60" />

                {/* Name/Title Badge (Integrated) */}
                <div className="absolute bottom-6 left-0 right-0 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
                    <span className="text-sm font-semibold tracking-wide text-white">Software Engineer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative 'Trust' Accent - Top Right */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-4 border-r-4 border-[var(--accent)]/30 rounded-tr-3xl" />
            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-4 border-l-4 border-[var(--accent)]/30 rounded-bl-3xl" />
          </div>
        </motion.div>
      </div>

      {/* Tech Stack Marquee */}
      <div className="w-full mt-20 mb-10 relative group">
        {/* Animated Border - Top & Bottom only */}
        <div
          className="absolute -inset-y-[1px] inset-x-0 z-0 pointer-events-none"
          style={{
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            padding: '2px 0'
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,var(--accent)_90deg,transparent_180deg,var(--accent)_270deg,transparent_360deg)] opacity-60 group-hover:opacity-100 transition-opacity duration-500 scale-[2] origin-center"
          />
        </div>

        <div className="w-full overflow-hidden py-8 bg-[var(--bg-secondary)]/30 backdrop-blur-sm relative z-10">
          <div className="relative w-full flex overflow-x-hidden">
            <div className="animate-marquee hover-pause whitespace-nowrap flex items-center gap-16 px-8">
              {/* Double the list for seamless loop */}
              {[...skillsData.main, ...skillsData.main, ...skillsData.main].map((tech, index) => (
                <div key={index} className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-3xl sm:text-4xl text-[var(--text-primary)]">{getIconForTechnology(tech.name)}</span>
                  <span className="text-xs font-medium text-[var(--text-secondary)]">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce text-[var(--text-secondary)]"
      >
        <FaArrowDown size={20} />
      </motion.div>
    </section>
  );
};

