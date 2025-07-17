import { userInfo } from "../data/about-data";
import { ButtonsSocial } from "./buttons-social";
export const Footer = () => {

    return(
    <>
    <div id="footer" className="flex flex-col lg:flex-row justify-between mt-4 sm:mt-24 lg:mt-16 pb-24 p-10 lg:p-6 lg:px-32 relative" >
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-7 ">
            <div className="header-primary text-3xl sm:text-4xl lg:text-6xl">Let's contact</div>
            <p className="text-base sm:text-lg lg:text-xl"> say hello at <a href={`mailto:${userInfo.email}`} className="text-as-link">{userInfo.email}</a> for more info here my <a href={userInfo.resuma} className="text-as-link">resuma</a> </p>
          <div className="my-6 sm:my-8 lg:my-10"><ButtonsSocial len={5}/></div>
        <div className="text-sm sm:text-base lg:text-lg absolute bottom-5 ">© {new Date().getFullYear()} {userInfo.name}</div>
            </div>
      <form className="flex flex-col gap-4 sm:gap-6 lg:gap-7 text-xl mt-5 md:mt-0 ">
        <label htmlFor="name">name</label>
        <input type="text" id="name" className="input-primary" placeholder="Your Name" />
        <label htmlFor="email">email</label>
        <input type="email" id="email" className="input-primary" placeholder=" Your Email" />
        <label htmlFor="subject"> Subject</label>
        <input type="text" id="subject" className="input-primary" placeholder="Subject" />
        <label htmlFor="message">message</label>
        <textarea id="message" className="input-primary" placeholder="Your Message"></textarea>
        <button className="btn-primary w-fit">Send</button>

        
      </form>
        
    </div>
    </>
        
    );
}