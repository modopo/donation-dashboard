import User from "../models/User";
import Distribution from "../models/Distribution";

//GET Distribution
export const getStaffRecordedDistributions = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const distributions = await Promise.all(
      user.distributions.map((id) => Distribution.findById(id)),
    );

    res.status(200).json(distributions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllDistributions = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user || user.role !== "admin") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const distributions = await Distribution.find();
    res.status(200).json(distributions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//POST distributions
export const addDistribution = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorizedBy, distribution } = req.body;
    const newDistribution = new Distribution({
      authorizedBy: authorizedBy,
      distribution: [...distribution],
    });

    const saved = await newDistribution.save();

    const user = await User.findById(id);
    user.distribution.push(saved._id);
    await user.save();

    for (let obj of distribution) {
      let Model = null;
      let query = { name: obj.itemName };

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
        doesExist[0].quantity -= obj.quantity;
        await doesExist[0].save();
      }
    }

    res.status(201).json(saved);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//UPDATE distributions
export const updateDistribution = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorizedBy, distribution } = req.body;
    const update = await Distribution.findById(id);

    for (let obj of donation) {
      let existing = null;
      if (obj.type === "cash") {
        existing = await Money.find({ currencyType: obj.itemName });
      } else if (obj.type === "item") {
        existing = await Item.find({ name: obj.itemName });
      } else if (obj.type === "food") {
        existing = await Food.find({ name: obj.itemName });
      }
    }

    if (existing) {
      if (existing[0].quantity > obj.quantity) {
        existing[0].quantity -= existing[0].quantity - obj.quantity;
      } else if (existing[0].quantity < obj.quantity) {
        existing[0].quantity += obj.quantity - existing[0].quantity;
      }
      await existing[0].save();
    }

    update.authorizedBy = authorizedBy;
    update.distribution = distribution;
    await update.save();
    res.status(200).json(update);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//DELETE distribution
export const deleteDistribution = async (req, res) => {
  try {
    const { id, distributionId } = req.params;
    const user = await User.findById(id);
    if (!user || user.role !== "admin") {
      res.status(403).json({ message: "Forbidden" });
    }

    await Distribution.deleteOne({ _id: distributionId });
    const distributionUser = await User.find({ distribuions: distributionId });
    distributionUser[0].distributions.pull(distributionId);
    await distributionUser[0].save();
    res.status(200).redirect("/");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
