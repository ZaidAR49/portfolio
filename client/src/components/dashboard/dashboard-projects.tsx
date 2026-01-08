import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { InputGroup, SectionHeader } from "./dashboard-shared";

export const ProjectsManager = ({ list, onEdit, onDelete, onAdd, editIndex, isAdding, onCancel, onSave }: any) => {
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (editIndex !== null) setFormData(list[editIndex]);
        else if (isAdding) setFormData({ title: '', description: '', tech: '', github: '', client: '', year: '', state: 'completed' });
    }, [editIndex, isAdding, list]);

    if (editIndex !== null || isAdding) {
        return (
            <div className="glass-panel p-8 rounded-3xl animate-in fade-in zoom-in-95">
                <h3 className="text-xl font-bold mb-6">{isAdding ? 'Add Project' : 'Edit Project'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <InputGroup label="Title" value={formData.title} onChange={(v: string) => setFormData({ ...formData, title: v })} />
                    <InputGroup label="Client" value={formData.client} onChange={(v: string) => setFormData({ ...formData, client: v })} />
                    <InputGroup label="Technologies" value={formData.tech} onChange={(v: string) => setFormData({ ...formData, tech: v })} />
                    <InputGroup label="GitHub Link" value={formData.github} onChange={(v: string) => setFormData({ ...formData, github: v })} />
                    <InputGroup label="Year" value={formData.year} onChange={(v: string) => setFormData({ ...formData, year: v })} />
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Status</label>
                        <select
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)] appearance-none"
                        >
                            <option value="completed">Completed</option>
                            <option value="in progress">In Progress</option>
                            <option value="suspended">Suspended</option>
                        </select>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full h-32 bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl p-4 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <button onClick={onCancel} className="px-6 py-2 rounded-xl border border-[var(--text-secondary)]/30 hover:bg-[var(--text-secondary)]/10 text-[var(--text-secondary)]">Cancel</button>
                    <button onClick={() => onSave(editIndex, formData)} className="btn-primary flex items-center gap-2"><FaSave /> Save</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <SectionHeader title="Projects" desc="Showcase your best work" onAdd={onAdd} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {list.map((item: any, i: number) => (
                    <div key={i} className="glass-panel p-6 rounded-2xl group border border-[var(--text-secondary)]/10 hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between h-64 relative overflow-hidden">

                        {/* Background Image Effect */}
                        <div className="absolute inset-0 z-0">
                            {item.image && item.image[0] && (
                                <img src={item.image[0]} alt="" className="w-full h-full object-cover opacity-10 blur-sm group-hover:scale-110 transition-transform duration-700" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-[var(--bg-secondary)]/90 to-[var(--bg-secondary)]/50" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2 py-1 text-xs rounded border ${item.state === 'completed' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' :
                                    item.state === 'in progress' ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' :
                                        'border-slate-500/30 text-slate-400 bg-slate-500/10'
                                    }`}>
                                    {item.state}
                                </span>
                            </div>
                            <h4 className="text-xl font-bold mb-2 line-clamp-1">{item.title}</h4>
                            <p className="text-[var(--text-secondary)] text-sm line-clamp-3 mb-4">{item.description}</p>
                        </div>

                        <div className="relative z-10 flex justify-between items-center border-t border-[var(--text-secondary)]/10 pt-4 mt-auto">
                            <span className="text-xs text-[var(--accent)] font-mono truncate max-w-[60%]">{item.tech}</span>
                            <div className="flex gap-2">
                                <button onClick={() => onEdit(i)} className="p-2 bg-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-white rounded-lg transition-colors shadow-lg"><FaEdit size={14} /></button>
                                <button onClick={() => onDelete(i)} className="p-2 bg-[var(--bg-primary)] hover:bg-red-500 hover:text-white rounded-lg transition-colors shadow-lg"><FaTrash size={14} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
