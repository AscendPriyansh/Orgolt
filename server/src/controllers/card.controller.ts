import type { Request, Response } from "express";
import { success } from "zod";
import { createCardService, getCardService, updateCardService } from "../services/card.service.js";

export const getCard = async (req: Request, res: Response) => {
  try {
    const orgId = (req as any).params.orgId;
    const boardId = (req as any).params.boardId;
    const listId = (req as any).params.listId;
    const cardId = (req as any).params.cardId;

    const getCard = await getCardService(orgId, boardId, listId, cardId);

    return res.status(200).json({
      success: true,
      message: "Cards fetched successfully",
      data: getCard,
    });
  } catch (err) {
    console.log(err);

    if (err instanceof Error && err.message == "Organization doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Organization doesn't exist",
      });
    }

    if (err instanceof Error && err.message == "Board doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Board doesn't exist",
      });
    }

    if (err instanceof Error && err.message == "List doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "List doesn't exist",
      });
    }

    if (err instanceof Error && err.message == "Card doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Card doesn't exist",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const orgId = (req as any).params.orgId;
    const boardId = (req as any).params.boardId;
    const listId = (req as any).params.listId;

    const createCard = await createCardService(
      req.body,
      orgId,
      boardId,
      listId,
    );

    return res.status(201).json({
      success: true,
      message: "Card created successfully",
      data: createCard,
    });
  } catch (err) {
    console.log(err);

    if (err instanceof Error && err.message == "Organization doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Organization doesn't exist",
      });
    }

    if (err instanceof Error && err.message == "Board doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Board doesn't exist",
      });
    }

    if (err instanceof Error && err.message == "List doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "List doesn't exist",
      });
    }

    if (err instanceof Error && err.message == "Card already exist") {
      return res.status(404).json({
        success: false,
        message: "Card already exist",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateCard = async (req: Request, res: Response) => {
  try {
    const orgId = (req as any).params.orgId;
    const boardId = (req as any).params.boardId;
    const listId = (req as any).params.listId;
    const cardId = (req as any).params.cardId;

    const updateCard = await updateCardService(
      req.body,
      orgId,
      boardId,
      listId,
      cardId
    );

    return res.status(201).json({
      success: true,
      message: "Card updated successfully",
      data: updateCard,
    });
  } catch (err) {
    console.log(err);

    if (err instanceof Error && err.message == "Organization doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Organization doesn't exist",
      });
    }

    if (err instanceof Error && err.message == "Board doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Board doesn't exist",
      });
    }

    if (err instanceof Error && err.message == "List doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "List doesn't exist",
      });
    }

    if (err instanceof Error && err.message == "Card doesn't exist") {
      return res.status(404).json({
        success: false,
        message: "Card doesn't exist",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
