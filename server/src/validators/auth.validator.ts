import * as z from "zod";

const registerUserSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characteres").max(32, "Name must be at most 32 characters"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters").max(128, "Password must be at most 128 characters")
});

const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters").max(128, "Password must be at most 128 characters")
});

export const authUserSchema = {
    registerUserSchema,
    loginUserSchema
};

export type RegisterUserInput = z.infer<
    typeof authUserSchema.registerUserSchema
>

export type LoginUserInput = z.infer<
    typeof authUserSchema.loginUserSchema
>

