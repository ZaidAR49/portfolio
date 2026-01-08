import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { InputGroup, SectionHeader, ConfirmDialog } from "./dashboard-shared";
import axios from "axios";
import { toast } from "react-toastify";

export const ProjectsManager = () => {
    const server_url = import.meta.env.VITE_API_URL;
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initial state matching backend requirements
    const initialFormState = {
        title: "",
        client: "",
        role: "",
        year: "",
        state: "completed",
        sort_order: 0,
        description: "",
        github_url: "",
        technologies: "",
        images: [] as string[]
    };

    const [formData, setFormData] = useState(initialFormState);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Image State
    // We store objects to handle both new files (for preview) and existing URLs
    interface ProjectImage {
        id: string; // unique ID for key
        file: File | null;
        preview: string;
    }
    const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);

    // Deletion state
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: number | null; title: string }>({
        isOpen: false,
        id: null,
        title: ""
    });

    const fetchProjects = async () => {
        try {
            const user = await axios.get(`${server_url}/api/user/active`);
            if (user.data && user.data.id) {
                const response = await axios.get(`${server_url}/api/project/all/${user.data.id}`);
                if (response.status === 200) {
                    const data = response.data.data || response.data;
                    setProjects(Array.isArray(data) ? data : []);
                }
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
            toast.error("Failed to load projects");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleEdit = (item: any) => {
        setFormData({
            title: item.title,
            client: item.client,
            role: item.role || "",
            year: item.year,
            state: item.state,
            sort_order: item.sort_order || 0,
            description: item.description,
            github_url: item.github_url || item.github,
            technologies: item.technologies || item.tech,
            images: item.images || item.image || []
        });

        // Load existing images into state
        const existingImages = (item.images || item.image || []).map((url: string) => ({
            id: Math.random().toString(36).substr(2, 9),
            file: null,
            preview: url
        }));
        setProjectImages(existingImages);

        setEditingId(item.id);
        setIsAdding(false);
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const totalImages = projectImages.length + newFiles.length;

            if (totalImages > 5) {
                toast.warning("You can only have up to 5 images per project.");
                return;
            }

            const newImageObjects = newFiles.map(file => ({
                id: Math.random().toString(36).substr(2, 9),
                file: file,
                preview: URL.createObjectURL(file)
            }));

            setProjectImages([...projectImages, ...newImageObjects]);
        }
    };

    const handleImageDelete = (id: string) => {
        setProjectImages(projectImages.filter(img => img.id !== id));
    };

    const handleDeleteClick = (item: any) => {
        setDeleteConfirm({
            isOpen: true,
            id: item.id,
            title: item.title
        });
    };

    const handleConfirmDelete = async () => {
        if (!deleteConfirm.id) return;

        try {
            await axios.delete(`${server_url}/api/project/delete/${deleteConfirm.id}`);
            toast.success("Project deleted successfully");
            setProjects(projects.filter(p => p.id !== deleteConfirm.id));
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Failed to delete project");
        }
    };

    const validateForm = () => {
        // GitHub/Link Validation
        if (formData.github_url && !/^https?:\/\//i.test(formData.github_url)) {
            toast.error("GitHub URL must start with http:// or https://");
            return false;
        }

        // Year Validation
        if (formData.year && !/^\d{4}$/.test(formData.year)) {
            toast.error("Year must be a 4-digit number (e.g., 2025)");
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            const user = await axios.get(`${server_url}/api/user/active`);
            const userId = user.data.id;

            // Prepare payload
            // NOTE: We are NOT uploading images yet as per instructions.
            // We just pass the existing preview URLs for now if they are not files,
            // or we might need a placeholder if it's a file.
            // For this step, the user said "handle it later", so we will just preserve existing URLs
            // and ignore new files in the payload for now, or just send what we have.
            // Actually, if we send 'blob:...' urls to backend it won't work well for storage, 
            // but the user explicitly said "images... handle it later". 
            // So I will just map the previews to 'images' to keep array structure valid for now,
            // assuming the backend just stores strings.
            const imagePayload = projectImages.map(img => img.preview);

            const payload = {
                ...formData,
                user_id: userId,
                images: imagePayload
            };

            if (isAdding) {
                await axios.post(`${server_url}/api/project/add`, payload);
            } else if (editingId) {
                await axios.put(`${server_url}/api/project/update/${editingId}`, {
                    id: editingId,
                    ...payload
                });
            }

            toast.success(`Project ${isAdding ? 'added' : 'updated'} successfully`);
            fetchProjects();
            cleanupForm();
        } catch (error) {
            console.error("Error saving project:", error);
            toast.error(`Failed to ${isAdding ? 'add' : 'update'} project`);
        }
    };

    const cleanupForm = () => {
        setFormData(initialFormState);
        setProjectImages([]);
        setEditingId(null);
        setIsAdding(false);
    };

    if (editingId !== null || isAdding) {
        return (
            <div className="glass-panel p-8 rounded-3xl animate-in fade-in zoom-in-95">
                <h3 className="text-xl font-bold mb-6">{isAdding ? 'Add Project' : 'Edit Project'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <InputGroup label="Title" value={formData.title} onChange={(v: string) => setFormData({ ...formData, title: v })} />
                    <InputGroup label="Client" value={formData.client} onChange={(v: string) => setFormData({ ...formData, client: v })} />
                    <InputGroup label="Technologies" value={formData.technologies} onChange={(v: string) => setFormData({ ...formData, technologies: v })} />
                    <InputGroup label="GitHub Link" value={formData.github_url} onChange={(v: string) => setFormData({ ...formData, github_url: v })} placeholder="https://..." />
                    <InputGroup label="Year" value={formData.year} onChange={(v: string) => setFormData({ ...formData, year: v })} placeholder="YYYY" />
                    <InputGroup label="Role" value={formData.role} onChange={(v: string) => setFormData({ ...formData, role: v })} placeholder="e.g. Lead Developer" />
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

                {/* Image Section */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide text-[0.7rem]">
                        Project Images (Max 5)
                    </label>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        {projectImages.map((img) => (
                            <div key={img.id} className="relative group aspect-video rounded-xl overflow-hidden border border-[var(--text-secondary)]/20">
                                <img src={img.preview} alt="Project" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => handleImageDelete(img.id)}
                                        className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {projectImages.length < 5 && (
                            <label className="border-2 border-dashed border-[var(--text-secondary)]/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all text-[var(--text-secondary)] hover:text-[var(--accent)] aspect-video">
                                <span className="text-2xl mb-1">+</span>
                                <span className="text-xs font-medium">Add Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageSelect}
                                    className="hidden"
                                />
                            </label>
                        )}
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
                    <button onClick={cleanupForm} className="px-6 py-2 rounded-xl border border-[var(--text-secondary)]/30 hover:bg-[var(--text-secondary)]/10 text-[var(--text-secondary)]">Cancel</button>
                    <button onClick={handleSave} className="btn-primary flex items-center gap-2"><FaSave /> Save</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <SectionHeader title="Projects" desc="Showcase your best work" onAdd={() => { cleanupForm(); setIsAdding(true); }} />
            {isLoading ? (
                <div className="text-center py-10 text-[var(--text-secondary)]">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.length === 0 && (
                        <div className="col-span-full text-center py-10 text-[var(--text-secondary)] bg-[var(--bg-secondary)]/30 rounded-2xl">
                            No projects found. Add one to showcase your work.
                        </div>
                    )}
                    {projects.map((item: any) => (
                        <div key={item.id} className="glass-panel p-6 rounded-2xl group border border-[var(--text-secondary)]/10 hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between h-64 relative overflow-hidden">

                            {/* Background Image Effect */}
                            <div className="absolute inset-0 z-0">
                                {(item.images && item.images[0]) || (item.image && item.image[0]) ? ( // Handle both structures
                                    <img src={item.images?.[0] || item.image?.[0]} alt="" className="w-full h-full object-cover opacity-10 blur-sm group-hover:scale-110 transition-transform duration-700" />
                                ) : null}
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
                                <span className="text-xs text-[var(--accent)] font-mono truncate max-w-[60%]">{item.technologies}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(item)} className="p-2 bg-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-white rounded-lg transition-colors shadow-lg"><FaEdit size={14} /></button>
                                    <button onClick={() => handleDeleteClick(item)} className="p-2 bg-[var(--bg-primary)] hover:bg-red-500 hover:text-white rounded-lg transition-colors shadow-lg"><FaTrash size={14} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ ...deleteConfirm, isOpen: false })}
                onConfirm={handleConfirmDelete}
                title="Delete Project?"
                message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
                confirmText="Delete Project"
            />
        </div>
    );
};
