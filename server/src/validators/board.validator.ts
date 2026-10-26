import * as z from "zod";

const createBoardSchema = z.object({
    name: z.string().min(1).max(100).toLowerCase(),
    description: z.string().max(100).optional(),
});

const updateBoardSchema = z.object({
    name: z.string().min(1).max(100).toLowerCase().optional(),
    description: z.string().max(100).optional(),
});

export const boardSchema = {
    createBoardSchema,
    updateBoardSchema
};

export type CreateBoardInput = z.infer<
    typeof boardSchema.createBoardSchema
>

export type UpdateBoardInput = z.infer<
    typeof boardSchema.updateBoardSchema
>

