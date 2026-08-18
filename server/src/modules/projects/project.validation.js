import { z } from "zod";

export const createProjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Project name must be at least 3 characters.")
        .max(150),

    description: z
        .string()
        .trim()
        .max(5000)
        .optional(),

    status: z
        .enum([
            "PLANNING",
            "ACTIVE",
            "ON_HOLD",
            "COMPLETED",
            "ARCHIVED",
        ])
        .optional(),

    start_date: z
        .string()
        .optional(),

    due_date: z
        .string()
        .optional(),
});
export const updateProjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3)
        .max(150)
        .optional(),

    description: z
        .string()
        .trim()
        .max(5000)
        .optional(),

    status: z
        .enum([
            "PLANNING",
            "ACTIVE",
            "ON_HOLD",
            "COMPLETED",
            "ARCHIVED",
        ])
        .optional(),

    start_date: z.string().optional(),
    due_date: z.string().optional(),
});