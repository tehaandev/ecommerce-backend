import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.delete("/", deleteProduct);
router.put("/", updateProduct);

export default router;

