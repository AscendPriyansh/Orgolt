import z from "zod";

export const orgSchema = z.object({
    name: z.string().min(3).max(100).toLowerCase(),
    description: z.string().max(100),
    visibility: z.enum(["public", "private", "unlisted"]),
});

export const updateOrgSchema = z.object({
    name: z.string().min(3).max(100).toLowerCase().optional(),
    description: z.string().max(100).optional(),
    visibility: z.enum(["public", "private", "unlisted"]).optional(),
});
