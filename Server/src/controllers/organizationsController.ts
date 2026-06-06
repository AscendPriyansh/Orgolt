import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orgSchema, updateOrgSchema } from "../schema/orgSchema";
import { pool } from "../db/db";

export const createOrg = async (req: Request, res: Response) => {
    try {
        const { data, success } = orgSchema.safeParse(req.body);

        if (!success) {
            return res.status(403).json({
                message: "Invalid Credentials"
            });
        };

        const orgExists = await pool.query("SELECT * FROM organizations WHERE name = $1 AND owner_id = $2", [data.name, (req as any).userId]);

        if (orgExists.rows.length > 0) {
            return res.status(403).json({
                message: "Org already exists"
            });
        };

        const ownerId = (req as any).userId;
        const createOrg = await pool.query("INSERT INTO organizations (name, description, visibility, owner_id) VALUES ($1, $2, $3, $4)", [data.name, data.description, data.visibility, ownerId]);

        return res.status(200).json({
            message: "Org Created",
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        });
    };
}

export const getOrgs = async (req: Request, res: Response) => {
    try {
        const ownerId = (req as any).userId;

        const getOrgs = await pool.query("SELECT * FROM organizations WHERE owner_id = $1", [ownerId]);

        if (getOrgs.rows.length == 0) {
            return res.status(200).json({
                message: "No org available"
            });
        }

        return res.status(200).json({
            organizations: getOrgs.rows,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const getOrgByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;

        const org = await pool.query("SELECT * FROM organizations WHERE name = $1 AND owner_id = $2", [name, (req as any).userId]);

        if (org.rows.length === 0) {
            return res.status(404).json({
                message: "Org not found"
            });
        }

        return res.status(200).json({
            organization: org.rows[0],
        });
    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const updateOrg = async (req: Request, res: Response) => {
    try {
        const { data, success } = updateOrgSchema.safeParse(req.body);

        if(!success) {
            return res.status(403).json({
                message: "Invalid Credentials"
            });
        };

        const getOrgId = await pool.query("SELECT id FROM organizations WHERE name = $1 AND owner_id = $2", [req.params.name, (req as any).userId]);

        if (getOrgId.rows.length === 0) {
            return res.status(404).json({
                message: "Org not found"
            });
        }

        const orgId = getOrgId.rows[0].id;

        const updateOrg = await pool.query("UPDATE organizations SET name = $1, description = $2, visibility = $3 WHERE id = $4", [data.name, data.description, data.visibility, orgId]);

        return res.status(200).json({
            message: "Organization Updated"
        });

    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const deleteOrg = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        // const { confirmName } = req.body;
        const userId = (req as any).userId;

        const org = await pool.query(
            "SELECT * FROM organizations WHERE name = $1 AND owner_id = $2",
            [name, userId]
        );

        if (org.rows.length === 0) {
            return res.status(404).json({
                message: "Org not found or not authorized"
            });
        }

        await pool.query(
            "DELETE FROM organizations WHERE id = $1",
            [org.rows[0].id]
        );

        return res.status(200).json({
            message: "Organization deleted"
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};