import mongoose from "mongoose";

const MoneySchema = new mongoose.Schema({
  currencyType: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

const Money = mongoose.model("Money", MoneySchema);
export default Money;
