
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { About as Aboutpreview } from "../components/about-section";
import { Capabilities } from "../components/Capabilities";
import { Experience } from "../components/experience";
import { getUser, getExperiences, getSkills } from "../data/portfolio-data";
import { Loading } from "../components/loading";
import { toast } from "react-toastify";
import { getFromCache } from "../helpers/storage-helper";
export const About = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [experiences, setExperiences] = useState<any[]>([]);
    const [skills, setSkills] = useState<{ main: any[], secondary: any[] }>({ main: [], secondary: [] });

    useEffect(() => {
        const load = async () => {
            try {
                const user = getFromCache("user");
                const experiences = getFromCache("experiences");
                const skills = getFromCache("skills");
                if (!user || !experiences || !skills) {
                    const [user, experiences, skills] = await Promise.all([
                        getUser(),
                        getExperiences(),
                        getSkills()
                    ]);
                    setUserInfo(user);
                    setExperiences(experiences);
                    setSkills(skills);
                    setIsLoading(false);
                }
                else {
                    setUserInfo(user);
                    setExperiences(experiences);
                    setSkills(skills);
                    setIsLoading(false);
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
            }
            finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);
    useEffect(() => {
        if (location.state && location.state.scrollTo === "main") {
            const el = document.getElementById("mainAbout");

            if (el) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    }, [location.state]);
    return (
        isLoading ? <Loading /> : (
            <>
                <div id="mainAbout" className="">
                    <Aboutpreview page="about" userInfo={userInfo} />

                    <Capabilities skillsData={skills} userInfo={userInfo} />

                    <Experience experiences={experiences} />
                </div>
            </>
        )
    )
}