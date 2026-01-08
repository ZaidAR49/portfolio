import {
    adduser, getUserByPortfolioName as getuserByPortfolioName, getAllUsers as getallusers
    , updateUser as updateuser, deleteUser as deleteuser
} from "../models/user-model.js";

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

export const getAllUsers = async (req, res) => {
    try {
        const users = await getallusers();
        console.log("users :", users);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ error: "Failed to get users" });
    }
};

export const getUserByPortfolioName = async (req, res) => {
    try {
        const user = await getuserByPortfolioName(req.params.portfolioName);
        console.log("user :", user);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ error: "Failed to get user" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = req.body;
        console.log("user :", user);
        if (!user.email || !user.name || !user.job_title || !user.hero_description || !user.about_description || !user.capabilities_description || !user.about_title || !user.linkedin_url || !user.github_url || !user.resume_url || !user.portfolio_name) {
            console.log("Missing required fields in mapped user:", user);
            return res.status(400).json({ error: "Missing required fields" });

        }
        console.log("all exists");
        const result = await updateuser(user);
        console.log("result :", result);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Failed to add user" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        if (!req.params.id) {
            console.log("Missing required fields");
            return res.status(400).json({ error: "Missing required fields" });
        }
        const { data, error } = await deleteuser(req.params.id);

        if (error) {
            console.error("Supabase delete error:", error);
            throw error;
        }

        if (!data || data.length === 0) {
            console.log("No user found with ID:", req.params.id);
            return res.status(404).json({ error: "User not found or already deleted" });
        }

        console.log("Deleted user:", data);
        res.status(200).json({ message: "Deleted successfully", data });
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ error: "Failed to get user" });
    }
};

