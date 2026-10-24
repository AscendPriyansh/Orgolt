import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import type { RegisterUserInput } from "../validators/auth.validator.js";

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