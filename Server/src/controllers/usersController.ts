import express, { Request, Response } from "express";
import { createUserSchema, loginUserSchema } from "../schema/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/db"; 

export const createUser = async (req: Request, res: Response) => {
    try {
        const { data, success } = createUserSchema.safeParse(req.body);

        if(!success) {
            return res.status(403).json({
                message: "Invalid Credentials"
            });
        };

        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [data.email]);

        if(userExists.rows.length>0) {
            return res.status(403).json({
                message: "Users already exists"
            });
        };

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const createUser = await pool.query("INSERT INTO users (username, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id", [data.username, data.name, data.email, hashedPassword]);

        const id = createUser.rows[0]?.id;

        const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
            expiresIn: "7d"
        });

        return res.status(200).json({
            message: "Signup Successful",
            token: token
        });
    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    };
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { data, success } = loginUserSchema.safeParse(req.body);

        if(!success) {
            return res.status(403).json({
                message: "Invalid Credentials"
            });
        }

        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [data.email]);

        if(userExists.rows.length<=0) {
            return res.status(403).json({
                message: "User doesn't exists"
            });
        };

        const hashedPassword = await bcrypt.compare(data.password, userExists.rows[0]?.password);

        if(!hashedPassword) {
            return res.status(403).json({
                message: "Invalid Credentials"
            });
        };

        const id = userExists.rows[0]?.id;

        const token = jwt.sign({id}, process.env.JWT_SECRET as string, {
            expiresIn: "7d"
        });

        return res.status(200).json({
            message: "Signin successful",   
            token: token
        });

    } catch(err) {
        return res.status(500).json({
            message: "Server Error"
        });
    };
}