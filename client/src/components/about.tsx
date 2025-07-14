import {userInfo} from "../data/about";
export const About= () => {
 return(
    <>
     <div className="flex lg:p-32 justify-between  flex-col lg:flex-row my-16 sm:my-24 lg:mt-32 p-10">
        <div className="header-primary text-3xl sm:text-4xl lg:text-6xl">About</div>
        <div className="flex flex-col gap-3 max-w-3xl">
<div className="header-tertiary text-xl sm:text-2xl">{userInfo.titleAbout} </div>
<p className="break-words text-base sm:text-lg lg:text-xl">{userInfo.descAbout}</p>
<div className="text-as-link mt-6 lg:mt-10">More about me</div>
        </div>
        
         </div>
         <div className="w-full h-px bg-white opacity-30"></div>
            <div className="flex flex-col p-4 sm:p-6 lg:p-10 mt-10 gap-10 mb-12"></div>

         </>
    );
  


};