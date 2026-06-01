import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_8JjGvHgdbO9L@ep-odd-meadow-aqe1n3dt-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});