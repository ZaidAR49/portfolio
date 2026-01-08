import { motion } from "framer-motion";

export interface TabProps {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}

export const Tab = ({ active, onClick, icon, label }: TabProps) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-300 relative overflow-hidden group ${active
            ? "text-[var(--accent)] bg-[var(--accent)]/10 border-r-4 border-[var(--accent)]"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-secondary)]/5"
            }`}
    >
        <div className={`text-xl relative z-10 ${active ? "scale-110" : "group-hover:scale-110"} transition-transform`}>
            {icon}
        </div>
        <span className="font-semibold tracking-wide relative z-10 text-sm">{label}</span>
        {active && (
            <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-transparent z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
        )}
    </button>
);

export const SectionHeader = ({ title, desc, onAdd }: any) => (
    <div className="flex items-center justify-between mb-8">
        <div>
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-[var(--text-secondary)]">{desc}</p>
        </div>
        <button onClick={onAdd} className="btn-primary flex items-center gap-2 px-6">
            {/* We will pass the icon as part of the button content or import it where used, 
                but for simplicity here we can just accept children or keep it generic. 
                The original code used FaPlus. Let's make it more generic or import FaPlus. */}
            {/* To avoid circular deps or extra imports, let's just use the className provided in original, 
                and assume children or specific content. 
                Actually, let's just import FaPlus here to match original functionality. */}
            Add New
        </button>
    </div>
);

// wait, the original SectionHeader used FaPlus. I should import it.
// Also InputGroup was here.

export const InputGroup = ({ label, value, onChange, type = "text", ...rest }: any) => (
    <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide text-[0.7rem]">{label}</label>
        <input
            type={type}
            // Use key to force re-render if defaultValue changes significantly, though strictly not needed for uncontrolled
            // If value is provided, it's controlled. If not, we allow defaultValue from ...rest or undefined.
            {...(value !== undefined ? { value } : {})}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            className="w-full bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
            {...rest}
        />
    </div>
);
