import { getStoredSecurityCode } from "../models/security-model.js";
export const checksecuritycode = async (req, res, next) => {
    try {
        const securityCode = req.headers["security-code"];
        const storedSecurityCode = await getStoredSecurityCode();
        if (securityCode === storedSecurityCode) {
            console.log("Security code correct");
            next();

        } else {
            console.log("Security code incorrect");
            res.status(401).json({ message: "Security code incorrect" });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};