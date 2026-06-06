import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BoardSchema } from "../schema/boardSchema";
import { pool } from "../db/db";

export const createBoard = async (req: Request, res: Response) => {
    try {
        const { data, success } = BoardSchema.safeParse(req.body);
        const { orgId } = req.params;

        if (!success) {
            return res.status(403).json({
                message: "Invalid Credentials"
            });
        };

        if (!orgId) {
            return res.status(400).json({
                message: "Organization ID is required"
            });
        }

        const boardExists = await pool.query("SELECT * FROM boards WHERE name = $1 AND org_id = $2", [data.name, orgId]);

        if (boardExists.rows.length > 0) {
            return res.status(403).json({
                message: "Board already exist in Org"
            });
        }
        
        const createBoard = await pool.query("INSERT INTO boards (name, org_id, created_by) VALUES ($1, $2, $3) RETURNING *", [data.name, orgId, (req as any).userId]);

        return res.status(200).json({
            message: "Board Created",
            board: createBoard.rows[0]
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const getBoards = async (req: Request, res: Response) => {
    try {
        const ownerId = (req as any).userId;
        const { orgId } = req.params;

        const getBoards = await pool.query("SELECT * FROM boards WHERE created_by = $1 AND org_id = $2", [ownerId, orgId]);

        if(getBoards.rows.length===0) {
            return res.status(404).json({
                message: "No Boards Available"
            });
        };

        return res.status(200).json({
            message: "Boards Fetched",
            boards: getBoards.rows
        });
    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const getBoardByName = async (req: Request, res: Response) => {
    try {
        const { data, success } = BoardSchema.safeParse(req.body);
        const { orgId, name } = req.params;

        if(!success) {
            return res.status(403).json({
                message: "Invalid Credentials"
            });
        }

        const getBoard = await pool.query("SELECT * FROM boards WHERE org_id = $1 AND name = $2", [orgId, name]);

        if(getBoard.rows.length === 0) {
            return res.status(403).json({
                message: "Boards not found"
            });
        }

        return res.status(200).json({
            message: "Board Fetched",
            board: getBoard.rows[0]
        });
    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const updateBoard = async (req: Request, res: Response) => {
    try {
        const { data, success } = BoardSchema.safeParse(req.body);
        const { orgId, name } = req.params;

        if(!success) {
            return res.status(403).json({
                message: "Invalid Credentials"
            });
        }

        const getBoard = await pool.query("SELECT id FROM boards WHERE name = $1 AND org_id = $2", [name, orgId]);

        if(getBoard.rows.length === 0) {
            return res.status(404).json({
                message: "Cannot fetch board"
            });
        }

        const updateBoard = await pool.query("UPDATE boards SET name = $1 WHERE name = $2 AND org_id = $3", [data.name, name, orgId]);

        return res.status(200).json({
            message: "Board Updated"
        });

    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const deleteBoard =  async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const userId = (req as any).userId;
        
        const getBoard = await pool.query("SELECT * FROM boards WHERE name = $1 AND created_by = $2", [name, userId]);
        
        if(getBoard.rows.length === 0 ) {
            return res.status(404).json({
                message: "Board not available"
            });
        }

        await pool.query("DELETE FROM boards WHERE name = $1 AND created_by = $2", [name, userId]);

        return res.status(200).json({
            message: "Board deleted successfully"
        });
    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}