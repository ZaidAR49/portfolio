import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
let sql;
try {
    sql = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    console.log("✅ Database connected successfully");
}
catch (error) {
    console.log("❌ Database connection failed");
    console.log(error);
}
export default sql;