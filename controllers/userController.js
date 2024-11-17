import User from "../models/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/index.js";

// Register User
const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body; // You might want to add role during registration
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword, role }); // Add role to user schema
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role, // Include role in response
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Login User and Generate JWT Token
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPasswords(password))) {
      return res.status(401).json({
        error: "Invalid login credentials",
      });
    }

    const token = await generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      token,
      role: user.role, // Include the role here
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  registerUser,
  loginUser,
};
