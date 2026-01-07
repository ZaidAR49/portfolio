import { FaSave } from "react-icons/fa";
import { InputGroup } from "./dashboard-shared";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserInfo = () => {
    // Initial data state (acting as the source of truth for defaultValues)
    const initialData = {
        portfolioName: "",
        name: "",
        jobTitle: "",
        email: "",
        linkedin: "",
        github: "",
        resume: "",
        picture: "",
        descHero: "",
        titleAbout: "",
        descAbout: "",
        descCapabilities: ""
    }
    const [data, setData] = useState(initialData);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        // Convert to object for easier debugging/viewing
        const formObject = Object.fromEntries(formData.entries());
        console.log("Form Data Submitted:", formObject);
        e.currentTarget.reset();
        setData(initialData);
        // Here you would typically send 'formData' to your backend
    };

    return (
        <UserForm data={data} setData={setData} onSubmit={onSubmit} />
    );
}

const UserForm = ({ data, setData, onSubmit }: any) => (
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
                <InputGroup
                    label="Portfolio Name"
                    name="portfolioName"
                    defaultValue={data.portfolioName}
                    required
                    minLength={3}
                    placeholder="e.g. jdoe-portfolio (Unique URL ID)"
                />
                <InputGroup
                    label="Full Name"
                    name="name"
                    defaultValue={data.name}
                    required
                    minLength={2}
                    placeholder="e.g. Zaid Radaideh (Displayed as your main title)"
                />
                <InputGroup
                    label="Job Title"
                    name="jobTitle"
                    defaultValue={data.jobTitle}
                    required
                    minLength={2}
                    placeholder="e.g. Software Engineer (Displayed below your name)"
                />
                <InputGroup
                    label="Email"
                    name="email"
                    type="email"
                    defaultValue={data.email}
                    required
                    placeholder="e.g. example@gmail.com (Used for contact)"
                />
                <InputGroup
                    label="LinkedIn URL"
                    name="linkedin"
                    type="url"
                    defaultValue={data.linkedin}
                    required
                    placeholder="e.g. https://linkedin.com/in/yourprofile (Social Icon)"
                />
                <InputGroup
                    label="GitHub URL"
                    name="github"
                    type="url"
                    defaultValue={data.github}
                    required
                    placeholder="e.g. https://github.com/yourusername (Social Icon)"
                />
                <InputGroup
                    label="Resume URL"
                    name="resume"
                    type="url"
                    defaultValue={data.resume}
                    required
                    placeholder="e.g. https://drive.google.com... (CV Link)"
                />
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide text-[0.7rem]">Profile Picture</label>
                    <div className="flex items-center gap-4">
                        {data.picture && (
                            <img src={data.picture} alt="Current profile" className="w-16 h-16 rounded-full object-cover border-2 border-[var(--accent)]" />
                        )}
                        <input
                            type="file"
                            name="picture"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const url = URL.createObjectURL(file);
                                    // Update local state ONLY for preview purposes
                                    setData({ ...data, picture: url });
                                }
                            }}
                            className="w-full bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--accent)] file:text-white hover:file:bg-[var(--accent)]/90"
                        />
                    </div>
                </div>

                <InputGroup
                    label="Hero Description"
                    name="descHero"
                    defaultValue={data.descHero}
                    required
                    minLength={10}
                    maxLength={200}
                    placeholder="e.g. Focused on creating reliable web applications... (Brief intro in the Hero section)"
                />

                <div className="pt-4 border-t border-[var(--text-secondary)]/10">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide text-[0.7rem]">About Title</label>
                    <textarea
                        name="titleAbout"
                        defaultValue={data.titleAbout}
                        required
                        minLength={10}
                        maxLength={200}
                        placeholder="e.g. I am a software engineer in Jordan... (Heading for the About Me section)"
                        className="w-full h-24 bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl p-4 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition-all resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide text-[0.7rem]">About Bio</label>
                    <textarea
                        name="descAbout"
                        defaultValue={data.descAbout}
                        required
                        minLength={20}
                        placeholder="e.g. I'm a Web Developer passionate about... (Detailed bio in the About Me section)"
                        className="w-full h-32 bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl p-4 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition-all resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wide text-[0.7rem]">Capabilities Description</label>
                    <textarea
                        name="descCapabilities"
                        defaultValue={data.descCapabilities}
                        required
                        minLength={20}
                        placeholder="e.g. I specialize in building real-world applications... (Intro text for your Skills/Capabilities)"
                        className="w-full h-32 bg-[var(--bg-primary)] border border-[var(--text-secondary)]/20 rounded-xl p-4 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition-all resize-none"
                    />
                </div>
            </div>
        </div>
    </form>
);
