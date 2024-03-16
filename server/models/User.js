import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
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
      required: true,
      min: 5,
    },
    role: {
      type: String,
      enum: ["staff", "admin"],
      default: "staff",
    },
    donations: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);
export default User;
