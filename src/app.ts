import express from "express";
import { configDotenv } from "dotenv";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import errorHandler from "./middleware/errorHandler";
import { authenticate } from "./middleware/authMiddleware";

configDotenv({
  path: ".env",
});

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", authenticate, productRoutes);

// Global error handler
app.use(errorHandler);

// Default route (Testing only)
app.get("/", (req, res) => {
  res.send("Hello World");
});
export default app;

