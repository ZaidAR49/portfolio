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
    <div className="flex flex-row justify-between mt-32 p-10">
        <div className="flex flex-col gap-7">
            <div className="header-primary">Let's contact</div>
            <p> say hello at <a href={`mailto:${userInfo.email}`} className="text-as-link">{userInfo.email}</a> for more info here my <a href={userInfo.resuma} className="text-as-link">resuma</a> </p>
             <div className="carousel carousel-center rounded-box  opacity-60 my-10 max-w-screen-md gap-7">
            {social.map((item, index) => (
                <a key={index} className="carousel-item text-4xl" href={item.link}>{item.icon}</a>)
            )}
        </div>
        <div className="">© {new Date().getFullYear()}{userInfo.name}</div>
            </div>
      <div>
        
      </div>
        
    </div>
    </>
        
    );
}