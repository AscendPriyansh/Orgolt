import express, { Request, Response } from "express";
import cors from "cors";
import users from "./routes/users";
import organizations from "./routes/organizations";
import boards from "./routes/boards";
import lists from "./routes/lists";
import members from "./routes/members";

const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth/v1/", users);
app.use("/org/v1/", organizations);
app.use("/org/v1/:orgId/boards/", boards);
app.use("/org/v1/:orgId/boards/:boardId/lists/", lists);

app.use("/org/v1/:orgId/members/", members);

export default app;