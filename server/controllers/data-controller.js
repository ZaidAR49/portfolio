import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rewriteData = async (req, res) => {
    try {
        const data = req.body;

        // Path to client/src/data/data.json
        // Assuming server is in project/server and client is in project/client
        const dataPath = path.join(__dirname, '../../client/src/data/data.json');

        await fs.writeFile(dataPath, JSON.stringify(data, null, 4), 'utf8');

        console.log(`Data rewritten to ${dataPath}`);
        res.status(200).json({ message: "Data rewritten successfully" });
    } catch (error) {
        console.error("Error rewriting data:", error);
        res.status(500).json({ error: "Failed to rewrite data" });
    }
};
