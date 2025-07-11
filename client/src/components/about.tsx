import {userInfo} from "../data/about";
export const About= () => {
 return(
    <>
     <div className="flex flex-row my-32 p-10 gap-80  ">
        <div className="header-primary">About</div>
        <div className="flex flex-col gap-2 max-w-3xl ">
<div className="header-tertiary">{userInfo.titleAbout} </div>
<p className="break-words" >{userInfo.descAbout}</p>
<div className="underline text-cyan-300 uppercase mt-14 ">More about me</div>
        </div>
        
         </div>
         <div className="w-full h-px bg-white opacity-30"></div>
            <div className="flex flex-col p-10 mt-10 gap-10 mb-12 "></div>

         </>
    );
  


};