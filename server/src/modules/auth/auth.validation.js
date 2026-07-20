import { z } from "zod";

export const registerSchema = z.object({
    organizationName: z
        .string()
        .trim()
        .min(3, "Organization name must be at least 3 characters.")
        .max(100),

    organizationEmail: z
        .string()
        .trim()
        .email("Invalid organization email."),

    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters.")
        .max(100),

    email: z
        .string()
        .trim()
        .email("Invalid email."),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters."),

    phone: z
        .string()
        .trim()
        .min(10)
        .max(20)
        .optional()
});