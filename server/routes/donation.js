import express from "express";
import {
  getStaffRecordedDonations,
  getAllDonations,
  getDonationByDonator,
  addDonation,
  updateDonation,
  deleteDonation,
} from "../controllers/donation.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:id", verifyToken, getStaffRecordedDonations);
router.get("/:id/allDonations", verifyToken, getAllDonations);
router.get("/:id/donator", verifyToken, getDonationByDonator);

//POST
router.post("/:id/addDonation", verifyToken, addDonation);

//UPDATE
router.patch("/:id/:donationId/update", verifyToken, updateDonation);

//DELETE
router.get("/:id/:donationId/delete", verifyToken, deleteDonation);

export default router;
