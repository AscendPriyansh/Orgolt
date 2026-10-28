import type { Request, Response } from "express";
import { getListService } from "../services/list.service.js";

export const getList = async (req: Request, res: Response) => {
  try {
    const orgId = (req as any).params.orgId;
    const boardId = (req as any).params.boardId;
    const userId = (req as any).userId;

    const getList = await getListService(orgId, boardId, userId);

    return res.status(200).json({
      success: true,
      message:
        getList.length > 0 ? "List fetched successfully" : "List doesn't exist",
      data: getList,
    });
  } catch (err) {
    console.log(err);

    if (err instanceof Error && err.message === "Organization doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Organization doesn't exist",
      });
    }

    if (err instanceof Error && err.message === "Board doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Board doesn't exist",
      });
    }

    if(err instanceof Error && err.message === "List doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "List doesn't exist"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
