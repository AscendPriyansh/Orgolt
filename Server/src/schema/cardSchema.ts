import z from "zod";

export const cardSchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().optional(),
    assigneeIds: z.array(z.string().email()).optional()
})