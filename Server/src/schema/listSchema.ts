import z from "zod";

export const listSchema = z.object({
    name: z.string().min(3).max(100).toLowerCase()
});