// dotenv/config - File ke variables load karta hai
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// defineConfig - Prisma CLI ki configuration define karta hai
export default defineConfig({
    schema: "prisma/schema.prisma",

    migrations: {
        path: "prisma/migrations",
    },

    datasource: {
        url: env("DATABASE_URL"),
    }
});