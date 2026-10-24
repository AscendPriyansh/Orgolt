import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv/config";

const connectionString = process.env.DATABASE_URL;

if(!connectionString) {
    throw new Error("DATABASE_URL environment variable is not defined.");
}

// PrismaPg - PostgreSQL ke liye Prisma adapter hai, he;ps write queries using PostgreSQL syntax
const adapter = new PrismaPg({
    connectionString,
});

// PrismaClient - Prisma ke syntx ke saath database queries execute karne ke liye client hai
const prisma = new PrismaClient({
    adapter,
});

// Dursi files me import karne ke liye
export default prisma;