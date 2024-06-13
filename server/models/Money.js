import mongoose from "mongoose";

const MoneySchema = new mongoose.Schema({
  currencyType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  { timestamps: true },
});

const Money = mongoose.model("Money", MoneySchema);
export default Money;
