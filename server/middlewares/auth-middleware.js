import { getStoredSecurityCode } from "../models/security-model.js";
import Logger from "../helpers/logger-helper.js"
export const checksecuritycode = async (req, res, next) => {
    try {
        const securityCode = req.headers["security-code"];
        if (!securityCode) {
            Logger.error("Security code not provided");
            res.status(401).json({ message: "Security code not provided" });
            return;
        }
        const storedSecurityCode = await getStoredSecurityCode();
        if (securityCode === storedSecurityCode) {
            Logger.success("Security code correct");
            next();

        } else {
            Logger.error("Security code incorrect");
            res.status(401).json({ message: "Security code incorrect" });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};