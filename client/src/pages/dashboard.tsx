import { useState } from "react";
import { motion } from "framer-motion";
import {
    FaChartLine,
    FaUserEdit,
    FaBriefcase,
    FaProjectDiagram,
    FaCode
} from "react-icons/fa";

// Import new modular components
import { Tab } from "../components/dashboard-shared";
import { AnalysisDashboard } from "../components/dashboard-analysis";
import { UserInfo } from "../components/dashboard-user-info";
import { ExperienceManager } from "../components/dashboard-experience";
import { ProjectsManager } from "../components/dashboard-projects";
import { SkillsManager } from "../components/dashboard-skills";

// Import data
import { experience as initialExperience } from "../data/about-data";
import { projects as initialProjects } from "../data/projects-data";
import { skillsData } from "../data/about-data";

export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("analysis");

    // Local state for forms

    const [expList, setExpList] = useState(initialExperience);
    const [projList, setProjList] = useState(initialProjects);
    const [skills, setSkills] = useState(skillsData);

    // Edit states
    const [isEditingExp, setIsEditingExp] = useState<number | null>(null);
    const [isAddingExp, setIsAddingExp] = useState(false);
    const [isEditingProj, setIsEditingProj] = useState<number | null>(null);
    const [isAddingProj, setIsAddingProj] = useState(false);

    // --- Handlers (Mock logic) ---
    const handleUserUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        alert("User Info Updated (Session Only)");
    };

    const handleExpSave = (index: number | null, data: any) => {
        if (index !== null) {
            const newList = [...expList];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            newList[index] = data;
            setExpList(newList);
            setIsEditingExp(null);
        } else {
            setExpList([data, ...expList]);
            setIsAddingExp(false);
        }
    };

    const handleProjSave = (index: number | null, data: any) => {
        if (index !== null) {
            const newList = [...projList];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            newList[index] = data;
            setProjList(newList);
            setIsEditingProj(null);
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setProjList([{ ...data, image: [], order: projList.length + 1 }, ...projList]);
            setIsAddingProj(false);
        }
    };

    const handleDelete = (type: 'exp' | 'proj', index: number) => {
        if (confirm("Are you sure?")) {
            if (type === 'exp') {
                setExpList(expList.filter((_, i) => i !== index));
            } else {
                setProjList(projList.filter((_, i) => i !== index));
            }
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "analysis":
                return <AnalysisDashboard />;
            case "user":
                return <UserInfo />;
            case "experience":
                return <ExperienceManager
                    list={expList}
                    onEdit={(i: number) => setIsEditingExp(i)}
                    onDelete={(i: number) => handleDelete('exp', i)}
                    onAdd={() => setIsAddingExp(true)}
                    editIndex={isEditingExp}
                    isAdding={isAddingExp}
                    onCancel={() => { setIsEditingExp(null); setIsAddingExp(false); }}
                    onSave={handleExpSave}
                />;
            case "projects":
                return <ProjectsManager
                    list={projList}
                    onEdit={(i: number) => setIsEditingProj(i)}
                    onDelete={(i: number) => handleDelete('proj', i)}
                    onAdd={() => setIsAddingProj(true)}
                    editIndex={isEditingProj}
                    isAdding={isAddingProj}
                    onCancel={() => { setIsEditingProj(null); setIsAddingProj(false); }}
                    onSave={handleProjSave}
                />;
            case "skills":
                return <SkillsManager skills={skills} setSkills={setSkills} />;
            default:
                return <AnalysisDashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex pt-20">
            {/* Sidebar */}
            <aside className="w-20 lg:w-64 fixed h-full bg-[var(--bg-secondary)]/50 backdrop-blur-xl border-r border-[var(--text-secondary)]/10 z-20 flex flex-col pt-8 transition-all duration-300">
                <div className="px-6 mb-8 hidden lg:block">
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">Admin Panel</h2>
                    <p className="text-xs text-[var(--text-secondary)]">Manage your portfolio</p>
                </div>

                <nav className="flex-1 flex flex-col gap-2">
                    <Tab active={activeTab === "analysis"} onClick={() => setActiveTab("analysis")} icon={<FaChartLine />} label="Analysis" />
                    <Tab active={activeTab === "user"} onClick={() => setActiveTab("user")} icon={<FaUserEdit />} label="User Info" />
                    <Tab active={activeTab === "experience"} onClick={() => setActiveTab("experience")} icon={<FaBriefcase />} label="Experience" />
                    <Tab active={activeTab === "projects"} onClick={() => setActiveTab("projects")} icon={<FaProjectDiagram />} label="Projects" />
                    <Tab active={activeTab === "skills"} onClick={() => setActiveTab("skills")} icon={<FaCode />} label="Skills" />
                </nav>

                <div className="p-4 mt-auto">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-transparent border border-[var(--accent)]/20">
                        <p className="text-xs text-[var(--text-secondary)] mb-2">Storage Status (Demo)</p>
                        <div className="w-full bg-black/30 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-[var(--accent)] h-full w-[45%]" />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-20 lg:ml-64 p-4 lg:p-8 overflow-y-auto h-[calc(100vh-80px)]">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-6xl mx-auto"
                >
                    {renderContent()}
                </motion.div>
            </main>
        </div>
    );
};

export default Dashboard;
