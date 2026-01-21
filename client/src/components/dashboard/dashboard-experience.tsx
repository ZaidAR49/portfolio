import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { InputGroup, SectionHeader, ConfirmDialog, LoadingButton } from "./dashboard-shared";
import { getExperiences } from "../../data/portfolio-data";
import axios from "axios";
import { toast } from "react-toastify";
import { Loading } from "../loading";
import { DashbordSecretKeyContext } from "../../contexts/dashbord-secret-key";
export const ExperienceManager = () => {
    const { secretKey } = useContext(DashbordSecretKeyContext);
    const server_url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [experiences, setExperiences] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const initialFormState = {
        user_id: "",
        role: "",
        company: "",
        period: "",
        description: "" // Note: backend expects 'description', frontend previously acted on 'desc' or 'description'
    };
    const [formData, setFormData] = useState(initialFormState);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: number | null; role: string }>({
        isOpen: false,
        id: null,
        role: ""
    });
    // finally {
    //             setIsLoading(false);
    //         }
    //          setExperiences(Array.isArray(data) ? data : []);

    useEffect(() => {
        console.log("from data:", formData)
    }, [formData])

    const fetchExperiences = () => {
        getExperiences().then(data => {
            setExperiences(data);
            setIsLoading(false);
        }).catch(error => {
            console.error("Error fetching experiences:", error);
            if (error.response && [401, 404, 500].includes(error.response.status)) {
                navigate("/error", { replace: true, state: error.response.status });
            }
            toast.error("Failed to load experiences");
        });
    }
    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleEdit = (item: any) => {
        setFormData({
            user_id: item.user_id,
            role: item.role,
            company: item.company || item.companey, // Handle potential legacy typo in data response if any
            period: item.period || item.peroid, // Handle potential legacy typo
            description: item.description || item.desc
        });
        setEditingId(item.id);
        setIsAdding(false);
    };

    const handleDeleteClick = (item: any) => {
        setDeleteConfirm({
            isOpen: true,
            id: item.id,
            role: item.role
        });
    };

    const handleConfirmDelete = async () => {
        if (!deleteConfirm.id) return;

        try {
            await axios.delete(`${server_url}/api/experience/delete/${deleteConfirm.id}`, {
                headers: {
                    "security-code": secretKey
                }
            });
            toast.success("Experience deleted successfully");
            setExperiences(experiences.filter(e => e.id !== deleteConfirm.id));
        } catch (error: any) {
            console.error("Error deleting experience:", error);
            if (error.response && [401, 404, 500].includes(error.response.status)) {
                navigate("/error", { replace: true, state: error.response.status });
            }
            toast.error("Failed to delete experience");
        }
    };

    const handleSave = async () => {
        setIsSubmitting(true);
        try {
            if (isAdding) {
                await axios.post(`${server_url}/api/experience/add`, {
                    ...formData
                }, {
                    headers: {
                        "security-code": secretKey
                    }
                });
            } else if (editingId) {
                await axios.put(`${server_url}/api/experience/update/${editingId}`, {
                    id: editingId,
                    ...formData
                }, {
                    headers: {
                        "security-code": secretKey
                    }
                });
            }

            toast.success(`Experience ${isAdding ? 'added' : 'updated'} successfully`);
            fetchExperiences();
            cleanupForm();
        } catch (error: any) {
            console.error("Error saving experience:", error);
            if (error.response && [401, 404, 500].includes(error.response.status)) {
                navigate("/error", { replace: true, state: error.response.status });
            }
            toast.error(`Failed to ${isAdding ? 'add' : 'update'} experience`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const cleanupForm = () => {
        setFormData(initialFormState);
        setEditingId(null);
        setIsAdding(false);
    };

    if (editingId !== null || isAdding) {
        return (
            <div className="glass-panel p-8 rounded-3xl animate-in fade-in zoom-in-95">
                <h3 className="text-xl font-bold mb-6">{isAdding ? 'Add Experience' : 'Edit Experience'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <InputGroup label="Role" value={formData.role} onChange={(v: string) => setFormData({ ...formData, role: v })} placeholder="e.g. Senior Software Engineer" />
                    <InputGroup label="Company" value={formData.company} onChange={(v: string) => setFormData({ ...formData, company: v })} placeholder="e.g. Google" />
                    <InputGroup label="Period" value={formData.period} onChange={(v: string) => setFormData({ ...formData, period: v })} placeholder="e.g. Sep 2025 - Present" />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full h-32 bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl p-4 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
                        placeholder="Describe your role, responsibilities, and key achievements..."
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <button onClick={cleanupForm} className="px-6 py-2 rounded-xl border border-[var(--text-secondary)]/30 hover:bg-[var(--text-secondary)]/10 text-[var(--text-secondary)]">Cancel</button>
                    <LoadingButton isLoading={isSubmitting} onClick={handleSave} loadingText="Saving...">
                        <FaSave /> Save
                    </LoadingButton>
                </div>
            </div>
        );
    }

    return (
        <div>
            <SectionHeader title="Experience" desc="Manage your work history" onAdd={() => { cleanupForm(); setIsAdding(true); }} />
            {isLoading ? (
                <Loading />
            ) : (
                <div className="space-y-4">
                    {experiences.length === 0 && (
                        <div className="text-center py-10 text-[var(--text-secondary)] bg-[var(--bg-secondary)]/30 rounded-2xl">
                            No experiences found. Add one to get started.
                        </div>
                    )}
                    {experiences.map((item: any) => (
                        <div key={item.id} className="glass-panel p-6 rounded-2xl flex items-center justify-between group hover:border-[var(--accent)]/30 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                                <div>
                                    <h4 className="text-lg font-bold">{item.role}</h4>
                                    <p className="text-[var(--text-secondary)] text-sm">{item.company} • {item.period}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(item)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><FaEdit /></button>
                                <button onClick={() => handleDeleteClick(item)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ ...deleteConfirm, isOpen: false })}
                onConfirm={handleConfirmDelete}
                title="Delete Experience?"
                message={`Are you sure you want to delete the experience as "${deleteConfirm.role}"? This action cannot be undone.`}
                confirmText="Delete Experience"
            />
        </div>
    );
};
