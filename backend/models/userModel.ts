import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

export const User = model<IUser>("User", userSchema);
