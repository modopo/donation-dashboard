import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
      min: 5,
    },
    role: {
      type: String,
      enum: ["staff", "admin"],
      default: "staff",
    },
    donations: {
      type: [mongoose.Types.ObjectId],
      ref: "Donation",
      default: [],
    },
    distributions: {
      type: [mongoose.Types.ObjectId],
      ref: "Distriubtion",
      default: [],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);
export default User;
