import { userInfo } from "../data/about-data";
import { ButtonsSocial } from "./buttons-social";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export const Footer = () => {
  const server_host_url = import.meta.env.VITE_API_URL;
  const server_local_url = "http://localhost:3000";
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
      token: import.meta.env.VITE_TOKEN,
    };

    e.currentTarget.reset();
    try {
      // If using Google Apps Script as backend --free depoloyment
      const response = await axios.get(server_url, {
        params: data,
        timeout: 60000,
      });
      // If using the backend server
      // const response = await axios.post(`${server_url}/api/contact`, data,{timeout:60000});
      if (response.data.status === 200) {
        console.log("server:", response.data);
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <footer id="footer" className="relative pt-20 pb-10 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-[var(--accent)]/5 to-transparent -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col gap-8"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent)]">
                Let's Connect
              </h2>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                Have a project in mind or just want to say hello? <br />
                Email me at{" "}
                <a
                  href={`mailto:${userInfo.email}`}
                  className="text-[var(--accent)] hover:underline decoration-2 underline-offset-4 transition-all"
                >
                  {userInfo.email}
                </a>
                <br />
                or check out my{" "}
                <a
                  href={userInfo.resuma}
                  className="text-[var(--accent)] hover:underline decoration-2 underline-offset-4 transition-all"
                >
                  resume
                </a>
                .
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Socials
              </span>
              <ButtonsSocial len={5} />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 max-w-2xl"
          >
            <form
              className="glass-panel p-8 rounded-3xl flex flex-col gap-6"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-[var(--text-secondary)]"
                  >
                    Full Name
                  </label>
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
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[var(--text-secondary)]"
                  >
                    Email
                  </label>
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
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-[var(--text-secondary)]"
                >
                  Subject
                </label>
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
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-[var(--text-secondary)]"
                >
                  Message
                </label>
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

        <div className="mt-20 pt-8 border-t border-[var(--text-secondary)]/10 text-center text-[var(--text-secondary)] text-sm">
          <p>
            © {new Date().getFullYear()} {userInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </footer>
  );
};
