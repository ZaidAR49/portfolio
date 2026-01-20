import express from "express";
import { uploadPicture, uploadImages, deletePicture, deleteImages } from "../controllers/cloud-controller.js";
import multer from "multer";
import { checksecuritycode } from "../middlewares/auth-middleware.js";
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB
    }
});


const router = express.Router();

router.post("/upload/picture", checksecuritycode, uploadPicture);
router.post("/upload/images/:projectID", checksecuritycode, upload.array("images", 5), uploadImages);
router.delete("/delete/picture", checksecuritycode, deletePicture);
router.delete("/delete/images", checksecuritycode, deleteImages);

export default router;
