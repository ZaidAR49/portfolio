
import axios from "axios";
import { saveToCache } from "../helpers/storage-helper";
const server_url = import.meta.env.VITE_API_URL;
export const getExperiences = async () => {
    try {
        const response = await axios.get(`${server_url}/api/experience/active`);
        if (response.status === 200) {
            const data = response.data.data || response.data;
            saveToCache("experiences", data);
            return data;
        }
    } catch (error) {
        console.error("Error fetching experiences:", error);
        throw error;
    }
};

export const getPortfolios = async () => {
    try {
        const response = await axios.get(`${server_url}/api/user/all`);
        if (response.status === 200) {
            const data = response.data.data || response.data;
            saveToCache("portfolios", data);
            return data;
        }
    } catch (error) {
        console.error("Error fetching portfolios:", error);
        throw error;
    }
};

export const getProjects = async () => {
    try {
        const response = await axios.get(`${server_url}/api/project/active`);
        if (response.status === 200) {
            const data = response.data.data || response.data;
            saveToCache("projects", data);
            return data;
        }
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
};
export const getSkills = async () => {

    try {
        const response = await axios.get(`${server_url}/api/skill/active`);
        const skills = response.data.data || [];

        // Group skills by type
        const main = skills.filter((s: any) => s.type === 'primary');
        const secondary = skills.filter((s: any) => s.type === 'secondary');
        saveToCache("skills", {
            main: main,
            secondary: secondary
        });
        return {
            main: main,
            secondary: secondary
        };

    } catch (error) {
        console.error("Error fetching skills:", error);
        throw error;
    }
};
export const getUser = async () => {
    try {
        const response = await axios.get(`${server_url}/api/user/active`);
        if (response.status === 200) {
            const data = response.data.data || response.data;
            saveToCache("user", data);
            return data;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

