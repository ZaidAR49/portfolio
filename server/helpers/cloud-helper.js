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
    console.log("Attempting to delete image with URL:", url);

    // Safety check: if it's a blob url or obviously not cloudinary, skip it.
    if (!url || !url.includes('/upload/')) {
        console.warn("Skipping deletion for invalid or non-Cloudinary URL:", url);
        return null;
    }

    const regex = /\/upload\/(?:v\d+\/)?([^\.]+)+\.\w+$/
    const match = url.match(regex);
    if (!match) {
        console.warn("URL format did not match regex, skipping:", url);
        return null; // Don't throw, just skip
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


