
import express from "express";
import { contactus, sendsecuritycode, checksecuritycode } from "../controllers/contact-controller.js";

const router = express.Router();

router.post("/contact", contactus);
router.post("/sendsecuritycode", sendsecuritycode);
router.post("/checksecuritycode", checksecuritycode);

export default router;
