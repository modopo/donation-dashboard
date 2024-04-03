import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Food = mongoose.model("Food", FoodSchema);
export default Food;
