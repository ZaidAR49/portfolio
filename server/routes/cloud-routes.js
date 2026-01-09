import express from "express";
import { uploadPicture, uploadImages } from "../controllers/cloud-controller.js";
import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB
    }
});


const router = express.Router();

router.post("/upload/picture", uploadPicture);
router.post("/upload/images/:projectID", upload.array("images", 5), uploadImages);

export default router;
