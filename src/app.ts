import express from "express";
import { authenticate } from "./middleware/authMiddleware";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", authenticate, productRoutes);
app.use("/api/favorites", authenticate, favoriteRoutes);

// Global error handler
app.use(errorHandler);

// Default route (Testing only)
app.get("/", (req, res) => {
  res.send("Hello World");
});
export default app;

