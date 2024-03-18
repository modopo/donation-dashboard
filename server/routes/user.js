import express from "express";
import {
  getUser,
  getDonations,
  addRemoveDonation,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/donations", verifyToken, getDonations);

//UPDATE
router.patch("/:id/:donationId", verifyToken, addRemoveDonation);

export default router;
