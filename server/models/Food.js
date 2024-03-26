import mongoose from "mongoose";

const FoodSchema = new mongoose.Scheme({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  description: {
    type: String,
  },
  count: {
    type: Number,
    required: true,
  },
});

const Food = mongoose.model("Food", FoodSchema);
export default Food;
