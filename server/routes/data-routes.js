import express from "express";
import { rewriteData } from "../controllers/data-controller.js";

const router = express.Router();

router.post("/rewrite", rewriteData);

export default router;
