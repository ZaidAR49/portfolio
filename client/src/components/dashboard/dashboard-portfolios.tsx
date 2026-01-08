import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave, FaExternalLinkAlt } from "react-icons/fa";
import { InputGroup, SectionHeader } from "./dashboard-shared";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const PortfolioManager = () => {
    const server_url = import.meta.env.VITE_API_URL;
    const [portfolios, setPortfolios] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    // Form State
    const initialFormState = {
        portfolio_name: "",
        name: "",
        job_title: "",
        email: "",
        linkedin_url: "",
        github_url: "",
        resume_url: "",
        hero_description: "",
        about_title: "",
        about_description: "",
        capabilities_description: ""
    };
    const [formData, setFormData] = useState(initialFormState);
    const [isEditing, setIsEditing] = useState<string | null>(null); // Stores portfolio_name of item being edited
    const [isAdding, setIsAdding] = useState(false);

    // Picture State
    const [picture, setPicture] = useState({
        preview: null as string | null,
        file: null as File | null
    });

    const fetchPortfolios = async () => {
        try {
            const response = await axios.get(`${server_url}/api/user/all`);
            if (response.status === 200) {
                // Supabase returns { data: [...], ... }
                const data = response.data.data || response.data;
                setPortfolios(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error("Error fetching portfolios:", error);
            toast.error("Failed to load portfolios");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleEdit = (portfolio: any) => {
        setFormData(portfolio);
        setPicture({ preview: portfolio.picture_url || null, file: null });
        setIsEditing(portfolio.portfolio_name);
        setIsAdding(false);
    };

    const handleDelete = async (id: string | number) => {
        if (!confirm(`Are you sure you want to delete this portfolio?`)) return;

        try {
            await axios.delete(`${server_url}/api/user/delete/${id}`);
            toast.success("Portfolio deleted successfully" + id);
            setPortfolios(portfolios.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting portfolio:", error);
            toast.error("Failed to delete portfolio");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let response;
            if (isAdding) {
                response = await axios.post(`${server_url}/api/user/add`, formData);
            } else if (isEditing) {
                response = await axios.put(`${server_url}/api/user/update/${isEditing}`, formData);
            }

            if (response?.status === 200 || response?.status === 201) {
                const userID = isAdding ? response.data.data?.[0]?.id : (formData as any).id;

                // Handle Picture Upload if changed
                if (picture.file && userID) {
                    const base64Picture = await fileToBase64(picture.file);
                    await axios.post(`${server_url}/api/cloud/upload/picture`, {
                        userID: userID,
                        picture: base64Picture
                    });
                }

                toast.success(`Portfolio ${isAdding ? 'created' : 'updated'} successfully`);
                fetchPortfolios();
                cleanupForm();
            }
        } catch (error) {
            console.error("Error saving portfolio:", error);
            toast.error(`Failed to ${isAdding ? 'create' : 'update'} portfolio`);
        }
    };

    const cleanupForm = () => {
        setFormData(initialFormState);
        setPicture({ preview: null, file: null });
        setIsEditing(null);
        setIsAdding(false);
    };

    // Render List View
    if (!isAdding && !isEditing) {
        return (
            <div>
                <SectionHeader
                    title="Portfolios"
                    desc="Manage your different portfolio profiles"
                    onAdd={() => { cleanupForm(); setIsAdding(true); }}
                />

                {isLoading ? (
                    <div className="text-center py-10 text-[var(--text-secondary)]">Loading...</div>
                ) : (
                    <div className="space-y-4">
                        {portfolios.length === 0 && (
                            <div className="text-center py-10 text-[var(--text-secondary)] bg-[var(--bg-secondary)]/30 rounded-2xl">
                                No portfolios found. Create one to get started.
                            </div>
                        )}
                        {portfolios.map((item: any) => (
                            <div key={item.id} className="glass-panel p-6 rounded-2xl flex items-center justify-between group hover:border-[var(--accent)]/30 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--accent)]/10 border border-[var(--text-secondary)]/20">
                                        {item.picture_url ? (
                                            <img src={item.picture_url} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[var(--accent)]">
                                                {item.name?.[0]?.toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold flex items-center gap-2">
                                            {item.name}
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                                                {item.portfolio_name}
                                            </span>
                                        </h4>
                                        <p className="text-[var(--text-secondary)] text-sm">{item.job_title}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => navigate('/')} className="p-2 text-[var(--text-primary)] hover:bg-[var(--text-secondary)]/10 rounded-lg" title="View Live"><FaExternalLinkAlt /></button>
                                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg" title="Edit"><FaEdit /></button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg" title="Delete"><FaTrash /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Render Form View (Add/Edit)
    return (
        <form onSubmit={handleSave} className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">{isAdding ? 'Create New Portfolio' : 'Edit Portfolio'}</h2>
                    <p className="text-[var(--text-secondary)]">
                        {isAdding ? 'Add details for a new portfolio' : `Editing ${formData.portfolio_name}`}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button type="button" onClick={cleanupForm} className="px-6 py-2 rounded-xl border border-[var(--text-secondary)]/30 hover:bg-[var(--text-secondary)]/10 text-[var(--text-secondary)]">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary flex items-center gap-2">
                        <FaSave /> Save Changes
                    </button>
                </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup
                        label="Portfolio Name (ID)"
                        name="portfolio_name"
                        value={formData.portfolio_name}
                        onChange={(val: string) => setFormData({ ...formData, portfolio_name: val })}
                        required
                        minLength={3}
                        placeholder="e.g. jdoe-portfolio (Unique URL ID)"
                    // Disable editing portfolio name if in edit mode (usually IDs are constant, but depends on logic. User said 'ganna be portfolio_name', implied unique key)
                    // Keeping it editable for now unless it breaks backend logic, but usually keys are immutable-ish.
                    />
                    <InputGroup
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={(val: string) => setFormData({ ...formData, name: val })}
                        required
                        minLength={2}
                        placeholder="e.g. Zaid Radaideh"
                    />
                    <InputGroup
                        label="Job Title"
                        name="job_title"
                        value={formData.job_title}
                        onChange={(val: string) => setFormData({ ...formData, job_title: val })}
                        required
                        placeholder="e.g. Software Engineer"
                    />
                    <InputGroup
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(val: string) => setFormData({ ...formData, email: val })}
                        required
                        placeholder="e.g. example@gmail.com"
                    />
                    <InputGroup
                        label="LinkedIn URL"
                        name="linkedin_url"
                        type="url"
                        value={formData.linkedin_url}
                        onChange={(val: string) => setFormData({ ...formData, linkedin_url: val })}
                        required
                        placeholder="https://linkedin.com/..."
                    />
                    <InputGroup
                        label="GitHub URL"
                        name="github_url"
                        type="url"
                        value={formData.github_url}
                        onChange={(val: string) => setFormData({ ...formData, github_url: val })}
                        required
                        placeholder="https://github.com/..."
                    />
                    <InputGroup
                        label="Resume URL"
                        name="resume_url"
                        type="url"
                        value={formData.resume_url}
                        onChange={(val: string) => setFormData({ ...formData, resume_url: val })}
                        required
                        placeholder="CV Link"
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide text-[0.7rem]">Profile Picture</label>
                        <div className="flex items-center gap-4">
                            {picture.preview && (
                                <img src={picture.preview} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-[var(--accent)]" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const url = URL.createObjectURL(file);
                                        setPicture({ preview: url, file: file });
                                    }
                                }}
                                className="w-full bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
                            />
                        </div>
                    </div>

                    <InputGroup
                        label="Hero Description"
                        name="hero_description"
                        value={formData.hero_description}
                        onChange={(val: string) => setFormData({ ...formData, hero_description: val })}
                        required
                        minLength={10}
                        maxLength={200}
                    />

                    <div className="pt-4 border-t border-[var(--text-secondary)]/10">
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide text-[0.7rem]">About Title</label>
                        <textarea
                            name="about_title"
                            value={formData.about_title}
                            onChange={(e) => setFormData({ ...formData, about_title: e.target.value })}
                            required
                            className="w-full h-24 bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl p-4 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide text-[0.7rem]">About Bio</label>
                        <textarea
                            name="about_description"
                            value={formData.about_description}
                            onChange={(e) => setFormData({ ...formData, about_description: e.target.value })}
                            required
                            className="w-full h-32 bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl p-4 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide text-[0.7rem]">Capabilities Description</label>
                        <textarea
                            name="capabilities_description"
                            value={formData.capabilities_description}
                            onChange={(e) => setFormData({ ...formData, capabilities_description: e.target.value })}
                            required
                            className="w-full h-32 bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl p-4 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none resize-none"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};
