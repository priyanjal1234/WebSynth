const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async function (req, res) {
  try {
    let { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "You are already registered" });
    }
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    user = await userModel.create({
      name,
      email,
      password: hash,
    });
    let token = jwt.sign({ name, email }, process.env.JWT_KEY);
    res.cookie("token", token);
    return res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error in registering user",
    });
  }
};

const loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "You are not registered" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      let token = jwt.sign({ email, name: user.name }, process.env.JWT_KEY);
      res.cookie("token", token);
      return res.status(200).json({ message: "Login Successfull" });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error in logging in the user",
    });
  }
};

const logoutUser = function (req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Success" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "Error logging out the user",
      });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
