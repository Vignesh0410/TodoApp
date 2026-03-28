import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(3).max(100),
  completed: z.boolean().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  completed: z.boolean().optional(),
});
