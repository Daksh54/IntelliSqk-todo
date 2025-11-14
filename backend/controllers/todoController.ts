import { Request, Response } from "express";
import { Todo } from "../models/todoModel";
import { AuthedRequest } from "../middlewares/authMiddleware";
import mongoose from "mongoose";

export const createTodo = async (req: AuthedRequest, res: Response) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "title required" });
  const todo = await Todo.create({ userId: req.user.id, title });
  res.status(201).json(todo);
};

export const listTodos = async (req: AuthedRequest, res: Response) => {
  const todos = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(todos);
};

export const updateTodo = async (req: AuthedRequest, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });
  const { title, completed } = req.body;
  const todo = await Todo.findOneAndUpdate({ _id: id, userId: req.user.id }, { title, completed }, { new: true });
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
};

export const deleteTodo = async (req: AuthedRequest, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json({ message: "Deleted" });
};
