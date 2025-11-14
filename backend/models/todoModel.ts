import { Schema, model, Document, Types } from "mongoose";

export interface ITodo extends Document {
  userId: Types.ObjectId;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Todo = model<ITodo>("Todo", todoSchema);
