import { updateUserPicture } from "../models/user-model.js";
import { updateProjectImages } from "../models/project-model.js";
import { uploadPictureHelper, uploadImagesHelper } from "../helpers/cloud-helper.js";
import { filesToBase64 } from "../helpers/file-to-base64-helper.js";
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
        const files = req.files;
        const projectID = req.params.projectID;
        console.log("projectID:", projectID);
        console.log("files:", files);
        if (!files || !projectID) {
            console.log("No file or project data uploaded");
            return res.status(400).json({ error: "No file or project data uploaded" });
        }
        const base64Images = filesToBase64(files);
        const urls = await uploadImagesHelper(base64Images);
        await updateProjectImages(projectID, urls);
        console.log("Files uploaded successfully");
        res.status(200).json({ message: "Files uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
}