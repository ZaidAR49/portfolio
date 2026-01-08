import { addProject as addproject, getProjectByUserId as getallProjects, getProjectById as getprojectById, deleteProject as deleteproject, updateProject as updateproject } from "../models/project-model.js";
export const addProject = async (req, res) => {
    try {
        const project = req.body;
        if (!project.user_id || !project.title || !project.client || !project.role || !project.year || !project.state || !project.sort_order || !project.description || !project.github_url || !project.technologies || !project.images) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const result = await addproject(project);
        console.log("result :", result);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error adding project:", error);
        return res.status(500).json({ message: "Failed to add project" });
    }
};

export const getProjectByUserId = async (req, res) => {
    try {
        const projects = await getallProjects(req.params.id);
        console.log("projects :", projects);
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error getting projects:", error);
        return res.status(500).json({ message: "Failed to get projects" });
    }
};

export const getProjectById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const project = await getprojectById(req.params.id);
        console.log("project by id :", project);
        res.status(200).json(project);
    } catch (error) {
        console.error("Error getting project by id:", error);
        res.status(500).json({ message: "Failed to get project by id" });
    }
};

export const deleteProject = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const project = await deleteproject(req.params.id);
        console.log("project deleted successfully :", project);
        res.status(200).json(project);
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Failed to delete project" });
    }
};

export const updateProject = async (req, res) => {
    try {
        const project = req.body;
        const id = req.params.id;

        console.log("Updating project with data:", project);

        if (!id || !project.title || !project.client || !project.role || !project.year || !project.state || !project.sort_order || !project.description || !project.github_url || !project.technologies || !project.images) {
            console.error("Missing fields in update:", project);
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await updateproject(project, id);

        if (result.error) {
            throw result.error;
        }

        console.log("Project updated successfully result:", result);
        res.status(200).json(result.data ? result.data[0] : result.data);
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Failed to update project" });
    }
};
