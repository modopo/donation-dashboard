import express from "express";
import {
  getStaffRecordedDonations,
  getAllDonations,
  addDonation,
  updateDonation,
} from "../controllers/donation.js";

const router = express.Router();

//READ
router.get("/:id/donations", verifyToken, getStaffRecordedDonations);
router.get("/:id/donationList", verifyToken, getAllDonations);

//POST
router.post("/:id/addDonation", verifyToken, addDonation);

//UPDATE
router.patch("/:id/updateDonation", verifyToken, updateDonation);

export default router;
