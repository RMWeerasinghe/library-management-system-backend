import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findAdminbyUsername } from "../models/adminModel.js";

dotenv.config();

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await findAdminbyUsername(username);
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const validPassword = await bcrypt.compare(password, admin.password_hash);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { username: admin.username, password : admin.password_hash },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};
