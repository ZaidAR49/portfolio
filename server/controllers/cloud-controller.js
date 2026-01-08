import { updateUserPicture } from "../models/user-model.js";
import { updateProjectImages } from "../models/project-model.js";
import { uploadPictureHelper, uploadImagesHelper } from "../helpers/cloud-helper.js";
export const uploadPicture = async (req, res) => {
    try {
        const { userID, picture } = req.body;
        console.log("userID:", userID);
        if (!picture || !userID) {
            console.log("No file or user data uploaded");
            return res.status(400).json({ error: "No file or user data uploaded" });
        }
        const url = await uploadPictureHelper(picture);
        console.log("image url:", url);
        await updateUserPicture(userID, url);
        console.log("File uploaded successfully");
        res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
};
export const uploadImages = async (req, res) => {
    try {
        const { projectID, images } = req.body;
        console.log("projectID:", projectID);
        if (!images || !projectID) {
            console.log("No file or user data uploaded");
            return res.status(400).json({ error: "No file or user data uploaded" });
        }
        const urls = await uploadImagesHelper(images);
        console.log("image urls:", urls);
        await updateProjectImages(projectID, urls);
        console.log("Files uploaded successfully");
        res.status(200).json({ message: "Files uploaded successfully" });
    } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({ error: "Failed to upload files" });
    }
};