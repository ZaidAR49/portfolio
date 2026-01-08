
import { addExperience as addexperience, getAllExperiences as getallExperiences, getExperienceById as getexperienceById, deleteExperience as deleteexperience, updateExperience as updateexperience } from "../models/experience-model.js";

export const addExperience = async (req, res) => {
    try {
        const experience = req.body;
        if (!experience.userID || !experience.role || !experience.period || !experience.description) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const result = await addexperience(experience);
        console.log("result :", result);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error adding experience:", error);
        return res.status(500).json({ message: "Failed to add experience" });
    }
};

export const getAllExperiences = async (req, res) => {
    try {
        const experiences = await getallExperiences();
        console.log("experiences :", experiences);
        res.status(200).json(experiences);
    } catch (error) {
        console.error("Error getting experiences:", error);
        res.status(500).json({ message: "Failed to get experiences" });
    }

};

export const getExperienceById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const experience = await getexperienceById(req.params.id);
        console.log("experience by id :", experience);
        res.status(200).json(experience);
    } catch (error) {
        console.error("Error getting experience by id:", error);
        res.status(500).json({ message: "Failed to get experience by id" });
    }
};

export const deleteExperience = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const experience = await deleteexperience(req.params.id);
        console.log("experience deleted successfully :", experience);
        res.status(200).json(experience);
    } catch (error) {
        console.error("Error deleting experience:", error);
        res.status(500).json({ message: "Failed to delete experience" });
    }
};

export const updateExperience = async (req, res) => {
    try {
        const experience = req.body;
        if (!experience.id || experience.role || experience.period || experience.description) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const result = await updateexperience(experience);
        console.log("experience updated successfully :", experience);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error updating experience:", error);
        res.status(500).json({ message: "Failed to update experience" });
    }
};