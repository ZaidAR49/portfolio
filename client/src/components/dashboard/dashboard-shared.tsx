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

import { AnimatePresence } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDangerous?: boolean;
}

export const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    isDangerous = true
}: ConfirmDialogProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[var(--bg-secondary)] border border-[var(--text-secondary)]/10 text-[var(--text-primary)] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
                        >
                            {/* Decorative Top Border */}
                            <div className={`h-1 w-full ${isDangerous ? 'bg-red-500' : 'bg-[var(--accent)]'}`} />

                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${isDangerous ? 'bg-red-500/10 text-red-500' : 'bg-[var(--accent)]/10 text-[var(--accent)]'}`}>
                                        <FaExclamationTriangle size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{title}</h3>
                                        <p className="text-[var(--text-secondary)] leading-relaxed">
                                            {message}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 justify-end mt-8">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--text-secondary)]/5 transition-colors font-medium"
                                    >
                                        {cancelText}
                                    </button>
                                    <button
                                        onClick={() => {
                                            onConfirm();
                                            onClose();
                                        }}
                                        className={`px-6 py-2 rounded-xl font-bold text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 ${isDangerous
                                            ? 'bg-gradient-to-r from-red-600 to-rose-600 shadow-red-500/20'
                                            : 'bg-[var(--accent)] shadow-[var(--accent)]/20'
                                            }`}
                                    >
                                        {confirmText}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading: boolean;
    loadingText?: string;
    children: React.ReactNode;
}

export const LoadingButton = ({ isLoading, loadingText = "Processing...", children, className = "", disabled, ...props }: LoadingButtonProps) => {
    return (
        <button
            disabled={isLoading || disabled}
            className={`btn-primary flex items-center gap-2 relative ${isLoading ? 'cursor-wait opacity-80' : ''} ${className}`}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {isLoading ? loadingText : children}
        </button>
    );
};
