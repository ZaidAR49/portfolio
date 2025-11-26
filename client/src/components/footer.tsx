import { userInfo } from "../data/about-data";
import { ButtonsSocial } from "./buttons-social";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export const Footer = () => {
  const server_host_url =  import.meta.env.VITE_API_URL;
  const server_local_url ="http://localhost:3000";
  const server_url = server_host_url || server_local_url;
  //import.meta.env.VITE_API_URL ||
  useEffect(() => {
    if (server_host_url) {
      console.log("connect to cloud server.");
    } else {
      console.log("connect to local server.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };
    
    e.currentTarget.reset();
    try {
      const response = await axios.post(`${server_url}/api/contact`, data);
      console.log("server:",response.data);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    }
  }

  return (
    <footer id="footer" className="relative pt-24 pb-12 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-[var(--accent)]/10 to-transparent" />
        <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-[-5%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-sm font-semibold mb-6">
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Let's Connect
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">Contact Information</h3>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  Feel free to reach out via email or check out my resume and social profiles.
                </p>
                <div className="space-y-2">
                  <a 
                    href={`mailto:${userInfo.email}`} 
                    className="block text-[var(--accent)] hover:underline decoration-2 underline-offset-4 transition-all text-lg"
                  >
                    {userInfo.email}
                  </a>
                  <a 
                    href={userInfo.resuma} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[var(--accent)] hover:underline decoration-2 underline-offset-4 transition-all"
                  >
                    View Resume
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Social Links</span>
                <ButtonsSocial len={5} />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form className="glass-panel p-8 rounded-xl flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-[var(--text-secondary)]">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="input-primary" 
                      placeholder="John Doe" 
                      minLength={3} 
                      maxLength={50} 
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-[var(--text-secondary)]">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="input-primary" 
                      placeholder="john@example.com" 
                      required 
                      maxLength={50} 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-medium text-[var(--text-secondary)]">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    className="input-primary" 
                    placeholder="Project Inquiry" 
                    minLength={3} 
                    maxLength={50} 
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-[var(--text-secondary)]">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className="input-primary min-h-[150px] resize-none" 
                    placeholder="Tell me about your project..." 
                    minLength={2} 
                    maxLength={500} 
                    required 
                  ></textarea>
                </div>

                <button className="btn-primary w-full flex items-center justify-center gap-2 group">
                  <span>Send Message</span>
                  <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>

          <div className="pt-8 border-t border-[var(--bg-tertiary)] text-center text-[var(--text-secondary)] text-sm">
            <p>© {new Date().getFullYear()} {userInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </footer>
  );
}