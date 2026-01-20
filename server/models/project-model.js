import sql from "../config/database-conection.js";

export const addProject = (project) => {
    return sql.from("projects").insert([{
        user_id: project.user_id,
        title: project.title,
        client: project.client,
        role: project.role,
        year: project.year,
        state: project.state,
        sort_order: project.sort_order,
        description: project.description,
        github_url: project.github_url,
        technologies: project.technologies,
        images: project.images
    }]).select("id");
};
export const getProjectByUserId = (id) => {
    return sql.from("projects").select("*").eq("user_id", id).select("*");
};
export const getProjectById = (id) => {
    return sql.from("projects").select("*").eq("id", id).select("*");
};
export const deleteProject = (id) => {
    return sql.from("projects").delete().eq("id", id).select("*");
};
export const updateProject = (project, id) => {
    console.log("Updating project with data here", project);
    return sql.from("projects").update({
        title: project.title,
        client: project.client,
        role: project.role,
        year: project.year,
        state: project.state,
        sort_order: project.sort_order,
        description: project.description,
        github_url: project.github_url,
        technologies: project.technologies,
        images: project.images
    })
        .eq("id", id)
        .select();
};
export const updateProjectImages = (projectID, urls) => {
    return sql.from("projects").update({
        images: urls
    })
        .eq("id", projectID)
        .select();
};

export const activeProjects = () => {
    return sql.from("projects").select("*,users!inner(is_active)").eq("users.is_active", true);
};