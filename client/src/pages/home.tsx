
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Hero } from "../components/hero";
import { Projects } from "../components/projects";
import { About } from "../components/about-section";
import { getSkills, getUser, getProjects } from "../data/portfolio-data";
import { toast } from "react-toastify";
import { Loading } from "../components/loading";
import { getFromCache } from "../helpers/storage-helper";
import { logger } from "../helpers/logger.healper";
export const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [skills, setSkills] = useState<{ main: any[], secondary: any[] }>({ main: [], secondary: [] });
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const user = getFromCache("user");
        const projects = getFromCache("projects");
        const skills = getFromCache("skills");
        if (!user || !projects || !skills) {
          const [user, projects, skills] = await Promise.all([
            getUser(),
            getProjects(),
            getSkills()

          ]);
          logger.log("fetching data");
          setUser(user);
          setProjects(projects);
          setSkills(skills);
        }
        else {
          logger.log("using cache", getFromCache("user"));
          setUser(user);
          setProjects(projects);
          setSkills(skills);
        }

      } catch (error: any) {
        console.error("Error fetching data:", error);
        if (error.response && [401, 404, 500].includes(error.response.status)) {
          navigate("/error", { replace: true, state: error.response.status });
        }
        else {
          navigate("/error", { replace: true, state: 1000 });
        }
        toast.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);
  useEffect(() => {
    logger.log("user", user, "skills", skills, "projects", projects);
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
      {isLoading ? <Loading /> : (
        <>
          <Hero userInfo={user} skillsData={skills} />
          <Projects projects={projects} />
          <About page="home" userInfo={user} />
        </>
      )}
    </>
  );
};