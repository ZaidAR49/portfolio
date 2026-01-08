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