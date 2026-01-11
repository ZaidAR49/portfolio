import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCode, FaSearch } from "react-icons/fa";
import { SectionHeader, ConfirmDialog } from "./dashboard-shared";
import { getIconForTechnology, availableTechnologies } from "../../helpers/icon-mapper";
import { getSkills } from "../../data/portfolio-data";
import { toast } from "react-toastify";
import { Loading } from "../loading";
import axios from "axios";

export const SkillsManager = () => {
    const server_url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [skills, setSkills] = useState<{ main: any[], secondary: any[] }>({ main: [], secondary: [] });
    const [isAdding, setIsAdding] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [skillType, setSkillType] = useState<"primary" | "secondary">("primary");
    const [isLoading, setIsLoading] = useState(true);

    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: number | null; name: string }>({
        isOpen: false,
        id: null,
        name: ""
    });

    const filteredTechs = availableTechnologies.filter(tech =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fetchSkills = () => {
        getSkills().then((data) => {
            setSkills(data);
            setIsLoading(false);
        }).catch((error) => {
            console.error("Error fetching skills:", error);
            if (error.response && [401, 404, 500].includes(error.response.status)) {
                navigate("/error", { replace: true, state: error.response.status });
            }
            toast.error("Failed to load skills");
        });
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleAdd = async (techName: string) => {
        try {
            const user = await axios.get(`${server_url}/api/user/active`);
            const userId = user.data.id;
            console.log("user id", userId);
            const newSkill = {
                name: techName,
                type: skillType,
                user_id: userId
            };

            const response = await axios.post(`${server_url}/api/skill/add`, newSkill);

            if (response.status === 200 || response.status === 201) {
                toast.success(`${techName} added successfully`);
                setIsAdding(false);
                setSearchQuery("");
                fetchSkills(); // Re-fetch to sync state
            }
        } catch (error: any) {
            console.error("Error adding skill:", error);
            if (error.response && [401, 404, 500].includes(error.response.status)) {
                navigate("/error", { replace: true, state: error.response.status });
            }
            const errorMessage = error.response?.data?.error || "Failed to add skill";
            toast.error(errorMessage);
        }
    };

    const handleDeleteClick = (skill: any) => {
        setDeleteConfirm({
            isOpen: true,
            id: skill.id,
            name: skill.name
        });
    };

    const handleConfirmDelete = async () => {
        if (!deleteConfirm.id) return;

        try {
            await axios.delete(`${server_url}/api/skill/delete/${deleteConfirm.id}`);
            toast.success("Skill deleted");
            fetchSkills(); // Re-fetch to sync state
        } catch (error: any) {
            console.error("Error deleting skill:", error);
            if (error.response && [401, 404, 500].includes(error.response.status)) {
                navigate("/error", { replace: true, state: error.response.status });
            }
            toast.error("Failed to delete skill from server");
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="relative">
            <SectionHeader
                title="Skills & Technologies"
                desc="Manage your technical arsenal"
                onAdd={() => setIsAdding(true)}
            />

            {/* Add New Skill Modal/Overlay */}
            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={(e) => { if (e.target === e.currentTarget) setIsAdding(false); }}
                    >
                        <div className="bg-[var(--bg-secondary)] border border-[var(--text-secondary)]/20 p-6 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold font-display">Add New Skill</h3>
                                <button onClick={() => setIsAdding(false)} className="text-[var(--text-secondary)] hover:text-red-400 transition-colors">
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {/* Search */}
                            <div className="relative mb-6">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                                <input
                                    type="text"
                                    placeholder="Search technologies..."
                                    className="w-full bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[var(--accent)] transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            {/* Type Selection */}
                            <div className="flex gap-6 mb-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="skillType"
                                        checked={skillType === "primary"}
                                        onChange={() => setSkillType("primary")}
                                        className="accent-[var(--accent)]"
                                    />
                                    <span className="font-medium">Primary Skill</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="skillType"
                                        checked={skillType === "secondary"}
                                        onChange={() => setSkillType("secondary")}
                                        className="accent-[var(--accent)]"
                                    />
                                    <span className="font-medium">Secondary Skill</span>
                                </label>
                            </div>

                            {/* Results List */}
                            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-2 min-h-[300px]">
                                {filteredTechs.map((tech) => (
                                    <button
                                        key={tech}
                                        onClick={() => handleAdd(tech)}
                                        className="p-3 rounded-lg border border-[var(--text-secondary)]/10 hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all flex flex-col items-center gap-2 group"
                                    >
                                        <div className="text-2xl text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                                            {getIconForTechnology(tech)}
                                        </div>
                                        <span className="text-sm font-medium text-center">{tech}</span>
                                    </button>
                                ))}
                                {filteredTechs.length === 0 && (
                                    <div className="col-span-full flex flex-col items-center justify-center text-[var(--text-secondary)] py-10">
                                        <FaCode size={40} className="mb-4 opacity-50" />
                                        <p>No technologies found matching "{searchQuery}"</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-12">
                {['main', 'secondary'].map((key) => (
                    <div key={key}>
                        <div className="flex items-center gap-4 mb-6">
                            <h3 className="text-xl font-bold capitalize">{key === 'main' ? 'Primary' : 'Secondary'} Skills</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {(skills as any)[key]?.map((skill: any, i: number) => (
                                <motion.div
                                    layout
                                    key={skill.id || i}
                                    className="p-4 rounded-xl glass-panel flex flex-col items-center gap-3 border border-[var(--text-secondary)]/10 relative group hover:border-[var(--accent)]/50 transition-colors hover:shadow-lg"
                                >
                                    <button
                                        onClick={() => handleDeleteClick(skill)}
                                        className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white/5 rounded-full hover:bg-white/10"
                                    >
                                        <FaTimes size={10} />
                                    </button>
                                    <div className="text-3xl text-[var(--accent)]">
                                        {/* Use mapper if available, otherwise fallback to stored icon or code icon */}
                                        {getIconForTechnology(skill.name)}
                                    </div>
                                    <span className="font-medium text-sm text-center">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ ...deleteConfirm, isOpen: false })}
                onConfirm={handleConfirmDelete}
                title="Delete Skill?"
                message={`Are you sure you want to delete ${deleteConfirm.name}? This action cannot be undone.`}
                confirmText="Delete Skill"
            />
        </div>
    );
};
