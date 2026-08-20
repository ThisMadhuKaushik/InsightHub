import { z } from "zod";


export const updateUserSchema = z.object({

    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters.")
        .max(100)
        .optional(),

    phone: z
        .string()
        .trim()
        .min(10, "Phone number must be at least 10 characters.")
        .max(20)
        .optional(),

    role: z
        .enum([
            "OWNER",
            "ADMIN",
            "MANAGER",
            "MEMBER",
        ])
        .optional(),

    status: z
        .enum([
            "ACTIVE",
            "INACTIVE",
        ])
        .optional(),
});
export const updateUserSchema = z.object({

    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters.")
        .max(100)
        .optional(),

    phone: z
        .string()
        .trim()
        .min(10, "Phone number must be at least 10 characters.")
        .max(20)
        .optional(),
});