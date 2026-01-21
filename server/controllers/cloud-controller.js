import { updateUserPicture } from "../models/user-model.js";
import { updateProjectImages, getProjectById } from "../models/project-model.js";
import { uploadPictureHelper, uploadImagesHelper, deletePictureHelper, deleteImagesHelper } from "../helpers/cloud-helper.js";
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
        const newUrls = await uploadImagesHelper(base64Images);
        const data = await getProjectById(projectID);
        console.log("project id :", projectID);
        console.log("data", data);
        const oldUrls = data.data[0]?.images || [];
        // console.log("oldUrls", oldUrls);
        // console.log("newUrls", newUrls);
        // console.log("count", oldUrls.length + newUrls.length);
        const result = await updateProjectImages(projectID, [...oldUrls, ...newUrls]);
        //  console.log("result", result);
        Logger.success("Project images uploaded and updated successfully", { urls: newUrls });
        res.status(200).json({ message: "Files uploaded successfully" });
    } catch (error) {
        Logger.error("Error uploading file", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
}
export const deletePicture = async (req, res) => {
    try {
        const { url } = req.body;
        Logger.info(`Starting picture deletion for URL: ${url}`);
        if (!url) {
            Logger.warn("No URL provided");
            return res.status(400).json({ error: "No URL provided" });
        }
        const { result } = await deletePictureHelper(url);
        Logger.success("Picture deleted successfully", { result });
        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        Logger.error("Error deleting file", error);
        res.status(500).json({ error: "Failed to delete file" });
    }
}

export const deleteImages = async (req, res) => {
    try {
        const { urls, projectID } = req.body;
        Logger.info(`Starting images deletion for URLs: ${urls}`);
        if (!urls || !Array.isArray(urls) || !projectID) {
            Logger.warn("No URLs or project data provided");
            return res.status(400).json({ error: "No URLs or project data provided" });
        }
        const results = await deleteImagesHelper(urls);
        Logger.success("Images deleted from cloud successfully", { results });
        // from db
        const data = await getProjectById(projectID);
        const oldUrls = data.data[0].images;
        const newUrls = oldUrls.filter((url) => !urls.includes(url));
        await updateProjectImages(projectID, newUrls);
        Logger.success("Images deleted from db successfully", { newUrls });
        res.status(200).json({ message: "Files deleted successfully" });
    } catch (error) {
        Logger.error("Error deleting files", error);
        res.status(500).json({ error: "Failed to delete files" });
    }
}