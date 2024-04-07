import express from "express";
import {
  getAllBanks,
  getAllFood,
  getAllItems,
  getAllMoney,
} from "../controllers/general.js";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

//READ
router.get("/", verifyToken, getAllBanks);
router.get("/food", verifyToken, getAllFood);
router.get("/items", verifyToken, getAllItems);
router.get("/money", verifyToken, getAllMoney);

export default router;
