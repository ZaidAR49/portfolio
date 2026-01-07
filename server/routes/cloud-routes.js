import express from "express";
import { uploadPicture } from "../controllers/cloud-controller.js";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload/picture", upload.single("picture"), uploadPicture);

export default router;
