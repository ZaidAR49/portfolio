
import express from "express";
import { contactus } from "../controllers/contact-controller.js";
const router = express.Router();
router.post("/contact", contactus);
export default router;
