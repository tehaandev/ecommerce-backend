import express from "express";
import { configDotenv } from "dotenv";
import authRoutes from "@/routes/authRoutes";

configDotenv({
  path: ".env",
});

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});
export default app;

