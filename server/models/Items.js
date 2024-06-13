import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
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
  { timestamps: true },
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;
