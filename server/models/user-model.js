import sql from "../config/database-conection.js";

export const getUserByPortfolioName = (portfolioName) => {
    return sql.query("SELECT * FROM users WHERE name = ?", [portfolioName]);
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
            portfolio_name: user.portfolio_name
        }]).select("id");
}
export const updateuser = (user) => {
    return sql.from("users").where("id", user.id).update(user);
}
export const deleteuser = (id) => {
    return sql.from("users").where("id", id).del();
}
export const updateuserPicture = (userID, url) => {
    return sql.from("users").update({ picture_url: url }).eq("id", userID);
}