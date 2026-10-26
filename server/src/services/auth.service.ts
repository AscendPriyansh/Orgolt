import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import type { LoginUserInput, RegisterUserInput } from "../validators/auth.validator.js";
import dotenv from "dotenv/config";

export const registerUserService = async (data: RegisterUserInput) => {
    const { name, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await prisma.user.findUnique({
        where: {
            "email": data.email
        }
    });

    if(existingUser) {
        throw new Error("Email_already_exists");
    }

    const createUser = await prisma.user.create({
        data: {
            "name": name,
            "email": email,
            "password": hashedPassword
        },
        select: {
            id: true,
            name: true,
            email: true,
        }
    });

    return createUser;
} 

export const loginUserService = async (data: LoginUserInput) => {
    const { email, password } = data;

    const userExists = await prisma.user.findUnique({
        where: {
            "email": data.email
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true
        }
    })

    if (!userExists || !userExists.password) {
        throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        userExists.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password.");
    }

    const secret = process.env.JWT_SECRET_KEY;

    if (!secret) {
        throw new Error("JWT_SECRET_KEY is not configured.");
    }

    const token = jwt.sign(
        { id: userExists.id },
        secret,
        { expiresIn: "3d" }
    );

    return {
        user: {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
        },
        token
    };
}