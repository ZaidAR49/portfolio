import express from "express";
import { addUser } from "../controllers/user-controller.js";
import upload from "../middleware/multer-middleware.js";
const router = express.Router();

router.post("/add", upload.single("picture"), addUser);

//router.get("/:portfolioName", getUserByPortfolioName);

export default router;
