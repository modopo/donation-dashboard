import mongoose from "mongoose";

const DistributionSchema = new mongoose.Scheme(
  {
    authorized: {
      type: Stirng,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    distribution: {
      items: [
        {
          enum: ["food", "cash", "items"],
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
