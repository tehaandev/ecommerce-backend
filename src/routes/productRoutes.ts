import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { createProduct } from "../controllers/productController";

const router = Router();

router.post("/", authenticate, createProduct);
// Other product-related routes

export default router;

