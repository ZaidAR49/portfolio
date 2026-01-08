import { updateuserPicture } from "../models/user-model.js";
import { uploadPictureHelper } from "../helpers/cloud-helper.js";
export const uploadPicture = async (req, res) => {

    try {
        const { userID, picture } = req.body;
        console.log("userID:", userID);
        // console.log("picture:", picture); // Avoid logging large string
        if (!picture || !userID) {
            console.log("No file or user data uploaded");
            return res.status(400).json({ error: "No file or user data uploaded" });

        }
        // need to get the url from cloudinary ✅
        // frotend is not ready
        //helper function ✅
        //cloud connection config ✅

        const url = await uploadPictureHelper(picture);
        console.log("image url:", url);
        await updateuserPicture(userID, url);
        console.log("File uploaded successfully");
        res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
};