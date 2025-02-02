import Express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./database/db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import verifyToken from "./middleware/authMiddleware.js";

export const app = Express();

app.use(cors());
app.use(Express.json());

const PORT = process.env.PORT 

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", verifyToken, taskRoutes);


app.listen(PORT, () => {
    console.log(`
    Server Started on port: ${PORT}`);
});

export default { app };
