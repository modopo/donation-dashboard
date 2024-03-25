import express from "express";
import {
  getStaffRecordedDonations,
  getAllDonations,
  addDonation,
  updateDonation,
  deleteDonation,
} from "../controllers/donation.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:id/donations", verifyToken, getStaffRecordedDonations);
router.get("/:id/donationList", verifyToken, getAllDonations);

//POST
router.post("/:id/addDonation", verifyToken, addDonation);

//UPDATE
router.patch("/:id/:donationId/update", verifyToken, updateDonation);

//DELETE
router.get("/:id/:donationId/delete", verifyToken, deleteDonation);

export default router;
