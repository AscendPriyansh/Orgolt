import express from "express";
import helmet from "helmet";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.route.js";
import orgRoutes from "./routes/org.route.js";
import boardRoutes from "./routes/board.route.js";
import listRoutes from "./routes/list.route.js";
import cardRoutes from "./routes/card.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(helmet());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/org", orgRoutes);
app.use("/api/v1/org/:orgId/board", boardRoutes);
app.use("/api/v1/org/:orgId/board/:boardId/list", listRoutes);
app.use("/api/v1/org/:orgId/board/:boardId/list/:listId", cardRoutes);

export default app;