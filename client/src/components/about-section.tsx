import {userInfo} from "../data/about-data";
import { useNavigate } from "react-router-dom";
import { ButtonsSocial } from "./buttons-social";

export const About= ({page} :{page:string}) => {
   const navigate = useNavigate();
 return(
    <>
     <div className="flex lg:p-32 justify-between  flex-col gap-10 lg:gap-0 lg:flex-row my-16 sm:my-24 lg:mt-32 p-10">
        <div className="header-primary text-3xl sm:text-4xl lg:text-6xl">About</div>
        <div className="flex flex-col gap-3 max-w-3xl">
<div className="header-tertiary text-xl sm:text-2xl ">{userInfo.titleAbout} </div>
<p className={`break-words text-base sm:text-lg lg:text-xl ${page==="home" && "line-clamp-4"}`}>{userInfo.descAbout}</p>
{ page === "about" ? 
<div className="flex flex-col md:flex-row gap-10 xl:gap-20 py-10 "> <a href={userInfo.resuma} className="btn-primary"> download My resume</a> <ButtonsSocial len={2}/>  </div>:
<div className="text-as-link mt-6 lg:mt-10" onClick={()=>{navigate("/about",{state: {scrollTo:"main"}})}}>More about me</div>
}
        </div>
        
         </div>
         <div className={`w-full h-px bg-white opacity-30`}></div>
            <div className="flex flex-col p-4 sm:p-6 lg:p-10 mt-10 gap-10 mb-12"></div>

         </>
    );
  


};