const user = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const signup = async (req, res) => {
  try {
    const { userName, userEmail, password } = req.body;
    const existingUser = await user.find({ userEmail });
    if (!existingUser)
      return res.status(400).json({ message: "UserEmail is already exists." });
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ userName, userEmail, password: hashPassword });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const login = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const findUser = await user.findOne({ userEmail });
    if (!findUser) return res.status(404).json({ message: "User Not Found" });
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });
    const token = Jwt.sign(
      {
        userID: findUser._id,
        userName: findUser.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const logout = async (req, res) => {
  try {
    res.json({ message: "Logged Out Sucessfully" });
  } catch (err) {
    res.send({
      status: 500,
      message: "Server error",
    });
  }
};
module.exports = { signup, login, logout };
