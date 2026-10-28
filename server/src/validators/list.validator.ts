import * as z from "zod";

const createListSchema = z.object({
    name: z.string().min(1).max(50).toLowerCase(),
});

const updateListSchema = z.object({
    name: z.string().min(1).max(50).toLowerCase(),
});

export const listSchema = {
    createListSchema,
    updateListSchema
}

export type CreateListInput = z.infer<
    typeof listSchema.createListSchema
>

export type UpdateListInput = z.infer<
    typeof listSchema.updateListSchema
>



