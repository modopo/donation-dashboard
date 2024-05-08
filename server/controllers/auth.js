import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Register User
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("Already registered");

    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "Invalid login. " });

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect)
      return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const userObj = user.toObject();
    delete userObj.password;
    res.status(200).json({ token, userObj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
