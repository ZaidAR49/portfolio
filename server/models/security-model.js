import sql from "../config/database-conection.js";

export const resetSecurityCode = async (securityCode) => {
    try {
        await sql.from("secret_key").delete().neq('id', 0);
        await sql.from("secret_key").insert({ secret: securityCode });

    } catch (error) {
        console.error(error);
    }
};

export const getStoredSecurityCode = async () => {
    try {
        const result = await sql.from("secret_key").select("secret").single();
        
        return result.data.secret;
    } catch (error) {
        console.error(error);

    }
}