import express, { Request, Response } from "express";
import cors from "cors";
import users from "./routes/users";
import organizations from "./routes/organizations";

const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth/v1/", users);
app.use("/org/v1/", organizations);

export default app;