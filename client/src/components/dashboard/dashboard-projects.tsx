import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { InputGroup, SectionHeader, ConfirmDialog, LoadingButton } from "./dashboard-shared";
import axios from "axios";
import { toast } from "react-toastify";
import { getProjects } from "../../data/portfolio-data";
import { Loading } from "../loading";
import { getSecurtKey } from "../../helpers/storage-helper";



const stateColor = (state: string) => {
    switch (state.toLowerCase()) {
        case "completed":
            return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
        case "in progress":
            return "bg-amber-500/20 text-amber-400 border-amber-500/50";
        case "suspended":
            return "bg-rose-500/20 text-rose-400 border-rose-500/50";
        default:
            return "bg-slate-500/20 text-slate-400 border-slate-500/50";
    }
};

export const ProjectsManager = () => {
    const server_url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const secretKey = getSecurtKey();
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [projectToUpdate, setProjectToUpdate] = useState<any>(null);
    // Initial state matching backend requirements
    useEffect(() => {
        console.log("projectToUpdate", projectToUpdate);
    }, [projectToUpdate]);


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
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const fetchProjects = () => {
        getProjects().then((data) => {
            data.sort((a: any, b: any) => a.sort_order - b.sort_order);
            setProjects(data);
            setIsLoading(false);
        }).catch((error) => {
            console.error("Error fetching projects:", error);
            if (error.response && [401, 404, 500].includes(error.response.status)) {
                navigate("/error", { replace: true, state: error.response.status });
            }
            toast.error("Failed to load projects");
        });
    };

    useEffect(() => {
        fetchProjects();
    }, []);
    useEffect(() => {
        console.log("projects", projects);
    }, [projects]);

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
        setDeletedImages([...deletedImages, projectImages.find(img => img.id === id)?.preview || ""]);
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
            await axios.delete(`${server_url}/api/project/delete/${deleteConfirm.id}`, { headers: { "security-code": secretKey } });
            toast.success("Project deleted successfully");
            fetchProjects();
            setProjects(projects.filter(p => p.id !== deleteConfirm.id));
        } catch (error: any) {
            console.error("Error deleting project:", error);
            if (error.response && [401, 404, 500].includes(error.response.status)) {
                navigate("/error", { replace: true, state: error.response.status });
            }
            toast.error("Failed to delete project");
        }
    };

    const validateForm = () => {
        const rules: Record<string, { min: number; max?: number; label: string }> = {
            title: { min: 2, max: 100, label: "Title" },
            client: { min: 2, max: 100, label: "Client" },
            technologies: { min: 2, max: 200, label: "Technologies" },
            role: { min: 2, max: 100, label: "Role" },
            description: { min: 10, max: 1000, label: "Description" },
            sort_order: { min: 0, label: "Sort Order" }
        };

        // 1. Check Text Fields (Empty + Length)
        for (const [key, rule] of Object.entries(rules)) {
            const value = formData[key as keyof typeof formData];

            // Check if empty
            if (!value || (typeof value === 'string' && !value.trim())) {
                toast.error(`${rule.label} is required`);
                return false;
            }

            // Check lengths
            if (typeof value === 'string') {
                if (value.length < rule.min) {
                    toast.error(`${rule.label} must be at least ${rule.min} characters`);
                    return false;
                }
                if (rule.max && value.length > rule.max) {
                    toast.error(`${rule.label} must be less than ${rule.max} characters`);
                    return false;
                }
            }

            if (key === 'sort_order' && typeof value === 'number') {
                if (value < rule.min) {
                    toast.error(`${rule.label} must be at least ${rule.min}`);
                    return false;
                }
            }
        }

        // 2. GitHub URL Validation
        if (!formData.github_url || !formData.github_url.trim()) {
            toast.error("GitHub Link is required");
            return false;
        }
        if (!/^https?:\/\//i.test(formData.github_url)) {
            toast.error("GitHub URL must start with http:// or https://");
            return false;
        }

        // 3. Year Validation
        if (!formData.year) {
            toast.error("Year is required");
            return false;
        }
        if (!/^\d{4}$/.test(formData.year)) {
            toast.error("Year must be a 4-digit number (e.g., 2025)");
            return false;
        }

        // 4. Image Validation
        if (projectImages.length < 2) {
            toast.error("You must upload at least 2 images");
            return false;
        }

        return true;
    };

    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const payload = {
                ...formData,
            };

            if (isAdding) {
                const Project = await axios.post(`${server_url}/api/project/add`, payload, { headers: { "security-code": secretKey } });
                if (projectToUpdate) {
                    await axios.patch(`${server_url}/api/project/sortOrder/${projectToUpdate.id}`, { sort_order: projects.length + 1 }, { headers: { "security-code": secretKey } }).catch((error) => {
                        throw error;
                    });
                }

                const formDataUpload = new FormData();
                projectImages.forEach((img) => {
                    if (img.file) {
                        formDataUpload.append("images", img.file);
                    }
                });

                const hasFiles = projectImages.some(img => img.file !== null);

                if (hasFiles) {
                    await axios.post(`${server_url}/api/cloud/upload/images/${Project.data.data[0].id}`, formDataUpload, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            "security-code": secretKey
                        }
                    });
                }

            } else if (editingId) {
                await axios.put(`${server_url}/api/project/update/${editingId}`, {
                    id: editingId,
                    ...payload
                }, { headers: { "security-code": secretKey } });
                if (projectToUpdate) {
                    await axios.patch(`${server_url}/api/project/sortOrder/${projectToUpdate.id}`, { sort_order: projects.find(p => p.id === editingId)?.sort_order }, { headers: { "security-code": secretKey } }).catch((error) => {
                        throw error;
                    });
                }
                const formDataUpload = new FormData();
                let hasNewFiles = false;
                projectImages.forEach((img) => {
                    if (img.file) {
                        formDataUpload.append("images", img.file);
                        hasNewFiles = true;
                    }
                });

                if (hasNewFiles) {
                    await axios.post(`${server_url}/api/cloud/upload/images/${editingId}`, formDataUpload, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            "security-code": secretKey
                        }
                    });
                }
                if (deletedImages.length > 0) {
                    await axios.delete(`${server_url}/api/cloud/delete/images`, { data: { urls: deletedImages, projectID: editingId }, headers: { "security-code": secretKey } });
                }
            }

            toast.success(`Project ${isAdding ? 'added' : 'updated'} successfully`);
            fetchProjects();
            cleanupForm();
        } catch (error: any) {
            console.error("Error saving project:", error);
            if (error.response && [401, 404, 500].includes(error.response.status)) {
                navigate("/error", { replace: true, state: error.response.status });
            }
            toast.error(`Failed to ${isAdding ? 'add' : 'update'} project`);
        } finally {
            setIsSubmitting(false);
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
                <form onSubmit={handleSave}>
                    <h3 className="text-xl font-bold mb-6">{isAdding ? 'Add Project' : 'Edit Project'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <InputGroup label="Title" value={formData.title} onChange={(v: string) => setFormData({ ...formData, title: v })} placeholder="e.g. E-Commerce Platform" />
                        <InputGroup label="Client" value={formData.client} onChange={(v: string) => setFormData({ ...formData, client: v })} placeholder="e.g. John Doe / Personal" />
                        <InputGroup label="Technologies" value={formData.technologies} onChange={(v: string) => setFormData({ ...formData, technologies: v })} placeholder="e.g. React, Node.js, MongoDB (comma separated)" />
                        <InputGroup label="GitHub Link" value={formData.github_url} onChange={(v: string) => setFormData({ ...formData, github_url: v })} placeholder="https://github.com/username/project" />
                        <InputGroup label="Year" value={formData.year} onChange={(v: string) => setFormData({ ...formData, year: v })} placeholder="YYYY" />
                        <InputGroup label="Role" value={formData.role} onChange={(v: string) => setFormData({ ...formData, role: v })} placeholder="e.g. Full Stack Developer" />

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Sort Order</label>
                            <select
                                value={formData.sort_order}
                                onChange={(e) => {
                                    const newSortOrder = parseInt(e.target.value);
                                    setFormData({ ...formData, sort_order: newSortOrder });

                                    const conflictingProject = projects.find((p: any) => p.sort_order === newSortOrder && p.id !== editingId);
                                    if (conflictingProject) {
                                        setProjectToUpdate(conflictingProject);
                                    } else {
                                        setProjectToUpdate(null);
                                    }
                                }}
                                className="w-full bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)] appearance-none"
                            >
                                {Array.from({ length: projects.length + (isAdding ? 1 : 0) }, (_, i) => i + 1).map((num) => {
                                    const isTaken = projects.some((p: any) => p.sort_order === num && p.id !== editingId);
                                    return (
                                        <option key={num} value={num} className={isTaken ? "text-gray-400" : ""}>
                                            {num}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

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
                            placeholder="Briefly describe the project features and challenges..."
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={cleanupForm} className="px-6 py-2 rounded-xl border border-[var(--text-secondary)]/30 hover:bg-[var(--text-secondary)]/10 text-[var(--text-secondary)]">Cancel</button>
                        <LoadingButton isLoading={isSubmitting} type="submit" loadingText="Saving...">
                            <FaSave /> Save
                        </LoadingButton>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div>
            <SectionHeader title="Projects" desc="Showcase your best work" onAdd={() => {
                cleanupForm();
                setFormData(prev => ({ ...prev, sort_order: projects.length + 1 }));
                setIsAdding(true);
            }} />
            {isLoading ? (
                <Loading />
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
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 text-xs rounded border border-[var(--text-secondary)]/20 bg-[var(--bg-secondary)]/50 text-[var(--text-secondary)]">
                                            #{item.sort_order}
                                        </span>
                                        <span className={`px-2 py-1 text-xs rounded border ${stateColor(item.state)}`}>
                                            {item.state}
                                        </span>
                                    </div>
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
