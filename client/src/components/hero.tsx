import { userInfo,skillsData } from "../data/data";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[var(--accent)]/10 blur-[100px] animate-breathing" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px] animate-breathing" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-[var(--accent)] font-bold tracking-wider uppercase mb-4 text-sm md:text-base">
              {userInfo.jobTitle}
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Hi, I'm <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent)]">
                {userInfo.name}
              </span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {userInfo.descHero}
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
                View Projects
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
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--accent)] to-purple-500 opacity-20 blur-2xl animate-pulse" />
            <img
              className="relative w-full h-full object-cover rounded-3xl shadow-2xl border-2 border-[var(--bg-secondary)] rotate-3 hover:rotate-0 transition-transform duration-500"
              src={userInfo.picture}
              alt={userInfo.name}
              draggable="false"
            />
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
                  <span className="text-3xl sm:text-4xl text-[var(--text-primary)]">{tech.icon}</span>
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

