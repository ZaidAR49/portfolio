import { addProject as addproject, getProjectByUserId as getallProjects, getProjectById as getprojectById, activeProjects as activeprojects, deleteProject as deleteproject, updateProject as updateproject } from "../models/project-model.js";
import Logger from "../helpers/logger-helper.js";
export const addProject = async (req, res) => {
    try {
        const project = req.body;
        Logger.info("Adding new project", project); // Log sanitized input
        if (!project.user_id || !project.title || !project.client || !project.role || !project.year || !project.state || !project.sort_order || !project.description || !project.github_url || !project.technologies || !project.images) {
            Logger.warn("Missing required fields for invalid project attempt");
            return res.status(400).json({ message: "Missing required fields" });

        }
        const result = await addproject(project);
        // Log the sanitized result from DB, which is the source of truth
        Logger.success("Project added successfully", result.data[0]);
        res.status(201).json(result.data[0]);
    } catch (error) {
        Logger.error("Error adding project", error);
        return res.status(500).json({ message: "Failed to add project" });
    }
};

export const getProjectByUserId = async (req, res) => {
    try {
        Logger.info(`Fetching projects for user ID: ${req.params.id}`);
        const projects = await getallProjects(req.params.id);
        Logger.success(`Fetched ${projects ? projects.length : 0} projects`, projects);
        res.status(200).json(projects);
    } catch (error) {
        Logger.error("Error getting projects", error);
        return res.status(500).json({ message: "Failed to get projects" });
    }
};

export const getProjectById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        Logger.info(`Fetching project by ID: ${req.params.id}`);
        const project = await getprojectById(req.params.id);
        Logger.success("Fetched project successfully", project);
        res.status(200).json(project);
    } catch (error) {
        Logger.error("Error getting project by id", error);
        res.status(500).json({ message: "Failed to get project by id" });
    }
};

export const deleteProject = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        Logger.info(`Deleting project ID: ${req.params.id}`);
        const project = await deleteproject(req.params.id);
        Logger.success("Project deleted successfully", project);
        res.status(200).json(project);
    } catch (error) {
        Logger.error("Error deleting project", error);
        res.status(500).json({ message: "Failed to delete project" });
    }
};

export const updateProject = async (req, res) => {
    try {
        const project = req.body;
        const id = req.params.id;
        Logger.info(`Updating project ID: ${id}`, project); // Log sanitized update data

        if (!id || !project.title || !project.client || !project.role || !project.year || !project.state || !project.sort_order || !project.description || !project.github_url || !project.technologies || !project.images) {
            Logger.warn("Missing fields in update", project);
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await updateproject(project, id);

        if (result.error) {
            throw result.error;
        }

        Logger.success("Project updated successfully", result.data ? result.data[0] : result.data);
        res.status(200).json(result.data ? result.data[0] : result.data);
    } catch (error) {
        Logger.error("Error updating project", error);
        res.status(500).json({ message: "Failed to update project" });
    }
};

export const activeProjects = async (req, res) => {
    try {
        Logger.info("Fetching active projects");
        const projects = await activeprojects();
        Logger.success(`Fetched ${projects ? projects.length : 0} active projects`, projects);
        res.status(200).json(projects);
    } catch (error) {
        Logger.error("Error getting active projects", error);
        return res.status(500).json({ message: "Failed to get active projects" });
    }
};
