import { FaSave } from "react-icons/fa";
import { InputGroup } from "./dashboard-shared";

export const UserForm = ({ data, setData, onSubmit }: any) => (
    <form onSubmit={onSubmit} className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Profile Information</h2>
                <p className="text-[var(--text-secondary)]">Update your public profile details</p>
            </div>
            <button type="submit" className="btn-primary flex items-center gap-2">
                <FaSave /> Save Changes
            </button>
        </div>

        <div className="glass-panel p-8 rounded-3xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Full Name" value={data.name} onChange={(v: string) => setData({ ...data, name: v })} />
                <InputGroup label="Job Title" value={data.jobTitle} onChange={(v: string) => setData({ ...data, jobTitle: v })} />
                <InputGroup label="Email" value={data.email} onChange={(v: string) => setData({ ...data, email: v })} />
                <InputGroup label="LinkedIn URL" value={data.linkedin} onChange={(v: string) => setData({ ...data, linkedin: v })} />
                <InputGroup label="GitHub URL" value={data.github} onChange={(v: string) => setData({ ...data, github: v })} />
            </div>
            <div className="pt-4 border-t border-[var(--text-secondary)]/10">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wider">About Bio</label>
                <textarea
                    value={typeof data.descAbout === "string" ? data.descAbout : "Complex React Element (Read-only in this demo)"}
                    onChange={(e) => setData({ ...data, descAbout: e.target.value })}
                    className="w-full h-32 bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl p-4 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition-all resize-none"
                />
                <p className="text-xs text-[var(--text-secondary)] mt-2 italic">* Note: Some fields containing React elements are simplified for this demo.</p>
            </div>
        </div>
    </form>
);
