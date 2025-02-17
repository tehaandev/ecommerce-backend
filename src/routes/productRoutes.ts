import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController";

const router = Router();

router.post("/", authenticate, createProduct);
router.get("/", authenticate, getProducts);
router.delete("/", authenticate, deleteProduct);

export default router;

