import sql from "../config/database-conection.js";

export const getSkillsCount = async () => {
    const { count, error } = await sql
        .from('skills')
        .select('*', { count: 'estimated' });
    if (error) {
        console.error('Error getting skills count:', error);
        throw error;
    }
    return count;
}
export const addSkill = (skill) => {
    return sql.from("skills").insert([
        {
            user_id: skill.user_id,
            name: skill.name,
            type: skill.type
        }
    ]).select("id");
}

export const getallSkills = (user_id) => {
    return sql.from("skills").select("*").eq("user_id", user_id).select("*");
}

export const updateSkill = (skill) => {
    return sql.from("skills").update({
        name: skill.name,
        type: skill.type
    }).eq("id", skill.id).select();
};

export const deleteSkill = (id) => {
    return sql.from("skills").delete().eq("id", id).select("id");
};

export const activeSkills = () => {
    return sql.from("skills").select("*,users!inner(is_active)").eq("users.is_active", true);
}

