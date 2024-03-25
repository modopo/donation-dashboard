import User from "../models/User.js";
import Donation from "../models/Donation.js";

//GET donations
export const getStaffRecordedDonations = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const donations = await Promise.all(
      user.donations.map((id) => Donation.findById(id)),
    );

    res.status(200).json(donations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//POST donations
export const addDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const { donorName, donation } = req.body;
    console.log(donation);
    const newDonation = new Donation({
      donorName: donorName,
      donation: [...donation],
    });

    const saved = await newDonation.save();

    const user = await User.findById(id);
    user.donations.push(saved._id);
    await user.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(409).json({ message: error.messsage });
  }
};

//UPDATE donations
export const updateDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { donorName, donations } = req.body;
    const update = await Donation.findById(donationId);

    update.donorName = donorName;
    update.donation = donations;
    await update.save();

    res.status(200).json(update);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//DELETE donation
export const deleteDonation = async (req, res) => {
  try {
    const { id, donationId } = req.params;
    const user = await User.findById(id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Donation.deleteOne({ _id: donationId });
    const donationUser = await User.find({ donations: donationId });
    donationUser[0].donations.pull(donationId);
    await donationUser[0].save();
    res.status(200).redirect("/");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
