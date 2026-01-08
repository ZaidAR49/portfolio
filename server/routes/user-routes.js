import express from "express";
import { addUser, getAllUsers, getUserByPortfolioName, updateUser, deleteUser } from "../controllers/user-controller.js";

const router = express.Router();

router.post("/add", addUser);
router.get("/all", getAllUsers);
router.get("/:portfolioName", getUserByPortfolioName);
router.put("/update/:portfolioName", updateUser);
router.delete("/delete/:id", deleteUser);

//router.get("/:portfolioName", getUserByPortfolioName);

export default router;
