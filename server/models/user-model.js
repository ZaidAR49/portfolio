import sql from "../config/database-conection.js";

export const getUsersCount = async () => {
    const { count, error } = await sql
        .from('users')
        .select('*', { count: 'estimated' });
    if (error) {
        console.error('Error getting users count:', error);
        throw error;
    }
    return count;
}
export const getUserByPortfolioName = (portfolioName) => {
    return sql.from("users").select("*").eq("portfolio_name", portfolioName);
}
export const getAllUsers = () => {
    return sql.from("users").select("*");
}
export const adduser = async (user) => {
    return await sql.from("users").insert([
        {
            name: user.name,
            job_title: user.job_title,
            email: user.email,
            hero_description: user.hero_description,
            about_description: user.about_description,
            capabilities_description: user.capabilities_description,
            about_title: user.about_title,
            linkedin_url: user.linkedin_url,
            github_url: user.github_url,
            resume_url: user.resume_url,
            portfolio_name: user.portfolio_name,
            picture_url: user.picture_url
        }]).select("id");
}
export const updateUser = (user) => {
    return sql.from("users").update({
        name: user.name,
        job_title: user.job_title,
        email: user.email,
        hero_description: user.hero_description,
        about_description: user.about_description,
        capabilities_description: user.capabilities_description,
        about_title: user.about_title,
        linkedin_url: user.linkedin_url,
        github_url: user.github_url,
        resume_url: user.resume_url,
        portfolio_name: user.portfolio_name
    }).eq("id", user.id).select("*");
}
export const deleteUser = (id) => {
    return sql.from("users").delete().eq("id", id).eq("is_active", false).select();
}
export const updateUserPicture = (userID, url) => {
    return sql.from("users").update({ picture_url: url }).eq("id", userID);
}
export const activateUser = async (id) => {
    await sql.from("users").update({ is_active: false }).eq("is_active", true);
    return sql.from("users").update({ is_active: true }).eq("id", id).select();
}
export const deactivateUser = (id) => {
    return sql.from("users").update({ is_active: false }).eq("id", id).select();
}
export const getActiveUser = () => {

    return sql.from("users").select("*").eq("is_active", true);
}
