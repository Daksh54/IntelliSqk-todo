import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorMiddleware";
import authRoutes from "./routers/authRoutes";
import todoRoutes from "./routers/todoRoutes";
import connectDB from "./config/db";
import aiRoutes from "./routers/aiRoutes";


const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/ai", aiRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
