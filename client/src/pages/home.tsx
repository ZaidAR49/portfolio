
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/hero";
 import { Projects } from "../components/projects";
import { About } from "../components/about-section";

export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo === "projects") {
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  return (
  <>
  <Hero/>
<Projects/>
<About page="home"/>

  </>
  );
};