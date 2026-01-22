
import { addManyExperiences as addmanymxperiences, getExperiencesCount as getexperiencesCount, addExperience as addexperience, getExperienceByUserId as getallExperiences, getExperienceById as getexperienceById, deleteExperience as deleteexperience, updateExperience as updateexperience, getActiveExperiences as getactiveExperiences } from "../models/experience-model.js";
import { getActiveUser } from "../models/user-model.js";

export const getExperiencesCount = async (req, res) => {
    try {
        const experiencesCount = await getexperiencesCount();
        console.log("experiences count :", experiencesCount);
        res.status(200).json(experiencesCount);
    } catch (error) {
        console.error("Error getting experiences count:", error);
        res.status(500).json({ message: "Failed to get experiences count" });
    }
}
export const addManyExperiences = async (req, res) => {
    try {
        const userId = req.params.id;
        const experiences = req.body;
        if (!experiences.length) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const parsedExperiences = experiences.map((experience) => {
            return {
                user_id: userId,
                role: experience.role,
                company: experience.company,
                period: experience.period,
                description: experience.description
            }
        });
        console.log("experiences :", parsedExperiences);
        const result = await addmanymxperiences(parsedExperiences);
        if (result.error) {
            throw result.error;
        }
        console.log("result :", result);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error adding experiences:", error);
        return res.status(500).json({ message: "Failed to add experiences" });
    }
}
export const addExperience = async (req, res) => {
    try {
        const experience = req.body;
        if (!experience.role || !experience.company || !experience.period || !experience.description) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (!experience.userID) {
            console.log("user id is from db");
            const user = await getActiveUser();
            console.log("user id from db :", user.data[0].id);
            experience.userID = user.data[0].id;
        }

        const result = await addexperience(experience);
        console.log("result :", result);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error adding experience:", error);
        return res.status(500).json({ message: "Failed to add experience" });
    }
};

export const getExperienceByUserId = async (req, res) => {
    try {
        const experiences = await getallExperiences(req.params.id);
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
        // Ensure ID is present. If not in body, try params.
        if (!experience.id && req.params.id) {
            experience.id = req.params.id;
        }

        console.log("Updating experience with data:", experience);

        if (!experience.id || !experience.role || !experience.company || !experience.period || !experience.description) {
            console.error("Missing fields in update:", experience);
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await updateexperience(experience);

        if (result.error) {
            throw result.error;
        }

        console.log("Experience updated successfully result:", result);
        // Supabase update with select() returns { data: [...], error: null }
        // If select() is used, data is an array of updated rows.
        res.status(200).json(result.data ? result.data[0] : result.data);
    } catch (error) {
        console.error("Error updating experience:", error);
        res.status(500).json({ message: "Failed to update experience" });
    }
};

export const getActiveExperiences = async (req, res) => {
    try {
        const experiences = await getactiveExperiences();
        console.log("Active experiences:", experiences);
        res.status(200).json(experiences);
    } catch (error) {
        console.error("Error getting active experiences:", error);
        res.status(500).json({ message: "Failed to get active experiences" });
    }
};
