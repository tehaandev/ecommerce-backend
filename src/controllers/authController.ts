import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { connectDB } from "../lib/db";
import User from "../models/User";
import generateJwt from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const user = new User({ name, email, password });
    await user.save();
    const token = await generateJwt({
      userId: user._id,
    });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = await generateJwt({
      userId: user._id,
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

