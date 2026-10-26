import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { createOrgService, getOrgService } from "../services/org.service.js";

export const getOrg = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const orgs = await getOrgService(userId);

    return res.status(200).json({
      success: true,
      message:
        orgs.length
          ? "Organization fetched successfully"
          : "No Organization Found",
      data: orgs,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createOrg = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const orgCreate = await createOrgService(req.body, userId);

        return res.status(201).json({
            success: true,
            message: "Organization created successfully",
            data: orgCreate
        });

    } catch(err) {
        console.log(err);

        if (err instanceof Error && err.message === "Organization already Exists") {
            return res.status(409).json({
                success: false,
                message: "Organization already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        });
    }
}