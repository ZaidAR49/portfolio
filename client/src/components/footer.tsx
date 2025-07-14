import { userInfo } from "../data/about";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
export const Footer = () => {
    const social=[
     { link:"https://github.com/ZaidAR49", icon: <FaGithub />, name: "GitHub"

      },
{
        link: "https://www.linkedin.com/in/zaid-radaideh-5b1a11332", 
        icon: <FaLinkedin />, 
        
}

    
];
    return(
    <>
    <div id="footer" className="flex flex-col lg:flex-row justify-between mt-4 sm:mt-24 lg:mt-16 p-4 sm:p-6 lg:px-32 " >
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-7 relative">
            <div className="header-primary text-3xl sm:text-4xl lg:text-6xl">Let's contact</div>
            <p className="text-base sm:text-lg lg:text-xl"> say hello at <a href={`mailto:${userInfo.email}`} className="text-as-link">{userInfo.email}</a> for more info here my <a href={userInfo.resuma} className="text-as-link">resuma</a> </p>
             <div className="carousel carousel-center rounded-box opacity-60 my-6 sm:my-8 lg:my-10 max-w-screen-md gap-4 sm:gap-6 lg:gap-7">
            {social.map((item, index) => (
                <a key={index} className="carousel-item text-2xl sm:text-3xl lg:text-4xl" href={item.link}>{item.icon}</a>)
            )}
        </div>
        <div className="text-sm sm:text-base lg:text-lg absolute bottom-0 ">© {new Date().getFullYear()}{userInfo.name}</div>
            </div>
      <form className="flex flex-col gap-4 sm:gap-6 lg:gap-7 text-xl ">
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