
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react"
import { About as Aboutpreview } from "../components/about-section";
import { Capabilities } from "../components/Capabilities";
import { Experience } from "../components/experience";
import { getUser, getExperiences, getSkills } from "../data/portfolio-data";
import { toast } from "react-toastify";
export const About = () => {
    const location = useLocation();
    const [userInfo, setUserInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [experiences, setExperiences] = useState<any[]>([]);
    const [skills, setSkills] = useState<{ main: any[], secondary: any[] }>({ main: [], secondary: [] });

    useEffect(() => {
        const load = async () => {
            try {
                const [user, experiences, skills] = await Promise.all([
                    getUser(),
                    getExperiences(),
                    getSkills()
                ]);
                setUserInfo(user);
                setExperiences(experiences);
                setSkills(skills);
            } catch (error) {
                console.error("Error fetching data:", error);
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
        isLoading ? <div>Loading...</div> : (
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