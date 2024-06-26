import express from "express";
import {
  getStaffRecordedDistributions,
  getAllDistributions,
  getDistributionByAuthorized,
  addDistribution,
  updateDistribution,
  deleteDistribution,
} from "../controllers/distributions.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:id", verifyToken, getStaffRecordedDistributions);
router.get("/:id/allDistribtuions", verifyToken, getAllDistributions);
router.get("/:id/authorized", verifyToken, getDistributionByAuthorized);

//POST
router.post("/:id/addDistribution", verifyToken, addDistribution);

//UPDATE
router.patch("/:id/:distributionId/update", verifyToken, updateDistribution);

//DELET
router.patch("/:id/:distributionId/delete", verifyToken, deleteDistribution);

export default router;
