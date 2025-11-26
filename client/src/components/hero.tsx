import { userInfo } from "../data/about-data";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      {/* Modern Background Grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent)]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-sm font-semibold"
              >
                {userInfo.role}
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-[var(--text-primary)]">Hello, I'm</span>
                <span className="block text-gradient mt-2">{userInfo.name}</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-[var(--text-secondary)] max-w-xl leading-relaxed">
                {userInfo.descHero}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                  onClick={() => {
                    document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get In Touch
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg font-semibold text-[var(--text-primary)] border-2 border-[var(--accent)]/50 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all duration-300"
                  onClick={() => {
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Work
                </motion.button>
              </div>
            </motion.div>

            {/* Image Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Decorative gradient rings */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--accent)]/30 via-purple-500/20 to-transparent blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden border-2 border-[var(--accent)]/20 shadow-2xl">
                  <img
                    className="w-full h-auto object-cover"
                    src={userInfo.picture}
                    alt={userInfo.name}
                    draggable="false"
                  />
                </div>
                {/* Floating accent elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--accent)]/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl" />
              </div>
            </motion.div>
          </div>

          {/* Tech Stack - Modern Horizontal Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-24 pt-12 border-t border-[var(--bg-tertiary)]"
          >
            <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-6 text-center">
              Technologies I Work With
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {userInfo.techIcons.map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="text-4xl md:text-5xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                    {tech.icon}
                  </div>
                  <span className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[var(--text-secondary)] cursor-pointer"
          onClick={() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FaArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

