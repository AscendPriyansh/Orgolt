import type { Request, Response } from "express";
import { getBoardsService } from "../services/board.service.js";

export const getBoards = async (req: Request, res: Response) => {
    try {
        const orgId = (req as any).params.orgId;
        const userId = (req as any).userId;

        const getBoards = await getBoardsService(orgId, userId);

        return res.status(200).json({
            success: true,
            message: "Boards fetched successfully",
            data: getBoards
        });
         
    } catch(err) {
        console.log(err);

        if(err instanceof Error && err.message=="Board doesn't exist") {
            return res.status(404).json({
                success: true,
                message: "Board doesn't exist"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}