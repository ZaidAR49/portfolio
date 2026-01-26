import { reorderProjectsForUser, updateProjectSortOrder as updateprojectSortOrder, getProjectsCount as getprojectscount, addManyProjects as addmanyprojects, addProject as addproject, getProjectByUserId as getallProjects, getProjectById as getprojectById, activeProjects as activeprojects, deleteProject as deleteproject, updateProject as updateproject } from "../models/project-model.js";
import { getActiveUser } from "../models/user-model.js";
import { deleteImagesHelper } from "../helpers/cloud-helper.js";
import Logger from "../helpers/logger-helper.js";

export const addManyProjects = async (req, res) => {
    try {
        const userId = req.params.id;
        const projects = req.body;
        Logger.info("Adding new projects", projects); // Log sanitized input
        if (!projects) {
            Logger.warn("Missing required fields for invalid project attempt");
            return res.status(400).json({ message: "Missing required fields" });
        }
        const parsedProjects = projects.map(project => {
            return {
                user_id: userId,
                title: project.title,
                client: project.client,
                role: project.role,
                year: project.year,
                status: project.status,
                sort_order: project.sort_order,
                description: project.description,
                github_url: project.github_url,
                technologies: project.technologies,
                images: project.images
            }
        });
        const result = await addmanyprojects(parsedProjects);
        if (result.error) {
            throw result.error;
        }
        Logger.success("Projects added successfully", result);
        res.status(201).json(result);
    } catch (error) {
        Logger.error("Error adding projects", error);
        return res.status(500).json({ message: "Failed to add projects" });
    }
}
export const getProjectsCount = async (req, res) => {
    try {
        const projectsCount = await getprojectscount();
        console.log("projects count :", projectsCount);
        res.status(200).json(projectsCount);
    } catch (error) {
        console.error("Error getting projects count:", error);
        res.status(500).json({ message: "Failed to get projects count" });
    }
}

export const addProject = async (req, res) => {
    try {
        const project = req.body;
        Logger.info("Adding new project", project); // Log sanitized input
        if (!project.title || !project.client || !project.role || !project.year || !project.status || !project.sort_order || !project.description || !project.github_url || !project.technologies || !project.images) {
            Logger.warn("Missing required fields for invalid project attempt");
            return res.status(400).json({ message: "Missing required fields" });

        }
        if (!project.user_id) {
            const user = await getActiveUser();
            if (!user.data[0]) {
                return res.status(400).json({ message: "User not found" });
            }
            project.user_id = user.data[0].id;
        }
        const result = await addproject({
            ...project,
            user_id: project.user_id
        });
        // Log the sanitized result from DB, which is the source of truth
        Logger.success("Project added successfully", result);
        res.status(201).json(result);
    } catch (error) {
        Logger.error("Error adding project", error);
        return res.status(500).json({ message: "Failed to add project" });
    }
};

export const getProjectByUserId = async (req, res) => {
    try {
        Logger.info(`Fetching projects for user ID: ${req.params.id}`);
        const projects = await getallProjects(req.params.id);
        Logger.success(`Fetched ${projects ? projects.data.length : 0} projects`);
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
    let project;
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        Logger.info(`Deleting project ID: ${req.params.id}`);
        project = await deleteproject(req.params.id);
        console.log("projects :", project.data[0], "and its images :", project.data[0].images);
        const { result, error2 } = await deleteImagesHelper(project.data[0].images);
        Logger.success("Project deleted successfully", project, result);
        if (error2) {
            // rollback
            Logger.info("Rolling back project deletion");
            await addproject(project);
            Logger.error("Cloudinary delete error", error2);
            throw error2;
        }
        //reorder projects
        console.log("reordering projects for user", project.data[0].user_id);
        const result2 = await reorderProjectsForUser(project.data[0].user_id);
        if (result2.error) {
            Logger.error("Error reordering projects", result2.error);
            throw result2.error;
        }
        console.log("reordered projects for user", result2);
        res.status(200).json(project.data[0]);
    } catch (error) {
        // rollback
        Logger.info("Rolling back project deletion");
        await addproject(project);
        Logger.error("Error deleting project", error);
        res.status(500).json({ message: "Failed to delete project" });
    }
};

export const updateProject = async (req, res) => {
    try {
        const project = req.body;
        const id = req.params.id;
        Logger.info(`Updating project ID: ${id}`, project); // Log sanitized update data

        if (!id || !project.title || !project.client || !project.role || !project.year || !project.status || !project.sort_order || !project.description || !project.github_url || !project.technologies || !project.images) {
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

export const swapProjectSortOrder = async (req, res) => {
    try {
        let projects = req.body;
        Logger.info(`Swapping project sort order for projects: ${projects}`);
        if (!projects) {
            Logger.warn("Missing projects in update", projects);
            return res.status(400).json({ message: "Missing required fields" });
        }
        projects = {
            first: {
                id: projects.first_project_ID,
                sort_order: projects.second_project_sort_order
            },
            second: {
                id: projects.second_project_ID,
                sort_order: projects.first_project_sort_order
            }
        }

        const result1 = await updateprojectSortOrder(projects.first);
        const result2 = await updateprojectSortOrder(projects.second);
        if (result1.error || result2.error) {
            throw result1.error || result2.error;
        }
        Logger.success(`Project sort orders swapped successfully`);
        console.log(`project ${result1.data[0].id} is now ${result1.data[0].sort_order} and project ${result2.data[0].id} is now ${result2.data[0].sort_order}`)
        res.status(200).json({
            "first_project_ID": result1.data[0].id,
            "first_project_sort_order": result1.data[0].sort_order,
            "second_project_ID": result2.data[0].id,
            "second_project_sort_order": result2.data[0].sort_order

        });
    } catch (error) {
        Logger.error("Error updating project", error);
        res.status(500).json({ message: "Failed to update project" });
    }
};

export const updateProjectSortOrder = async (req, res) => {
    try {
        const { sort_order } = req.body;
        const id = req.params.id;
        console.log("update sort order", sort_order, id);
        if (!sort_order || !id) {
            Logger.warn("Missing sort_order or id in update", sort_order, id);
            return res.status(400).json({ message: "Missing required fields" });
        }
        const result = await updateprojectSortOrder({ id, sort_order });
        if (result.error) {
            throw result.error;
        }
        Logger.success("Project sort order updated successfully", result);
        res.status(200).json(result.data);
    } catch (error) {
        Logger.error("Error updating project sort order", error);
        res.status(500).json({ message: "Failed to update project sort order" });
    }
};

export const activeProjects = async (req, res) => {
    try {
        Logger.info("Fetching active projects");
        const projects = await activeprojects();
        Logger.success(`Fetched ${projects && projects.data ? projects.data.length : 0} active projects`);
        res.status(200).json(projects);
    } catch (error) {
        Logger.error("Error getting active projects", error);
        return res.status(500).json({ message: "Failed to get active projects" });
    }
};
