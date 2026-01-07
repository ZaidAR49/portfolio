import sql from "../config/db.js";
export const getUserByJobTitle = (jobTitle) => {
    return sql.query("SELECT * FROM users WHERE job_title = ?", [jobTitle]);
}
export const adduser = (user) => {
    return sql.query("INSERT INTO users SET ?", [user]);
}
export const updateuser = (user) => {
    return sql.query("UPDATE users SET ? WHERE id = ?", [user]);
}