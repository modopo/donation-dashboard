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
    const user = await User.findById(id);
    const newDistribution = new Distribution({
      authorizedBy: authorizedBy,
      distribution: [...distribution],
    });
    const saved = await newDistribution.save();

    user.distribution.push(saved._id);
    await user.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//UPDATE distributions
export const updateDistribution = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorizedBy, distribution } = req.body;
    const update = await Distribution.findById(id);

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
