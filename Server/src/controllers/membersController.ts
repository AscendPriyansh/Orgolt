import { Request, Response } from "express";
import { pool } from "../db/db";
import { memberSchema } from "../schema/memberSchema";

export const addMember = async (req: Request, res: Response) => {
    try {
        const { data, success } = memberSchema.safeParse(req.body);
        const { orgId } = req.params;
        const requesterId = (req as any).userId;

        if(!success) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const orgCheck = await pool.query("SELECT * FROM organizations WHERE id = $1 AND owner_id = $2", [orgId, requesterId]);

        if(orgCheck.rows.length === 0) {
            return res.status(404).json({
                message: "Only org owner can add members"
            });
        }

        const userCheck = await pool.query("SELECT id, name, email FROM users WHERE email = $1", [data.email]);

        if (userCheck.rowCount === 0) {
                return res.status(404).json({
                message: "User with this email doesn't exist"
            });
        }

        const userId = userCheck.rows[0].id;

        const result = await pool.query(
            "INSERT INTO organizations_members (org_id, user_id) VALUES ($1, $2) RETURNING id, role",
            [orgId, userId]
        );

        
        return res.status(201).json({
            message: "Member added successfully",
            member: result.rows[0]
        });

    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const getMembers = async (req: Request, res: Response) => {
    try {
        const { orgId } = req.params;

        const getMembers = await pool.query("SELECT * FROM organizations_members WHERE org_id = $1", [orgId]);

        if(getMembers.rows.length === 0 ) {
            return res.status(404).json({
                message: "No members found"
            });
        }

        return res.status(200).json({
            message: "Members fetched successfully",
            members: getMembers.rows[0]
        });

    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}