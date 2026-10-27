import type { Request, Response } from "express";
import { createBoardService, deleteBoardService, getBoardService, getBoardsService, updateBoardService } from "../services/board.service.js";

export const getBoards = async (req: Request, res: Response) => {
    try {
        const orgId = (req as any).params.orgId;
        const userId = (req as any).userId;

        const boards = await getBoardsService(orgId, userId);

        return res.status(200).json({
            success: true,
            message: 
            boards.length
            ? "Boards fetched successfully" 
            : "There are no boards currently", 
            data: boards
        });
         
    } catch(err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const createBoard = async (req: Request, res: Response) => {
    try {
        const orgId = (req as any).params.orgId;
        const userId = (req as any).userId;

        const createBoard = await createBoardService(req.body, orgId, userId);

        return res.status(201).json({
            success: true,
            message: "Board created successfully",
            data: createBoard
        });

    } catch(err) {
        console.log(err);

        if(err instanceof Error && err.message == "Board already exist") {
            return res.status(409).json({
                success: false,
                message: "Board already exist"
            });
        }

        if(err instanceof Error && err.message == "Only the organization owner can create boards") {
            return res.status(403).json({
                success: false,
                message: "User doesn't have permission to perform this action"
            });
        }

        if(err instanceof Error && err.message == "Organization doesn't exist") {
            return res.status(404).json({
                success: false,
                message: "Organization doesn't exsist"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const updateBoard = async (req: Request, res: Response) => {
    try {
        const orgId = (req as any).params.orgId;
        const boardId = (req as any).params.boardId;
        const userId = (req as any).userId;

        const updateBoard = await updateBoardService(req.body, orgId, boardId, userId);

        return res.status(200).json({
            success: true,
            message: "Board updated successfully",
            data: updateBoard
        });

    } catch(err) {
        console.log(err);

        if(err instanceof Error && err.message == "Board doesn't exist") {
            return res.status(409).json({
                success: false,
                message: "Board doesn't exist"
            });
        }

        if(err instanceof Error && err.message == "Only the organization owner can create boards") {
            return res.status(403).json({
                success: false,
                message: "User doesn't have permission to perform this action"
            });
        }

        if(err instanceof Error && err.message == "Organization doesn't exist") {
            return res.status(404).json({
                success: false,
                message: "Organization doesn't exsist"
            });
        }

         return res.status(500).json({
            success: false,
            message: "Intenal server error"
         });
    }
}

export const deleteBoard = async (req: Request, res: Response) => {
    try {

        const orgId = (req as any).params.orgId;
        const boardId = (req as any).params.boardId;
        const userId = (req as any).userId;

        const deleteBoard = await deleteBoardService(orgId, boardId, userId);

        return res.status(200).json({
            success: true,
            message: "Board deleted successfully",
        });


    } catch(err) {
        console.log(err);

        if(err instanceof Error && err.message == "Board doesn't exist") {
            return res.status(409).json({
                success: false,
                message: "Board doesn't exist"
            });
        }

        if(err instanceof Error && err.message == "Only the organization owner can delete boards") {
            return res.status(403).json({
                success: false,
                message: "User doesn't have permission to perform this action"
            });
        }

        if(err instanceof Error && err.message == "Organization doesn't exist") {
            return res.status(404).json({
                success: false,
                message: "Organization doesn't exsist"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getBoard = async (req: Request, res: Response) => {
    try {

        const orgId = (req as any).params.orgId;
        const boardId = (req as any).params.boardId;
        const userId = (req as any).userId;

        const getBoard = await getBoardService(orgId, boardId, userId);

        return res.status(200).json({
            success: true,
            message: "Board fetched successfully",
            data: getBoard
        });

    } catch(err) {
        console.log(err); 

        if(err instanceof Error && err.message == "Board doesn't exist") {
            return res.status(409).json({
                success: false,
                message: "Board doesn't exist"
            });
        }

        if(err instanceof Error && err.message == "Organization doesn't exist") {
            return res.status(404).json({
                success: false,
                message: "Organization doesn't exsist"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}