import Logger from "../helpers/logger-helper.js";
import { addManySkills as addmanyskills, getSkillsCount as getskillscount, addSkill as addskill, getallSkills as getallskills, updateSkill as updateskill, deleteSkill as deleteskill, activeSkills as activeskill } from "../models/skill-model.js";
import { getActiveUser } from "../models/user-model.js";

export const getSkillsCount = async (req, res) => {
    try {
        const skillsCount = await getskillscount();
        console.log("skills count :", skillsCount);
        res.status(200).json(skillsCount);
    } catch (error) {
        console.error("Error getting skills count:", error);
        res.status(500).json({ message: "Failed to get skills count" });
    }
}

export const addManySkills = async (req, res) => {
    try {
        const userId = req.params.id;
        const skills = req.body;
        Logger.info("Adding skills: ", { skills });
        if (!skills) {
            return res.status(400).json({ error: "Invalid skills data" });
        }
        const mainSkills = skills.main
        const secondarySkills = skills.secondary;
        let parsedSkills = [];
        if (mainSkills) {
            mainSkills.forEach(skill => {
                parsedSkills.push({
                    name: skill.name,
                    type: skill.type,
                    user_id: userId
                });
            });
        }
        if (secondarySkills) {
            secondarySkills.forEach(skill => {
                parsedSkills.push({
                    name: skill.name,
                    type: skill.type,
                    user_id: skill.user_id
                });
            });
        }
        console.log("parsedSkills: ", parsedSkills);
        const result = await addmanyskills(parsedSkills);
        if (result) {
            Logger.success("Skills added successfully: ", result);
            return res.status(200).json({ message: "Skills added successfully" });
        }
    } catch (error) {
        Logger.error("Failed to add skills: ", error);
        res.status(500).json({ error: "Failed to add skills" });
    }
};

export const addSkill = async (req, res) => {
    try {
        const skill = req.body;
        Logger.info("Adding skill: ", { skill });
        if (!skill.name || !skill.type) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        if (!skill.user_id) {
            console.log("user id is from db")
            const user = await getActiveUser();
            skill.user_id = user.data[0].id;
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

export const activeSkills = async (req, res) => {
    try {
        const result = await activeskill();
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
