import { userInfo } from "../data/about-data";
import { motion } from "framer-motion";

export const Capabilities = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="capabilities" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-sm font-semibold mb-6">
              My Skills
            </div>
            <h2 className="section-title mb-6">Capabilities</h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-3xl">
              {userInfo.descCapabilities}
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          {/* Tech Stack */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 text-[var(--text-primary)] border-l-4 border-[var(--accent)] pl-4"
            >
              Tech Stack
            </motion.h4>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            >
              {userInfo.techIcons.map((tech, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:scale-105 hover:border-[var(--accent)]/50 transition-all duration-300 group cursor-default"
                >
                  <div className="text-4xl text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                    {tech.icon}
                  </div>
                  <span className="font-medium text-[var(--text-primary)] text-center">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Tools & Others */}
          {userInfo.toolsAndOthers && userInfo.toolsAndOthers.length > 0 && (
            <div>
              <motion.h4 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-8 text-[var(--text-primary)] border-l-4 border-[var(--accent)] pl-4"
              >
                Tools & Others
              </motion.h4>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
              >
                {userInfo.toolsAndOthers.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:scale-105 hover:border-[var(--accent)]/50 transition-all duration-300 group cursor-default"
                  >
                    <div className="text-4xl text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className="font-medium text-[var(--text-primary)] text-center">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};