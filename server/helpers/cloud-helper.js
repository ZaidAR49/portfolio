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
export const deletePictureHelper = async (url) => {
    console.log("here url", url);
    const regex = /\/upload\/(?:v\d+\/)?([^\.]+)+\.\w+$/
    const match = url.match(regex);
    if (!match) {
        console.error("Invalid URL format");
        throw new Error("Invalid URL format");
    }
    const id = match[1];
    try {
        const result = await cloudinary.uploader.destroy(id);
        console.log("Deleted picture successfully", result);
        return result;
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
}

export const deleteImagesHelper = async (urls) => {
    try {
        console.log("here urls", urls);
        const results = await Promise.all(urls.map(url => deletePictureHelper(url)));
        return results;
    } catch (error) {
        console.error("Error deleting files:", error);
        throw error;
    }
}


