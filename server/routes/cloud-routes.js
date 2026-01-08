import express from "express";
import { uploadPicture } from "../controllers/cloud-controller.js";



const router = express.Router();

router.post("/upload/picture", uploadPicture);

export default router;
