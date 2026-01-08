import sql from "../config/database-conection.js";

export const addExperience = (experience) => {
    return sql.from("experiences").insert([{
        user_id: experience.user_id,
        role: experience.role,
        period: experience.period,
        description: experience.description
    }]).select("id");
};
export const getAllExperiences = () => {
    return sql.from("experiences").select("*").select("id");
};
export const getExperienceById = (id) => {
    return sql.from("experiences").select("*").eq("id", id).select("id");
};
export const deleteExperience = (id) => {
    return sql.from("experiences").delete().eq("id", id).select("id");
};
export const updateExperience = (experience) => {
    return sql.from("experiences").update({
        user_id: experience.user_id,
        role: experience.role,
        period: experience.period,
        description: experience.description
    }).eq("id", experience.id).select("id");
};