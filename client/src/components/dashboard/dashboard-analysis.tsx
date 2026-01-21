import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaUsers, FaCode, FaProjectDiagram, FaBriefcase } from "react-icons/fa";
import { getExperiences, getProjects, getSkills, getUser } from "../../data/portfolio-data";
import axios from "axios";

export const AnalysisDashboard = () => {
    const [data, setData] = useState({
        user: {},
        skills: {},
        projects: {},
        experiences: {}
    });
    const [stats, setStats] = useState({
        portfolios: 0,
        skills: 0,
        projects: 0,
        experiences: 0
    });
    useEffect(() => {
        console.log("data:", data);
        const downloadData = () => {
            // Only download if we have actual data (checking user object as a proxy)
            if (Object.keys(data.user).length > 0) {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
                const downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href", dataStr);
                downloadAnchorNode.setAttribute("download", "portfolio_data.json");
                document.body.appendChild(downloadAnchorNode); // required for firefox
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
            }
        }
        downloadData()
    }, [data]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch all counts in parallel
                const [usersRes, skillsRes, projectsRes, experiencesRes] = await Promise.all([
                    axios.get("http://localhost:3000/api/user/count"),
                    axios.get("http://localhost:3000/api/skill/count"),
                    axios.get("http://localhost:3000/api/project/count"),
                    axios.get("http://localhost:3000/api/experience/count")
                ]);

                setStats({
                    portfolios: usersRes.data || 0,
                    skills: skillsRes.data || 0,
                    projects: projectsRes.data || 0,
                    experiences: experiencesRes.data || 0
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };

        fetchStats();
    }, []);
    const handleDownloadData = async () => {
        try {
            setData({
                user: await getUser(),
                skills: await getSkills(),
                projects: await getProjects(),
                experiences: await getExperiences()
            })
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        }


    };

    const statCards = [
        {
            label: "Total Portfolios",
            value: stats.portfolios,
            color: "text-emerald-400",
            icon: <FaUsers className="mb-2 text-2xl" />
        },
        {
            label: "Total Skills",
            value: stats.skills,
            color: "text-blue-400",
            icon: <FaCode className="mb-2 text-2xl" />
        },
        {
            label: "Total Projects",
            value: stats.projects,
            color: "text-purple-400",
            icon: <FaProjectDiagram className="mb-2 text-2xl" />
        },
        {
            label: "Total Experiences",
            value: stats.experiences,
            color: "text-pink-400",
            icon: <FaBriefcase className="mb-2 text-2xl" />
        },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <div key={i} className="glass-panel p-6 rounded-2xl border border-[var(--text-secondary)]/10 bg-[var(--bg-secondary)]/30 hover:bg-[var(--bg-secondary)]/50 transition-all group cursor-pointer hover:-translate-y-1">
                        <div className={`transition-colors duration-300 ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <h3 className="text-[var(--text-secondary)] text-sm uppercase tracking-wider mb-2">{stat.label}</h3>
                        <div className="flex items-end justify-between">
                            <span className="text-3xl font-bold text-[var(--text-primary)]">{stat.value}</span>
                        </div>
                        <div className="w-full bg-white/5 h-1 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "70%" }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className={`h-full bg-current opacity-50 ${stat.color.replace('text', 'bg')}`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Export Data Area */}
            <div className="glass-panel p-6 lg:p-10 rounded-3xl border border-[var(--text-secondary)]/10 bg-[var(--bg-secondary)]/20 flex flex-col items-center justify-center text-center">
                <div className="max-w-md space-y-6">
                    <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto text-[var(--accent)] text-2xl">
                        <FaChartLine />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Export User Data</h3>
                        <p className="text-[var(--text-secondary)]">Download all your active portfolio data including skills, projects, and experiences in JSON format.</p>
                    </div>
                    <button
                        className="px-8 py-3 rounded-xl bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-all flex items-center gap-2 mx-auto"
                        onClick={() => { handleDownloadData() }}
                    >
                        <span>Download Data</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
