import { updateUserPicture } from "../models/user-model.js";
import { updateProjectImages } from "../models/project-model.js";
import { uploadPictureHelper, uploadImagesHelper } from "../helpers/cloud-helper.js";
import { filesToBase64 } from "../helpers/file-to-base64-helper.js";
import Logger from "../helpers/logger-helper.js";
export const uploadPicture = async (req, res) => {
    try {
        const { userID, picture } = req.body;
        Logger.info(`Starting picture upload for User ID: ${userID}`, { pictureLength: picture ? picture.length : 0 });
        if (!picture || !userID) {
            Logger.warn("No file or user data uploaded");
            return res.status(400).json({ error: "No file or user data uploaded" });
        }
        const url = await uploadPictureHelper(picture);
        // Logger.success("Image uploaded to cloud", { url });
        await updateUserPicture(userID, url);
        Logger.success("Profile picture updated successfully", { url });
        res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        Logger.error("Error uploading file", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
};
export const uploadImages = async (req, res) => {
    try {
        const files = req.files;
        const projectID = req.params.projectID;
        Logger.info(`Starting images upload for Project ID: ${projectID}`, { fileCount: files ? files.length : 0 });

        if (!files || !projectID) {
            Logger.warn("No file or project data uploaded");
            return res.status(400).json({ error: "No file or project data uploaded" });
        }
        const base64Images = filesToBase64(files);
        const urls = await uploadImagesHelper(base64Images);
        await updateProjectImages(projectID, urls);
        Logger.success("Project images uploaded and updated successfully", { urls });
        res.status(200).json({ message: "Files uploaded successfully" });
    } catch (error) {
        Logger.error("Error uploading file", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
}