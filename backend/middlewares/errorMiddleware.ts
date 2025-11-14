import { Request, Response, NextFunction } from "express";
import { Log } from "../models/logModel";

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  try {
    await Log.create({
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });
  } catch (logErr) {
    console.error("Failed to write log", logErr);
  }
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
};
