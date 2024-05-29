import Money from "../models/Money.js";
import Food from "../models/Food.js";
import Item from "../models/Items.js";

//GET
export const getAllBanks = async (req, res) => {
  try {
    const [money, food, items] = await Promise.all([
      Money.find(),
      Food.find(),
      Item.find(),
    ]);

    const allItems = {
      money: money,
      items: items,
      food: food,
    };

    res.status(200).json(allItems);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllFood = async (req, res) => {
  try {
    const food = await Food.find();
    res.status(200).json(food);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllMoney = async (req, res) => {
  try {
    const money = await Money.find();
    res.status(200).json(money);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
