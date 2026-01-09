import Logger from "../helpers/logger-helper.js";
import { addSkill as addskill, getallSkills as getallskills, updateSkill as updateskill, deleteSkill as deleteskill } from "../models/skill-model.js";

export const addSkill = async (req, res) => {
    try {
        const skill = req.body;
        Logger.info("Adding skill: ", { skill });
        if (!skill.user_id || !skill.name || !skill.type) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = await addskill(skill);
        if (result) {
            Logger.success("Skill added successfully: ", result);
            return res.status(200).json({ message: "Skill added successfully" });
        }
    } catch (error) {
        Logger.error("Failed to add skill: ", error);
        res.status(500).json({ error: "Failed to add skill" });
    }
};

export const getAllSkills = async (req, res) => {
    try {
        const { user_id } = req.params;
        Logger.info("Getting all skills: ", { user_id });
        if (!user_id) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = await getallskills(user_id);
        const data = result.data;
        if (result) {
            Logger.success("Skills retrieved successfully: ", result);
            return res.status(200).json({ data });
        }
    } catch (error) {
        Logger.error("Failed to get skills: ", error);
        res.status(500).json({ error: "Failed to get skills" });
    }
};

export const updateSkill = async (req, res) => {
    try {
        const skill = req.body;
        Logger.info("Updating skill: ", { skill });
        if (!skill.id || !skill.name || !skill.type) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = await updateskill(skill);
        if (result) {
            Logger.success("Skill updated successfully: ", result);
            return res.status(200).json({ message: "Skill updated successfully" });
        }
    } catch (error) {
        Logger.error("Failed to update skill: ", error);
        res.status(500).json({ error: "Failed to update skill" });
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        Logger.info("Deleting skill: ", { id });
        if (!id) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = await deleteskill(id);
        if (result) {
            Logger.success("Skill deleted successfully: ", result);
            return res.status(200).json({ message: "Skill deleted successfully" });
        }
    } catch (error) {
        Logger.error("Failed to delete skill: ", error);
        res.status(500).json({ error: "Failed to delete skill" });
    }
};