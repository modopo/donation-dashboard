import User from "../models/User";
import Donation from "../models/Donation";

//Read donations
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
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//POST donations
export const addDonation = async (req, res) => {
  try {
    const { id, donorName, donations } = req.params;
    const user = await User.findById(id);
    const newDonation = new Donation({
      donorName: donorName,
      donation: donations,
    });
    const saved = await newDonation.save();

    user.donations.push(saved._id);
    await user.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(409).json({ message: error.messsage });
  }
};
