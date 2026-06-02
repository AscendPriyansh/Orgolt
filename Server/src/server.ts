import app from "./app";
import { pool } from "./db/db";
import dotenv from "dotenv";

dotenv.config();

console.log("1. server.ts loaded");

const PORT = 5000;

async function startServer() {
  console.log("2. startServer called");

  try {
    console.log("3. before query");

    const result = await pool.query("SELECT NOW()");

    console.log("4. query successful");
    console.log(result.rows);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("DATABASE ERROR:");
    console.error(error);
  }
}

startServer();