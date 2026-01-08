import express from "express";
import { addUser } from "../controllers/user-controller.js";
const router = express.Router();

router.post("/add", addUser);

//router.get("/:portfolioName", getUserByPortfolioName);

export default router;
