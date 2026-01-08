import express from "express";
import { uploadPicture, uploadImages } from "../controllers/cloud-controller.js";



const router = express.Router();

router.post("/upload/picture", uploadPicture);
router.post("/upload/images", uploadImages);

export default router;
