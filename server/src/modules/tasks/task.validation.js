import { z } from "zod";

export const createTaskSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3, "Task title must be at least 3 characters.")
        .max(150),

    description: z
        .string()
        .trim()
        .max(5000)
        .optional(),

    assigned_to: z
        .string()
        .optional(),

    parent_task_id: z
        .string()
        .optional(),

    priority: z
        .enum([
            "LOW",
            "MEDIUM",
            "HIGH",
            "URGENT",
        ])
        .optional(),

    status: z
        .enum([
            "PENDING",
            "IN_PROGRESS",
            "DONE",
        ])
        .optional(),

    start_date: z
        .string()
        .optional(),

    due_date: z
        .string()
        .optional(),
});