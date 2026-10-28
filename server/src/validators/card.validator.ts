import * as z from "zod";

const createCardSchema = z.object({
    name: z.string().min(1).max(200)
});

const updateCardSchema = z.object({
    name: z.string().min(1).max(200)
});

export const cardSchema = {
    createCardSchema,
    updateCardSchema
}

export type CreateCardInput = z.infer<
    typeof cardSchema.createCardSchema
>

export type UpdateCardInput = z.infer<
    typeof cardSchema.updateCardSchema
>

