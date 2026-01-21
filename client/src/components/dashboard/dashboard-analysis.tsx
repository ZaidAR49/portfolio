import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaUsers, FaCode, FaProjectDiagram, FaBriefcase } from "react-icons/fa";
import axios from "axios";

export const AnalysisDashboard = () => {
    const [stats, setStats] = useState({
        portfolios: 0,
        skills: 0,
        projects: 0,
        experiences: 0
    });

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

            {/* Fake Chart Area */}
            <div className="glass-panel p-6 lg:p-10 rounded-3xl border border-[var(--text-secondary)]/10 bg-[var(--bg-secondary)]/20">
                <h3 className="text-xl font-semibold mb-8 flex items-center gap-3">
                    <FaChartLine className="text-[var(--accent)]" />
                    Performance Analytics
                </h3>
                <div className="h-64 md:h-80 w-full flex items-end gap-2 md:gap-4 px-2">
                    {[40, 65, 30, 80, 55, 90, 45, 60, 75, 50, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end group h-full relative">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs">
                                {h * 124} views
                            </div>
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 0.8, delay: i * 0.05 }}
                                className="w-full bg-gradient-to-t from-[var(--accent)]/10 to-[var(--accent)] rounded-t-lg hover:from-[var(--accent)] hover:to-[var(--accent)]/80 transition-all relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30" />
                            </motion.div>
                            <span className="text-xs text-[var(--text-secondary)] text-center mt-2 hidden md:block">
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
