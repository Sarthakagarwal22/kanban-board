import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import boardRoutes from "./routes/boardRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use("/board", boardRoutes);
app.use("/list", listRoutes);
app.use("/task", tasksRoutes);

app.listen(8080, () => console.log("🚀 Server running at http://localhost:8080"));