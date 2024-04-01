import User from "../models/User.js";
import Donation from "../models/Donation.js";
import Money from "../models/Money.js";
import Food from "../models/Food.js";
import Item from "../models/Items.js";

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
    const newDonation = new Donation({
      donorName: donorName,
      donation: [...donation],
    });

    const saved = await newDonation.save();

    const user = await User.findById(id);
    user.donations.push(saved._id);
    await user.save();

    for (let obj of donation) {
      console.log(obj.type);
      if (obj.type === "cash") {
        console.log("before find");
        const doesExist = await Money.find({ currencyType: obj.itemName });
        console.log("result of doesExist: ", doesExist);
        if (!doesExist.length) {
          const newCash = new Money({
            currencyType: obj.itemName,
            totalAmount: obj.quantity,
          });
          await newCash.save();
        } else {
          doesExist[0].totalAmount += obj.quantity;
          await doesExist[0].save();
        }
      } else if (obj.type === "food") {
        const doesExist = await Food.find({ name: obj.itemName });
        if (!doesExist.length) {
          const newFood = new Food({
            name: obj.itemName,
            count: obj.quantity,
          });
          await newFood.save();
        } else {
          doesExist[0].count += obj.quantity;
          await doesExist[0].save();
        }
      } else if (obj.type === "item") {
        const doesExist = await Item.find({ name: obj.itemName });
        if (!doesExist.length) {
          const newItem = new Item({
            name: obj.itemName,
            count: obj.quantity,
          });
          await newItem.save();
        } else {
          doesExist[0].count += obj.quantity;
          await doesExist[0].save();
        }
      }
    }

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
