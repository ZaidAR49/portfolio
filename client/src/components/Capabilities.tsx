import { userInfo,skillsData } from "../data/about-data";
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
    <section id="capabilities" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--accent)] font-bold tracking-wider uppercase mb-4 text-sm md:text-base"
          >
            My Skills
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Capabilities
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] text-lg leading-relaxed"
          >
            {userInfo.descCapabilities}
          </motion.p>
        </div>

        <div className="flex flex-col gap-16">
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
              {skillsData.main.map((tech, index) => (
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
          {skillsData.Secondary && skillsData.Secondary.length > 0 && (
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
                {skillsData.Secondary.map((item, index) => (
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