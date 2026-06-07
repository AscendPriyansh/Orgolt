import { Request, Response } from "express";
import { pool } from "../db/db";
import { cardSchema } from "../schema/cardSchema";

export const createCard = async (req: Request, res: Response) => {
    try {
        const { data, success } = cardSchema.safeParse(req.body);
        const { boardId, listId } = req.params;
        const userId = (req as any).userId;

        if (!success) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const boardCheck = await pool.query("SELECT * FROM boards WHERE id = $1", [boardId]);

        if (boardCheck.rows.length === 0) {
            return res.status(404).json({
                message: "Board not found"
            });
        }

        const orgId = boardCheck.rows[0].org_id;

        const memberCheck = await pool.query(
            `SELECT EXISTS (
                SELECT 1 FROM organizations_members WHERE org_id = $1 AND user_id = $2
                UNION
                SELECT 1 FROM organizations WHERE id = $1 AND owner_id = $2
            ) AS has_access`,
            [orgId, userId]
        );

        if (!memberCheck.rows[0].has_access) {
            return res.status(403).json({
                message: "You don't have access to this board"
            });
        }

        const listCheck = await pool.query(
            "SELECT id FROM lists WHERE id = $1 AND board_id = $2",
            [listId, boardId]
        );

        if (listCheck.rows.length === 0) {
            return res.status(404).json({
                message: "List not found"
            });
        }

        const cardResult = await pool.query("INSERT INTO cards (list_id, name, description, created_by) VALUES ($1, $2, $3, $4) RETURNING id, name, description, position, created_by, created_at", [listId, data.name, data.description || null, userId]);

        const cardId = cardResult.rows[0].id;

        const resolvedAssigneeIds: number[] = [];

        if (data.assigneeIds && data.assigneeIds.length > 0) {
            for (const email of data.assigneeIds) {
                const userResult = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

                if (userResult.rows.length === 0) {
                    return res.status(400).json({
                        message: `User with email ${email} doesn't exist`
                    });
                }

                const foundUserId = userResult.rows[0].id;

                const memberCheck = await pool.query("SELECT * FROM organizations_members WHERE org_id = $1 AND user_id = $2", [orgId, foundUserId]);

                if (memberCheck.rows.length === 0) {
                    return res.status(400).json({
                        message: `User ${email} is not a member of this organization`
                    });
                }

                resolvedAssigneeIds.push(foundUserId);
            }

            for (const resolvedId of resolvedAssigneeIds) {
                await pool.query(
                    "INSERT INTO card_members (card_id, user_id) VALUES ($1, $2)",
                    [cardId, resolvedId]
                );
            }
        }

        return res.status(200).json({
            message: "Card Created Succesfully",
            card: cardResult.rows
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const getCards = async (req: Request, res: Response) => {
    try {
        const { boardId, listId } = req.params;
        const userId = (req as any).userId;

        const boardCheck = await pool.query("SELECT * FROM boards WHERE id = $1", [boardId]);

        if (boardCheck.rows.length === 0) {
            return res.status(404).json({
                message: "Board not found"
            });
        }

        const orgId = boardCheck.rows[0].org_id;

        const memberCheck = await pool.query(
            `SELECT EXISTS (
                SELECT 1 FROM organizations_members WHERE org_id = $1 AND user_id = $2
                UNION
                SELECT 1 FROM organizations WHERE id = $1 AND owner_id = $2
            ) AS has_access`,
            [orgId, userId]
        );

        if (!memberCheck.rows[0].has_access) {
            return res.status(403).json({
                message: "You don't have access to this board"
            });
        }

        const listCheck = await pool.query(
            "SELECT id FROM lists WHERE id = $1 AND board_id = $2",
            [listId, boardId]
        );

        if (listCheck.rows.length === 0) {
            return res.status(404).json({
                message: "List not found"
            });
        }

        const getCardList = await pool.query("SELECT * FROM cards WHERE list_id = $1", [listId]);

        if(getCardList.rows.length === 0) {
            return res.status(404).json({
                message: "No Cards Available"
            });
        }
    
        return res.status(200).json({
            message: "Cards Fetched Succesfully",
            cards: getCardList.rows 
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const updateCard = async (req: Request, res: Response) => {
    try {
        const { boardId, listId } = req.params;
        const userId = (req as any).userId;

        const boardCheck = await pool.query("SELECT * FROM boards WHERE id = $1", [boardId]);

        if (boardCheck.rows.length === 0) {
            return res.status(404).json({
                message: "Board not found"
            });
        }

        const orgId = boardCheck.rows[0].org_id;

        const memberCheck = await pool.query(
            `SELECT EXISTS (
                SELECT 1 FROM organizations_members WHERE org_id = $1 AND user_id = $2
                UNION
                SELECT 1 FROM organizations WHERE id = $1 AND owner_id = $2
            ) AS has_access`,
            [orgId, userId]
        );

        if (!memberCheck.rows[0].has_access) {
            return res.status(403).json({
                message: "You don't have access to this board"
            });
        }

        const listCheck = await pool.query(
            "SELECT id FROM lists WHERE id = $1 AND board_id = $2",
            [listId, boardId]
        );

        if (listCheck.rows.length === 0) {
            return res.status(404).json({
                message: "List not found"
            });
        }

        const getCardList = await pool.query("UPDATE cards SET (name, description, assigneeIds) WHERE list_id = $1", [listId]);

        if(getCardList.rows.length === 0) {
            return res.status(404).json({
                message: "No Cards Available"
            });
        }
    
        return res.status(200).json({
            message: "Cards Fetched Succesfully",
            cards: getCardList.rows 
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const deleteCard = async (req: Request, res: Response) => {
    try {
        const { boardId, listId, cardId } = req.params;
        const userId = (req as any).userId;

        const boardCheck = await pool.query("SELECT * FROM boards WHERE id = $1", [boardId]);

        if (boardCheck.rows.length === 0) {
            return res.status(404).json({
                message: "Board not found"
            });
        }

        const orgId = boardCheck.rows[0].org_id;

        const memberCheck = await pool.query(
            `SELECT EXISTS (
                SELECT 1 FROM organizations_members WHERE org_id = $1 AND user_id = $2
                UNION
                SELECT 1 FROM organizations WHERE id = $1 AND owner_id = $2
            ) AS has_access`,
            [orgId, userId]
        );

        if (!memberCheck.rows[0].has_access) {
            return res.status(403).json({
                message: "You don't have access to this board"
            });
        }

        const listCheck = await pool.query(
            "SELECT id FROM lists WHERE id = $1 AND board_id = $2",
            [listId, boardId]
        );

        if (listCheck.rows.length === 0) {
            return res.status(404).json({
                message: "List not found"
            });
        }

        const cardCheck = await pool.query(
            "SELECT id FROM cards WHERE id = $1 AND list_id = $2",
            [cardId, listId]
        );

        if (cardCheck.rows.length === 0) {
            return res.status(404).json({
                message: "Card not found"
            });
        }

        await pool.query(
            "DELETE FROM cards WHERE id = $1",
            [cardId]
        );

        return res.status(200).json({
            message: "Card deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}