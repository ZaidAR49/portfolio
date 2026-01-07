import { updateuserPicture } from "../models/user-model.js";
import { cloudHelper } from "../helpers/cloud-helper.js";
export const uploadPicture = async (req, res) => {

    try {
        const userID = req.body;
        const file = req.file;
        if (!file || !userID) {
            return res.status(400).json({ error: "No file or user data uploaded" });
        }
        // need to get the url from cloudinary
        // frotend is not ready
        //helper function
        //cloud connection config
        const url = await cloudHelper(file);
        await updateuserPicture(userID, url);
        res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
};