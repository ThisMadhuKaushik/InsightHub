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
            "CRITICAL",
        ])
        .optional(),

    status: z
        .enum([
            "TODO",
            "IN_PROGRESS",
            "IN_REVIEW",
            "DONE",
            "BLOCKED",
        ])
        .optional(),

    start_date: z
        .string()
        .optional(),

    due_date: z
        .string()
        .optional(),
});

export const updateTaskSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3, "Task title must be at least 3 characters.")
        .max(150)
        .optional(),

    description: z
        .string()
        .trim()
        .max(5000)
        .optional(),

    assigned_to: z
        .string()
        .optional(),

    priority: z
        .enum([
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL",
        ])
        .optional(),

    status: z
        .enum([
            "TODO",
            "IN_PROGRESS",
            "IN_REVIEW",
            "DONE",
            "BLOCKED",
        ])
        .optional(),

    start_date: z
        .string()
        .optional(),

    due_date: z
        .string()
        .optional(),
});
export const taskQuerySchema = z.object({
page: z.coerce.number().int().min(1).default(1),
limit: z.coerce.number().int().min(1).max(100).default(10),

status: z
    .enum([
        "TODO",
        "IN_PROGRESS",
        "IN_REVIEW",
        "DONE",
        "BLOCKED",
    ])
    .optional(),

priority: z
    .enum([
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
    ])
    .optional(),

search: z
    .string()
    .trim()
    .max(100)
    .optional(),

});