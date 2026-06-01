import express, { Request, Response } from "express";
import cors from "cors";
import users from "./routes/users";

const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth/v1/", users);

export default app;