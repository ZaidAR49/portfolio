
import axios from "axios";
import { saveToCache } from "../helpers/storage-helper";
import data from "./data.json";
import parse from "html-react-parser";
const server_url = import.meta.env.VITE_API_URL;
export const getExperiences = async () => {
    try {
        const response = await axios.get(`${server_url}/api/experience/active`);
        if (response.status === 200) {
            const experiences = response.data.data || response.data;
            const parsedExperiences = experiences.map((exp: any) => ({
                ...exp,
                description: parse(exp.description)
            }));
            saveToCache("experiences", parsedExperiences);
            return parsedExperiences;
        }
    } catch (error) {
        console.error("Error fetching experiences:", error);
        const parsedExperiences = data.experiences.map((exp: any) => ({
            ...exp,
            description: parse(exp.description)
        }));
        return parsedExperiences;
    }
};

export const getPortfolios = async () => {
    try {
        const response = await axios.get(`${server_url}/api/user/all`);
        if (response.status === 200) {
            const portfolios = response.data.data || response.data;
            const parsedPortfolios = portfolios.map((portfolio: any) => ({
                ...portfolio,
                hero_description: parse(portfolio.hero_description),
                about_description: parse(portfolio.about_description),
                capabilities_description: parse(portfolio.capabilities_description),
                about_title: parse(portfolio.about_title)
            }));
            saveToCache("portfolios", parsedPortfolios);
            return parsedPortfolios;
        }
    } catch (error) {
        console.error("Error fetching portfolios:", error);
        const parsedPortfolios = {
            ...data.user,
            hero_description: parse(data.user.hero_description),
            about_description: parse(data.user.about_description),
            capabilities_description: parse(data.user.capabilities_description),
            about_title: parse(data.user.about_title)
        }
        return parsedPortfolios;
    }
};

export const getProjects = async () => {
    try {
        const response = await axios.get(`${server_url}/api/project/active`);
        if (response.status === 200) {
            const projects = response.data.data || response.data;
            const parsedProjects = projects.map((project: any) => ({
                ...project,
                description: parse(project.description)
            }));
            saveToCache("projects", parsedProjects);
            return parsedProjects;
        }
    } catch (error) {
        console.error("Error fetching projects:", error);
        const parsedProjects = data.projects.map((project: any) => ({
            ...project,
            description: parse(project.description)
        }));
        return parsedProjects;
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
        return data.skills;
    }
};
export const getUser = async () => {
    try {
        const response = await axios.get(`${server_url}/api/user/active`);
        if (response.status === 200) {
            const user = response.data.data || response.data;
            const parsedUser = {
                ...user,
                hero_description: parse(user.hero_description),
                about_description: parse(user.about_description),
                capabilities_description: parse(user.capabilities_description),
                about_title: parse(user.about_title)
            }
            saveToCache("user", parsedUser);
            return parsedUser;
        }
    } catch (error) {
        // console.error("Error fetching user:", error);
        const parsedUser = {
            ...data.user,
            hero_description: parse(data.user.hero_description),
            about_description: parse(data.user.about_description),
            capabilities_description: parse(data.user.capabilities_description),
            about_title: parse(data.user.about_title)
        }
        return parsedUser;
    }
};

