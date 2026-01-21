import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaUsers, FaCode, FaProjectDiagram, FaBriefcase, FaFileImport } from "react-icons/fa";
import { getExperiences, getProjects, getSkills, getUser } from "../../data/portfolio-data";
import axios from "axios";
import { useContext } from "react";
import { DashbordSecretKeyContext } from "../../contexts/dashbord-secret-key";
import { toast } from "react-toastify";

export const AnalysisDashboard = () => {
    const { secretKey } = useContext(DashbordSecretKeyContext);
    const server_url = import.meta.env.VITE_API_URL;
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
    const storeInBackend = async (dataToStore: any = null) => {
        const finalData = dataToStore || data;
        if (!finalData.user || !finalData.skills || !finalData.projects || !finalData.experiences || !secretKey) {
            toast.error("Data is incomplete");
            return;
        }
        try {

            const userRes = await axios.post(`${server_url}/api/user/add`, finalData.user, {
                headers: {
                    "security-code": secretKey
                }
            });
            const userId = userRes.data[0].id;
            console.log("User added", userId);
            if (!userId) {
                toast.error("Failed to add user");
                return;
            }
            console.log(" final Data to store", finalData);
            await Promise.all([
                axios.post(`${server_url}/api/skill/addMany/${userId}`, finalData.skills, {
                    headers: {
                        "security-code": secretKey
                    }
                }),
                axios.post(`${server_url}/api/project/addMany/${userId}`, finalData.projects, {
                    headers: {
                        "security-code": secretKey
                    }
                }),
                axios.post(`${server_url}/api/experience/addMany/${userId}`, finalData.experiences, {
                    headers: {
                        "security-code": secretKey
                    }
                })
            ])
            toast.success("Data stored in backend");
            console.log("Data stored in backend");
        } catch (error) {
            toast.error("Failed to store data in backend");
            console.error("Error storing data in backend:", error);
        }
    };

    useEffect(() => {
        console.log("data", data);
    }, [data])
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch all counts in parallel
                const [usersRes, skillsRes, projectsRes, experiencesRes] = await Promise.all([
                    axios.get(`${server_url}/api/user/count`),
                    axios.get(`${server_url}/api/skill/count`),
                    axios.get(`${server_url}/api/project/count`),
                    axios.get(`${server_url}/api/experience/count`)
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

    const downloadJSON = (dataToDownload: any) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToDownload, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "portfolio_data.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleDownloadData = async () => {
        try {
            const freshData = {
                user: await getUser(),
                skills: await getSkills(),
                projects: await getProjects(),
                experiences: await getExperiences()
            };
            setData(freshData);
            downloadJSON(freshData);
            toast.success("Data downloaded successfully");
        } catch (error) {

            console.error("Error fetching dashboard stats:", error);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result;
                if (typeof content === 'string') {
                    const parsedData = JSON.parse(content);
                    setData(parsedData);
                    // to BE
                    storeInBackend(parsedData);
                    console.log("Imported data stored in data obj:", parsedData);

                }
            } catch (err) {
                console.error("Error parsing JSON:", err);

            }
        };
        reader.readAsText(file);
        // Reset input so the same file can be selected again if needed
        event.target.value = '';
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

            {/* Import/Export Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                            onClick={handleDownloadData}
                        >
                            <span>Download Data</span>
                        </button>
                    </div>
                </div>

                {/* Import Data Area */}
                <div className="glass-panel p-6 lg:p-10 rounded-3xl border border-[var(--text-secondary)]/10 bg-[var(--bg-secondary)]/20 flex flex-col items-center justify-center text-center">
                    <div className="max-w-md space-y-6">
                        <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto text-[var(--accent)] text-2xl">
                            <FaFileImport />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Import User Data</h3>
                            <p className="text-[var(--text-secondary)]">Upload a previously exported JSON file to load your portfolio data into the dashboard.</p>
                        </div>
                        <label
                            htmlFor="import-file"
                            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:opacity-90 transition-all flex items-center gap-2 mx-36 cursor-pointer"
                        >
                            <span>Upload Data</span>
                        </label>
                        <input
                            id="import-file"
                            type="file"
                            onChange={handleFileChange}
                            accept=".json"
                            className="hidden"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
