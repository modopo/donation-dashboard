import express from "express";
import {
  getStaffRecordedDistributions,
  getAllDistributions,
  addDistribution,
  updateDistribution,
  deleteDistribution,
} from "../controllers/distribution.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:id/distribution", verifyToken, getStaffRecordedDistributions);
router.get("/:id/distributionList", verifyToken, getAllDistributions);

//POST
router.post("/:id/addDistribution", verifyToken, addDistribution);

//UPDATE
router.patch("/:id/:distributionId/update", verifyToken, updateDistribution);

//DELET
router.patch("/:id/:distributionId/delete", verifyToken, deleteDistribution);

export default router;
