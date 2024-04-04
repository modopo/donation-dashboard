import mongoose from "mongoose";

const DistributionSchema = new mongoose.Schema(
  {
    authorized: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    distribution: {
      type: [
        {
          type: {
            type: String,
            enum: ["food", "cash", "item"],
          },
          itemName: String,
          quantity: Number,
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

const Distribution = mongoose.model("Distribution", DistributionSchema);
export default Distribution;
