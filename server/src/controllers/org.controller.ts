import type { Request, Response } from "express";
import { createOrgService, deleteOrgService, getOrgService, updateOrgService } from "../services/org.service.js";

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

export const updateOrg = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const orgId = req.params.orgId;

    if (typeof orgId !== "string" || !orgId) {
      return res.status(400).json({
        success: false,
        message: "Invalid organization ID"
      });
    }

    const updatedOrg = await updateOrgService(req.body, userId, orgId);

    return res.status(200).json({
      success: true,
      message: "Organization updated successfully",
      data: updatedOrg
    });

  } catch(err) {
    console.log(err);

    if(err instanceof Error && err.message === "Organization doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Organization doesn't exist"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export const deleteOrg = async (req: Request, res: Response) => {
  try {
    const orgId = (req as any).params.orgId;
    const userId = (req as any).userId;

    const deleteOrg = await deleteOrgService(userId, orgId);

    return res.status(200).json({
      success: true,
      message: "Organization deleted successfully"
    });

  } catch(err) {
    console.log(err);

    if(err instanceof Error && err.message === "Organization doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Organization doesn't exist"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}