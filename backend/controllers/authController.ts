import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";
import { signToken } from "../utils/jwt";
import crypto from "crypto";

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "email & password required" });
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "Email already in use" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });
  const token = signToken({ id: user._id, email: user.email });
  res.status(201).json({ token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "email & password required" });
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Invalid credentials" });
  const token = signToken({ id: user._id, email: user.email });
  res.json({ token });
};

export const requestReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "email required" });
  const user = await User.findOne({ email });
  if (!user) return res.status(200).json({ message: "If user exists, reset email sent" });
  // NOTE: In assignment we can skip actual email sending; create token and return masked response.
  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60);
  await user.save();
  // For assignment only: return token so UI can simulate reset flow (in production email token instead).
  res.json({ resetToken: token });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ message: "token & password required" });
  const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: new Date() } });
  if (!user) return res.status(400).json({ message: "Invalid or expired token" });
  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();
  res.json({ message: "Password reset successful" });
};
