import sql from "../config/database-conection.js";

export const getExperiencesCount = async () => {
    const { count, error } = await sql
        .from('experiences')
        .select('*', { count: 'estimated' });
    if (error) {
        console.error('Error getting experiences count:', error);
        throw error;
    }
    return count;
}
export const addExperience = (experience) => {
    return sql.from("experiences").insert([{
        user_id: experience.userID,
        role: experience.role,
        company: experience.company,
        period: experience.period,
        description: experience.description
    }]).select("id");
};
export const getExperienceByUserId = (id) => {
    return sql.from("experiences").select("*").eq("user_id", id).select("*");
};
export const getExperienceById = (id) => {
    return sql.from("experiences").select("*").eq("id", id).select("id");
};
export const deleteExperience = (id) => {
    return sql.from("experiences").delete().eq("id", id).select("id");
};
export const updateExperience = (experience) => {
    console.log("Updating experience with data here", experience);
    return sql.from("experiences").update({
        role: experience.role,
        company: experience.company,
        period: experience.period,
        description: experience.description
    })
        .eq("id", experience.id)
        .select();
};

export const getActiveExperiences = () => {
    return sql.from('experiences').select('*, users!inner(is_active)').eq('users.is_active', true);
};