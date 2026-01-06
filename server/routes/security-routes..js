import { checksecuritycode } from "../controllers/security-controller.js";
import express from "express";
const router = express.Router();
router.post("/checksecuritycode", checksecuritycode);
export default router;
