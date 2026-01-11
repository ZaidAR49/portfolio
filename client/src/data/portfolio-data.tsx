
import axios from "axios";
const server_url = import.meta.env.VITE_API_URL;
export const getExperiences = async () => {
    try {
        const user = await axios.get(`${server_url}/api/user/active`);
        if (user.data && user.data.id) {
            const response = await axios.get(`${server_url}/api/experience/all/${user.data.id}`);
            if (response.status === 200) {
                const data = response.data.data || response.data;
                return data;
            }
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
            return data;
        }
    } catch (error) {
        console.error("Error fetching portfolios:", error);
        throw error;
    }
};

export const getProjects = async () => {
    try {
        const user = await axios.get(`${server_url}/api/user/active`);
        if (user.data && user.data.id) {
            const response = await axios.get(`${server_url}/api/project/all/${user.data.id}`);
            if (response.status === 200) {
                const data = response.data.data || response.data;
                return data;
            }
        }
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
};
export const getSkills = async () => {
    const defaultData = { main: [], secondary: [] };

    try {
        const user = await axios.get(`${server_url}/api/user/active`);

        if (user.data && user.data.id) {
            const response = await axios.get(`${server_url}/api/skill/all/${user.data.id}`);
            const skills = response.data.data || [];

            // Group skills by type
            const main = skills.filter((s: any) => s.type === 'primary');
            const secondary = skills.filter((s: any) => s.type === 'secondary');
            return {
                main: main,
                secondary: secondary
            };
        }
    } catch (error) {
        console.error("Error fetching skills:", error);
        throw error;
    }
    return defaultData;
};
export const getUser = async () => {
    try {
        const response = await axios.get(`${server_url}/api/user/active`);
        if (response.status === 200) {
            const data = response.data.data || response.data;
            return data;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

