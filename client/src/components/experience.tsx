import { userInfo } from "../data/about-data";
import { motion } from "framer-motion";

export const Experience = () => {
  return (
    <>
      <div className="flex flex-col p-4 sm:py-6 lg:py-10 my-16 sm:my-24 lg:my-32 ">
        <div className="p-10 sm:px-32 max-w-5xl">
          <div className="header-primary text-3xl sm:text-4xl lg:text-6xl mb-4">My Experience</div>
          <p className="text-base sm:text-lg lg:text-xl mt-10">A summary of my professional and academic journey so far.</p>
        </div>
        <div className="flex flex-col gap-10 mt-8 sm:mt-12 lg:mt-16">
          {userInfo.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: index * 0.15, ease: "easeOut" }}
              className="exprerience-card"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                <div className="header-secondary text-2xl sm:text-3xl lg:text-4xl  ">{exp.role}</div>
                
                <div className="text-sm sm:text-base text-primary font-semibold uppercase">{exp.peroid}</div>
              </div>
              {exp.companey && (
                <div className="text-base sm:text-lg text-cyan-300 font-medium mb-2">{exp.companey}</div>
              )}
              <div className="text-base sm:text-lg lg:text-xl text-primary whitespace-pre-line">{exp.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full h-px background-oopposit opacity-30"></div>
      <div className="flex flex-col p-4 sm:p-6 lg:p-10 mt-10 gap-10 mb-12"></div>
    </>
  );
};
