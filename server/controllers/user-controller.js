import { adduser, getUserByPortfolioName } from "../models/user-model.js";

export const addUser = async (req, res) => {
    try {
        const user = req.body;
        console.log("user :", user);
        if (!user.email || !user.name || !user.job_title || !user.hero_description || !user.about_description || !user.capabilities_description || !user.about_title || !user.linkedin_url || !user.github_url || !user.resume_url || !user.portfolio_name) {
            console.log("Missing required fields in mapped user:", user);
            return res.status(400).json({ error: "Missing required fields" });

        }
        console.log("all exists");
        const result = await adduser(user);
        console.log("result :", result);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Failed to add user" });
    }
};