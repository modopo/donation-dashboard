import express from "express";
import {
  getAllBanks,
  getAllFood,
  getAllItems,
  getAllMoney,
} from "../controllers/general.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:id", verifyToken, getAllBanks);
router.get("/:id/food", verifyToken, getAllFood);
router.get("/:id/items", verifyToken, getAllItems);
router.get("/:id/money", verifyToken, getAllMoney);

export default router;
