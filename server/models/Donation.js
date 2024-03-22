import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    donation: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

const Donation = mongoose.model("Donation", DonationSchema);
export default Donation;
