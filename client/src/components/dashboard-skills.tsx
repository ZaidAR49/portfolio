import { motion } from "framer-motion";
import { FaPlus, FaTimes, FaCode } from "react-icons/fa";
import { SectionHeader } from "./dashboard-shared";

export const SkillsManager = ({ skills, setSkills }: any) => {
    // Simplified skill addition for demo
    const addSkill = (category: string) => {
        const name = prompt("Enter skill name:");
        if (!name) return;
        const newSkill = { name, icon: <FaCode /> }; // Default icon
        setSkills({
            ...skills,
            [category]: [...skills[category], newSkill]
        });
    };

    const removeSkill = (category: string, index: number) => {
        const newCat = [...skills[category]];
        newCat.splice(index, 1);
        setSkills({ ...skills, [category]: newCat });
    };

    return (
        <div>
            <SectionHeader title="Skills & Technologies" desc="Manage your technical arsenal" onAdd={() => { }} />

            <div className="space-y-12">
                {['main', 'Secondary'].map((key) => (
                    <div key={key}>
                        <div className="flex items-center gap-4 mb-6">
                            <h3 className="text-xl font-bold capitalize">{key} Skills</h3>
                            <button onClick={() => addSkill(key)} className="text-[var(--accent)] hover:underline text-sm flex items-center gap-1">
                                <FaPlus size={12} /> Add One
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {skills[key]?.map((skill: any, i: number) => (
                                <motion.div
                                    layout
                                    key={i}
                                    className="p-4 rounded-xl glass-panel flex flex-col items-center gap-3 border border-[var(--text-secondary)]/10 relative group hover:border-[var(--accent)]/50 transition-colors"
                                >
                                    <button
                                        onClick={() => removeSkill(key, i)}
                                        className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white/5 rounded-full"
                                    >
                                        <FaTimes size={10} />
                                    </button>
                                    <div className="text-3xl text-[var(--accent)]">
                                        {skill.icon || <FaCode />}
                                    </div>
                                    <span className="font-medium text-sm text-center">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
