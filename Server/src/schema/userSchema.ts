import z from "zod";

export const createUserSchema = z.object({
    username: z.string().min(3).max(100),
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(255)
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255)
});