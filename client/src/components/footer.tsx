import { ButtonsSocial } from "./buttons-social";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { setSecurtKey, enableOwnerMode } from "../helpers/storage-helper";
import { Loading } from "./loading";

export const Footer = ({ userInfo }: any) => {
  const [openSecret, setOpenSecret] = useState<boolean>(false);
  const server_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const checksecuritycode = async () => {
    try {

      const securityCode = document.getElementById("securityCode") as HTMLInputElement;
      setSecurtKey(securityCode.value);
      const res = await axios.post(`${server_url}/api/security/checksecuritycode`, { timeout: 60000 }, { headers: { "security-code": securityCode.value } });
      if (res.status === 200) {
        setOpenSecret(false);
        enableOwnerMode();
        navigate("/");
      } else {
        toast.error("Invalid security code.");
      }

    } catch (error: any) {
      console.error(error);
      if (error.response && [401, 404, 500].includes(error.response.status)) {
        navigate("/error", { replace: true, state: error.response.status });
      }
      toast.error("Failed to check code.");
    }
  }
  const handelsecret = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value === "zaidopendash") {
      setOpenSecret(true);

      try {
        await axios.post(`${server_url}/api/security/sendsecuritycode`, { timeout: 60000 }, { headers: { "security-code": e.target.value } });
        toast.success("Security code sent to your email!");
      } catch (error: any) {
        console.error(error);
        if (error.response && [401, 404, 500].includes(error.response.status)) {
          navigate("/error", { replace: true, state: error.response.status });
        }
        toast.error("Failed to send code.");
      }
    }
  };

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
      // const response = await axios.get(server_url, {
      //   params: data,
      //   timeout: 60000,
      // });
      // If using the backend server
      const response = await axios.post(`${server_url}/api/sendmail/contact`, data, { timeout: 60000 });
      if (response.status === 200 || response.data.status === 200) {
        console.log("server:", response.data);
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      if (error.response && [401, 404, 500].includes(error.response.status)) {
        navigate("/error", { replace: true, state: error.response.status });
      }
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    !userInfo ? <Loading /> :
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
                    href={userInfo.resume_url}
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
                <ButtonsSocial len={5} github_url={userInfo.github_url} linkedin_url={userInfo.linkedin_url} />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 max-w-2xl"
            >
              <div className="relative group">
                {/* Animated Border - Masked to be hollow */}
                <div
                  className="absolute -inset-[3px] rounded-3xl z-0 pointer-events-none"
                  style={{
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '3px'
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,var(--accent)_90deg,transparent_180deg,var(--accent)_270deg,transparent_360deg)] opacity-40 group-hover:opacity-100 transition-opacity duration-500 scale-[2]"
                  />
                </div>

                <form
                  className="glass-panel p-8 rounded-3xl flex flex-col gap-6 relative z-10"
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
                      onChange={(e) => {
                        handelsecret(e)
                      }}
                    ></textarea>
                  </div>

                  <button className="btn-primary w-full flex items-center justify-center gap-2 group">
                    <span>Send Message</span>
                    <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

          <div className="mt-20 pt-8 border-t border-[var(--text-secondary)]/10 text-center text-[var(--text-secondary)] text-sm">
            <p>
              © {new Date().getFullYear()} {userInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
        <ToastContainer position="bottom-right" theme="dark" />

        <AnimatePresence>
          {openSecret && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpenSecret(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[var(--bg-primary)] border border-[var(--accent)]/30 p-8 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden group"
              >
                {/* Decorative gradient blob */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="text-center relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[var(--accent)]/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔒</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">
                    Admin Access
                  </h3>

                  <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                    Welcome back! We've sent a secure code to your email. Please enter it below to access your dashboard.
                  </p>

                  <div className="flex flex-col gap-4">
                    <input
                      id="securityCode"
                      type="password"
                      placeholder="Enter Security Code"
                      className="w-full bg-[var(--bg-secondary)] border border-slate-700/50 rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all placeholder:text-[var(--text-secondary)]/50"
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={() => setOpenSecret(false)}
                        className="flex-1 px-4 py-3 rounded-xl font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => { checksecuritycode() }}
                        className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all shadow-lg hover:shadow-[0_0_15px_var(--accent)] active:scale-95"
                      >
                        Access Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
  );
};
