import z from "zod";

export const orgCreateSchema = z.object({
    name: z.string().min(3).max(100).toLowerCase(),
    description: z.string().max(100).optional(),
    visibility: z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]).default("PRIVATE"),
});

export const updateOrgSchema = z.object({
    name: z.string().min(3).max(100).toLowerCase().optional(),
    description: z.string().max(100).optional(),
    visibility: z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]).optional(),
});

export const orgSchema = {
    orgCreateSchema,
    updateOrgSchema
};

export type CreateOrgInput = z.infer<
    typeof orgSchema.orgCreateSchema
>

export type UpdateOrgInput = z.infer<
    typeof orgSchema.updateOrgSchema
>