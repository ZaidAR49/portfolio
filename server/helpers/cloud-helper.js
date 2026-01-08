import cloudinary from "../config/cloud-connection.js";
export const uploadPictureHelper = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file);
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}
export const uploadImagesHelper = async (files) => {
    try {
        const results = await Promise.all(files.map(file => cloudinary.uploader.upload(file)));
        return results.map(result => result.secure_url);
    } catch (error) {
        console.error("Error uploading files:", error);
        throw error;
    }
}
