import {userInfo} from "../data/about-data";
import { useNavigate } from "react-router-dom";
import { ButtonsSocial } from "./buttons-social";
import { motion } from "framer-motion";

export const About= ({page} :{page:string}) => {
   const navigate = useNavigate();
 return(
    <>
     <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-sm font-semibold mb-6">
              About Me
            </div>
            <h2 className="section-title mb-6">About</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                {userInfo.titleAbout}
              </h3>
              <p className={`break-words text-lg leading-relaxed text-[var(--text-secondary)] ${page==="home" && "line-clamp-4"}`}>
                {userInfo.descAbout}
              </p>
              { page === "about" ? 
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a href={userInfo.resuma} className="btn-primary">Download Resume</a>
                  <ButtonsSocial len={2}/>  
                </div>:
                <button className="btn-primary mt-6 w-fit" onClick={()=>{navigate("/about",{state: {scrollTo:"main"}})}}>
                  More About Me
                </button>
              }
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-xl overflow-hidden border border-[var(--bg-tertiary)] shadow-2xl">
                <img
                  src={userInfo.picture}
                  alt={userInfo.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
    </>
    );
};
