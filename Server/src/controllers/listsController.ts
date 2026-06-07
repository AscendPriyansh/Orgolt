import { Request, Response } from "express";
import { listSchema } from "../schema/listSchema";
import { pool } from "../db/db";

export const createList = async (req: Request, res: Response) => {
    try {
        const { data, success } = listSchema.safeParse(req.body);
        const userId = (req as any).userId;
        const { boardId } = req.params;

        if(!success) {
            return res.status(400).json({
                message: "Invalid list name (must be 3-100 characters)"
            });
        }

        if (!boardId) {
            return res.status(400).json({
                message: "Board ID is required"
            });
        }

        const createList = await pool.query("INSERT INTO lists (name, board_id, created_by) VALUES ($1, $2, $3) RETURNING *", [data.name, boardId, userId]);

        return res.status(200).json({
            message: "List Created",
            list: createList.rows[0]
        });

    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const getLists = async (req: Request, res: Response) => {
    try {
        const { boardId } = req.params;

        const getLists = await pool.query("SELECT * FROM lists WHERE board_id = $1", [boardId]);

        return res.status(200).json({
            message: "Lists fetched successfully",
            Lists: getLists.rows
        });

    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const updateList = async (req: Request, res: Response) => {
    try {
        const { data, success } = listSchema.safeParse(req.body);
        const { boardId, listId } = req.params;

        if(!success) {
            return res.status(403).json({
                message: "Invalid Credentials"
            });
        }

        await pool.query("UPDATE lists SET name = $1 WHERE board_id = $2 AND id = $3", [data.name, boardId, listId]);

        return res.status(200).json({
            message: "List Updated Successfully"
        });

    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const deleteList = async (req: Request, res: Response) => {
    try {
        const { listId, boardId } = req.params;

        if(!listId) {
            return res.status(404).json({
                message: "Cannot be list Id" 
            });
        }

        await pool.query("DELETE FROM lists WHERE id = $1 AND board_id = $2", [listId, boardId]);

        return res.status(200).json({
            message: "List deleted successfully"
        });

    } catch(err) {
        res.status(500).json({
            message: "Server Error"
        });
    }
}