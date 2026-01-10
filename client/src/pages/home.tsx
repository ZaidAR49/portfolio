
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/hero";
import { Projects } from "../components/projects";
import { About } from "../components/about-section";
import { getSkills, getUser, getProjects } from "../data/portfolio-data";
import { toast } from "react-toastify";
export const Home = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [skills, setSkills] = useState<{ main: any[], secondary: any[] }>({ main: [], secondary: [] });
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [user, projects, skills] = await Promise.all([
          getUser(),
          getProjects(),
          getSkills()
        ]);
        setUser(user);
        setProjects(projects);
        setSkills(skills);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);
  useEffect(() => {
    console.log("user", user, "skills", skills, "projects", projects);
  }, [user, skills, projects]);


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
      {isLoading ? <div>Loading...</div> : (
        <>
          <Hero userInfo={user} skillsData={skills} />
          <Projects projects={projects} />
          <About page="home" userInfo={user} />
        </>
      )}
    </>
  );
};