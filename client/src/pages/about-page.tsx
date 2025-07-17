
import { useLocation } from "react-router-dom";
import { useEffect } from "react"
import {About as Aboutpreview} from "../components/about-section";
import { Capabilities } from "../components/Capabilities";
import { Experience } from "../components/experience";
export const About = () => {
const location = useLocation();
    useEffect(() => {
          if (location.state && location.state.scrollTo === "main"){
        const el = document.getElementById("mainAbout");
        
        if (el) {
            window.scrollTo({top:0, behavior: "smooth" });
        }
    }
    }, [location.state]);
    return(<> 
    
        <div id="mainAbout" className="">
<Aboutpreview page = "about"/>

<Capabilities/>

<Experience/>
           </div>
    </>)
}