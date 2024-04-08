import User from "../models/User.js";
import Donation from "../models/Donation.js";
import Money from "../models/Money.js";
import Food from "../models/Food.js";
import Item from "../models/Items.js";

//GET donations
export const getStaffRecordedDonations = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;
    const user = await User.findById(id);
    const donations = null;

    if (!startDate && !endDate) {
      donations = await Promise.all(
        user.donations.map((id) => Donation.findById(id)),
      );
    } else {
      donations = await Donation.find({
        _id: id,
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      });
    }

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

export const getDonationByDonator = async (req, res) => {
  try {
    const { donator } = req.body;
    const donations = await Donation.aggregate([
      { $match: { donorName: donator } },
      { $unwind: "$donation" },
      { $group: { _id: "$donation.type", donations: { $push: "$$ROOT" } } },
    ]);
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

    for (let obj of donation) {
      let Model = null;
      let query = { name: obj.itemName };
      console.log(obj);

      switch (obj.type) {
        case "cash":
          Model = Money;
          query = { currencyType: obj.itemName };
          break;
        case "food":
          Model = Food;
          query = { name: obj.itemName };
          break;
        case "item":
          Model = Item;
          query = { name: obj.itemName };
          break;
        default:
          break;
      }

      const doesExist = await Model.find(query);

      if (!doesExist.length) {
        const newModel = new Model({
          ...query,
          quantity: obj.quantity,
        });
        await newModel.save();
      } else {
        doesExist[0].quantity += obj.quantity;
        await doesExist[0].save();
      }
    }

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
    const { donorName, donation } = req.body;
    const update = await Donation.findById(donationId);

    for (let obj of donation) {
      let existing = null;
      if (obj.type === "cash") {
        existing = await Money.find({ currencyType: obj.itemName });
      } else if (obj.type === "item") {
        existing = await Item.find({ name: obj.itemName });
      } else if (obj.type === "food") {
        existing = await Food.find({ name: obj.itemName });
      }

      if (existing) {
        if (existing[0].quantity > obj.quantity) {
          existing[0].quantity -= existing[0].quantity - obj.quantity;
        } else if (existing[0].quantity < obj.quantity) {
          existing[0].quantity += obj.quantity - existing[0].quantity;
        }
        await existing[0].save();
      }
    }

    update.donorName = donorName;
    update.donation = donation;
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
