import { z } from "zod";

export const todoSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1),
  completed: z.boolean().optional()
});
