
import { userInfo } from "../data/about-data";
import { ButtonsSocial } from "./buttons-social";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Footer = () => {
const server_host_url="https://portfolio-wqai.onrender.com";
const server_local_url="http://localhost:3000";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
   const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };
    try {
      const response = await axios.post(`${server_host_url}/api/contact`,data);
      console.log(response.data);
      //alert(response.data.message );
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    }

    
  }

    return(
    <>
    <div id="footer" className="flex flex-col lg:flex-row justify-between mt-4 sm:mt-24 lg:mt-16 pb-24 p-10 lg:p-6 lg:px-32 relative" >
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-7 ">
            <div className="header-primary text-3xl sm:text-4xl lg:text-6xl">Let's contact</div>
            <p className="text-base sm:text-lg lg:text-xl"> say hello at <a href={`mailto:${userInfo.email}`} className="text-as-link">{userInfo.email}</a> for more info here my <a href={userInfo.resuma} className="text-as-link">resume</a> </p>
          <div className="my-6 sm:my-8 lg:my-10"><ButtonsSocial len={5}/></div>
        <div className="text-sm sm:text-base lg:text-lg absolute bottom-5 ">© {new Date().getFullYear()} {userInfo.name}</div>
            </div>
      <form className="flex flex-col gap-4 sm:gap-6 lg:gap-7 text-xl mt-5 md:mt-0 " onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name" >Full name</label>
        <input type="text" id="name" name="name" className="input-primary" placeholder="Your Name"  minLength={3} maxLength={50} required/>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" className="input-primary" placeholder=" Your Email" required maxLength={50} />
        <label htmlFor="subject"> Subject</label>
        <input type="text" id="subject" name="subject" className="input-primary" placeholder="Subject"   minLength={3} maxLength={50} required/>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" className="input-primary" placeholder="Your Message"  minLength={2} maxLength={500} required ></textarea>
        <button className="btn-primary w-fit">Send</button>
      </form>
        <ToastContainer position="bottom-right" toastStyle={{fontSize:"14"}} />
    </div>
    </>
        
    );
}