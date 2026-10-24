import express from "express";
import helmet from "helmet";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(helmet());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);

export default app;