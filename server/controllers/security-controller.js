
export const checksecuritycode = async (req, res) => {
    try {
        const { securityCode } = req.body;
        if (securityCode) {
            console.log("Security code correct");
            res.status(200).json({ message: "Security code correct" });

        } else {
            console.log("Security code incorrect");
            res.status(401).json({ message: "Security code incorrect" });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};