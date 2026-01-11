import {
    adduser, getUserByPortfolioName as getuserByPortfolioName, getAllUsers as getallusers
    , updateUser as updateuser, deleteUser as deleteuser, activateUser as activateuser,
    deactivateUser as deactivateuser, getActiveUser as getactiveuser
} from "../models/user-model.js";
import Logger from "../helpers/logger-helper.js";

export const addUser = async (req, res) => {
    try {
        const user = req.body;
        Logger.info("Adding new user", user);
        if (!user.email || !user.name || !user.job_title || !user.hero_description || !user.about_description || !user.capabilities_description || !user.about_title || !user.linkedin_url || !user.github_url || !user.resume_url || !user.portfolio_name) {
            Logger.warn("Missing required fields in mapped user", user);
            return res.status(400).json({ error: "Missing required fields" });

        }
        // Logger.debug("All required fields present");
        const result = await adduser(user);
        if (result.error) {
            Logger.error("Failed to add user due to conflict", user);
            return res.status(409).json({ error: "Failed to add user" });
        }
        Logger.success("User added successfully", result);
        res.status(201).json(result);
    } catch (error) {
        Logger.error("Error adding user", error);
        res.status(500).json({ error: "Failed to add user" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        Logger.info("Fetching all users");
        const users = await getallusers();
        Logger.success(`Fetched ${users ? users.length : 0} users`, users);
        res.status(200).json(users);
    } catch (error) {
        Logger.error("Error getting users", error);
        res.status(500).json({ error: "Failed to get users" });
    }
};

export const getUserByPortfolioName = async (req, res) => {
    try {
        Logger.info(`Fetching user by portfolio name: ${req.params.portfolioName}`);
        const user = await getuserByPortfolioName(req.params.portfolioName);
        Logger.success("Fetched user successfully", user);
        res.status(200).json(user);
    } catch (error) {
        Logger.error("Error getting user", error);
        res.status(500).json({ error: "Failed to get user" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = req.body;
        Logger.info("Updating user", user);
        if (!user.email || !user.name || !user.job_title || !user.hero_description || !user.about_description || !user.capabilities_description || !user.about_title || !user.linkedin_url || !user.github_url || !user.resume_url || !user.portfolio_name) {
            Logger.warn("Missing required fields in mapped user", user);
            return res.status(400).json({ error: "Missing required fields" });

        }
        // Logger.debug("All required fields present for update");
        const result = await updateuser(user);
        Logger.success("User updated successfully", result);
        res.status(201).json(result);
    } catch (error) {
        Logger.error("Error updating user", error);
        res.status(500).json({ error: "Failed to update user" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        if (!req.params.id) {
            Logger.warn("Missing ID for deleteUser");
            return res.status(400).json({ error: "Missing required fields" });
        }
        Logger.info(`Deleting user ID: ${req.params.id}`);
        const { data, error } = await deleteuser(req.params.id);

        if (error) {
            Logger.error("Supabase delete error", error);
            throw error;
        }

        if (!data || data.length === 0) {
            Logger.warn(`No user found with ID: ${req.params.id}`);
            return res.status(404).json({ error: "User not found or already deleted" });
        }

        Logger.success("Deleted user successfully", data);
        res.status(200).json({ message: "Deleted successfully", data });
    } catch (error) {
        Logger.error("Error deleting user", error);
        res.status(500).json({ error: "Failed to delete user" });
    }
};
export const activateUser = async (req, res) => {
    try {
        if (!req.params.id) {
            Logger.warn("Missing ID for activateUser");
            return res.status(400).json({ error: "Missing required fields" });
        }
        Logger.info(`Activating user ID: ${req.params.id}`);
        const { data, error } = await activateuser(req.params.id);

        if (error) {
            Logger.error("Supabase activation error", error);
            throw error;
        }

        if (!data || data.length === 0) {
            Logger.warn(`No user found with ID: ${req.params.id}`);
            return res.status(404).json({ error: "User not found or already active" });
        }

        Logger.success("Activated user successfully", data);
        res.status(200).json({ message: "Activated successfully", data });
    } catch (error) {
        Logger.error("Error activating user", error);
        res.status(500).json({ error: "Failed to activate user" });
    }
};
export const deactivateUser = async (req, res) => {
    try {
        if (!req.params.id) {
            Logger.warn("Missing ID for deactivateUser");
            return res.status(400).json({ error: "Missing required fields" });
        }
        Logger.info(`Deactivating user ID: ${req.params.id}`);
        const { data, error } = await deactivateuser(req.params.id);

        if (error) {
            Logger.error("Supabase deactivation error", error);
            throw error;
        }

        if (!data || data.length === 0) {
            Logger.warn(`No user found with ID: ${req.params.id}`);
            return res.status(404).json({ error: "User not found or already deactivated" });
        }

        Logger.success("Deactivated user successfully", data);
        res.status(200).json({ message: "Deactivated successfully", data });
    } catch (error) {
        Logger.error("Error deactivating user", error);
        res.status(500).json({ error: "Failed to deactivate user" });
    }
};
export const getActiveUser = async (req, res) => {
    try {
        Logger.info("Fetching active user");
        const users = await getactiveuser();
        if (users && users.data) {
            Logger.success("Fetched active user", users.data[0]);
            res.status(200).json(users.data[0]);
        } else {
            Logger.warn("No active user found");
            res.status(200).json(null);
        }
    } catch (error) {
        Logger.error("Error getting active user", error);
        res.status(500).json({ error: "Failed to get users" });
    }
};


