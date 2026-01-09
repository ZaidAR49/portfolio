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
import { Tab } from "../components/dashboard/dashboard-shared";
import { AnalysisDashboard } from "../components/dashboard/dashboard-analysis";
import { PortfolioManager } from "../components/dashboard/dashboard-portfolios";
import { ExperienceManager } from "../components/dashboard/dashboard-experience";
import { ProjectsManager } from "../components/dashboard/dashboard-projects";
import { SkillsManager } from "../components/dashboard/dashboard-skills";

export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("analysis");

    const renderContent = () => {
        switch (activeTab) {
            case "analysis":
                return <AnalysisDashboard />;
            case "portfolios":
                return <PortfolioManager />;
            case "experience":
                return <ExperienceManager />;
            case "projects":
                return <ProjectsManager />;
            case "skills":
                return <SkillsManager />;
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
                    <Tab active={activeTab === "portfolios"} onClick={() => setActiveTab("portfolios")} icon={<FaUserEdit />} label="Portfolios" />
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
