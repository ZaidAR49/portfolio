import { checksecuritycode } from "../middlewares/auth-middleware.js";
import express from "express";
import { sendsecuritycode, pass } from "../controllers/security-controller.js";
const router = express.Router();
router.post("/checksecuritycode", checksecuritycode, pass);
router.post("/sendsecuritycode", sendsecuritycode);

export default router;


