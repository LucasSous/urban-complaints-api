import express, { json } from "express";
import cors from "cors";
import authRoutes from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import postRoutes from "./routes/post-router.js";

const app = express();
app.use(cors());
app.use(json({ limit: "10mb" }));
app.use(authRoutes);
app.use(userRoutes);
app.use(postRoutes);

export default app;