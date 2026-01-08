import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { InputGroup, SectionHeader } from "./dashboard-shared";

export const ExperienceManager = ({ list, onEdit, onDelete, onAdd, editIndex, isAdding, onCancel, onSave }: any) => {
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (editIndex !== null) setFormData(list[editIndex]);
        else if (isAdding) setFormData({ role: '', companey: '', peroid: '', desc: '' });
    }, [editIndex, isAdding, list]);

    if (editIndex !== null || isAdding) {
        return (
            <div className="glass-panel p-8 rounded-3xl animate-in fade-in zoom-in-95">
                <h3 className="text-xl font-bold mb-6">{isAdding ? 'Add Experience' : 'Edit Experience'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <InputGroup label="Role" value={formData.role} onChange={(v: string) => setFormData({ ...formData, role: v })} />
                    <InputGroup label="Company" value={formData.companey} onChange={(v: string) => setFormData({ ...formData, companey: v })} />
                    <InputGroup label="Period" value={formData.peroid} onChange={(v: string) => setFormData({ ...formData, peroid: v })} />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Description</label>
                    <textarea
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
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
            {/* We manually render the "Add" button inside SectionHeader, but we need to pass the function. 
                Wait, SectionHeader in dashboard-shared does render a button.
                I need to make sure SectionHeader definition in dashboard-shared includes the icon or the button accurately.
                I defined it with just "Add New" text. But I can update it here if I want.
                Actually, the original passed onAdd, and the component rendered the button.
                I'll keep it as is. I added FaPlus to the imports in this file just in case I need it, 
                but SectionHeader abstracts the button. */}
            <SectionHeader title="Experience" desc="Manage your work history" onAdd={onAdd} />
            <div className="space-y-4">
                {list.map((item: any, i: number) => (
                    <div key={i} className="glass-panel p-6 rounded-2xl flex items-center justify-between group hover:border-[var(--accent)]/30 transition-all">
                        <div className="flex items-center gap-6">
                            <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                            <div>
                                <h4 className="text-lg font-bold">{item.role}</h4>
                                <p className="text-[var(--text-secondary)] text-sm">{item.companey} • {item.peroid}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => onEdit(i)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><FaEdit /></button>
                            <button onClick={() => onDelete(i)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
