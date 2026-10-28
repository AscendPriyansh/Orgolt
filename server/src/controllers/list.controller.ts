import type { Request, Response } from "express";
import { createListService, deleteListService, getListService, updateListService } from "../services/list.service.js";

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

    if (err instanceof Error && err.message === "List doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "List doesn't exist",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createList = async (req: Request, res: Response) => {
  try {
    const orgId = (req as any).params.orgId;
    const boardId = (req as any).params.boardId;
    const userId = (req as any).userId;

    const createList = await createListService(
      req.body,
      orgId,
      boardId,
      userId,
    );

    return res.status(200).json({
      success: true,
      message: "List created successfully",
      data: createList,
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

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateList = async (req: Request, res: Response) => {
  try {
    const orgId = (req as any).params.orgId;
    const boardId = (req as any).params.boardId;
    const listId = (req as any).params.listId;

    const updateList = await updateListService(
      req.body,
      orgId,
      boardId,
      listId,
    );

    return res.status(200).json({
        success: true,
        message: "List updated successfully",
        data: updateList
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

    return res.status(500).json({
      success: true,
      message: "Internal server error",
    });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  try {
      const orgId = (req as any).params.orgId;
      const boardId = (req as any).params.boardId;
      const listId = (req as any).params.listId;

      const deleteList = await deleteListService(orgId, boardId, listId);

      return res.status(200).json({
        success: true,
        message: "List deleted successfully"
      });

  } catch(err) {
    console.log(err);

    if(err instanceof Error && err.message == "Organization doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Organization doesn't exist"
      });
    }

    if(err instanceof Error && err.message == "Board doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Board doesn't exist"
      });
    }

    if(err instanceof Error && err.message == "List doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "List doesn't exist"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
