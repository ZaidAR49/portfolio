import { userInfo } from "../data/about-data";
import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

export const Experience = () => {
  return (
    <section id="experience" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--accent)] font-bold tracking-wider uppercase mb-4 text-sm md:text-base"
          >
            My Journey
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Experience & Education
          </motion.h3>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-[var(--text-secondary)]/20" />

          <div className="flex flex-col gap-24">
            {userInfo.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-10 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-9px] md:left-1/2 transform md:-translate-x-1/2 top-0 w-6 h-6 rounded-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent)] z-10 mt-10" />

                {/* Content */}
                <div className="md:w-1/2 px-0 md:px-20">
                  <div className="glass-panel p-12 rounded-[2rem] hover:border-[var(--accent)]/50 transition-colors duration-300 group">
                    <div className="flex items-center gap-5 mb-8 text-[var(--accent)]">
                      {exp.role.toLowerCase().includes("student") || exp.role.toLowerCase().includes("degree") ? (
                        <FaGraduationCap size={32} />
                      ) : (
                        <FaBriefcase size={32} />
                      )}
                      <span className="text-lg font-bold tracking-wider uppercase">
                        {exp.peroid}
                      </span>
                    </div>

                    <h4 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent)] transition-colors">
                      {exp.role}
                    </h4>
                    
                    {exp.companey && (
                      <div className="text-xl text-[var(--text-secondary)] font-medium mb-8">
                        {exp.companey}
                      </div>
                    )}

                    <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
                
                {/* Empty Space for Timeline Alignment */}
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

