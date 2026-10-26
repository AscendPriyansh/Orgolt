import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { getOrgService } from "../services/org.service.js";

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
