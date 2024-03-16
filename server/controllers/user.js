import User from "../models/User";
import Donation from "../models/Donation";
import Distribution from "../models/Distribution";

//READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserDonations = async (req, res) => {
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

export const getUserDistributions = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const distribution = await Promise.all(
      user.distribution.map((id) => Distribution.findById(id)),
    );

    res.status(200).json(distribution);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
