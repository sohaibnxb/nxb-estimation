import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import tempRoutes from "./routes/tempRoutes.js";
import projRoutes from "./routes/projRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import revisionRoutes from "./routes/revisionRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import costingRoutes from "./routes/costingRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import { verifyToken } from "./middlewares/authHandler.js";
// env configuration
dotenv.config();

//connect to monogodb
connectDB();

//express app
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Api is running");
});

app.use("/api/users", userRoutes);
app.use("/api/temp", tempRoutes);
app.use("/api/projects", verifyToken, projRoutes);
app.use("/api/timelines", verifyToken, timelineRoutes);
app.use("/api/revisions", revisionRoutes);
app.use("/api/roles",verifyToken, roleRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/costing", verifyToken, costingRoutes);
app.use("/api/email", emailRoutes);
// listen port on 5000
const port = process.env.PORT || 5000;
const host = process.env.BACKEND_URL || '0.0.0.0'

app.listen(port, host, () => {
  console.log(`server listening on ${host}:${port}`);
});