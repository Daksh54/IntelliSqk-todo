import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import { createTodo, listTodos, updateTodo, deleteTodo } from "../controllers/todoController";

const router = Router();

router.get("/", auth, listTodos);
router.post("/", auth, createTodo);
router.put("/:id", auth, updateTodo);
router.delete("/:id", auth, deleteTodo);

export default router;
