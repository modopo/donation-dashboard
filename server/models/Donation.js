import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
    },
    phoneNumber: {
      type: String,
    },
    donation: {
      type: [
        {
          type: {
            type: String,
            enum: ["food", "item", "cash"],
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

const Donation = mongoose.model("Donation", DonationSchema);
export default Donation;
