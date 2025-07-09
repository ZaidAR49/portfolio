import React from "react";
//import { useState } from "react";
import { FaHome, FaUser, FaEnvelope,FaProjectDiagram} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const routes = [{
    name: "Home",
    icon: <FaHome/>,
    path: ""
    },


{
    name:"Projects",
    icon: <FaProjectDiagram/>,
    path: "projects"},
    {
    name: "About",
    icon: <FaUser/>,
    path: "about"
},
    {
    name:"contact",
    icon: <FaEnvelope/>,
    path: "contact"
},
];
  return (
    <>
      <div className=" text-white p-4 flex flex-row  items-center justify-between">
        <div>
          <img className="rounded-full w-16 h-16 " src="/logo.png" alt="" />
        </div>
    <div className="flex flex-row gap-16 items-center p-3">
        {routes.map((route) => {
        return(
        <div className=" hover:text-cyan-500 active:scale-95 cursor-pointer hover:scale-110" key= {route.path} onClick={()=>{navigate("/"+route.path)}}> <div className="flex flex-row gap-2 items-center">{route.icon}{route.name}</div></div>
        
        );
    })}
    </div>
      </div>
     
    </>
  );
};
