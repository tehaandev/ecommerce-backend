import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController";
import upload from "../middleware/uploadMiddleware";

const router = Router();

router.post("/", upload.array("images", 5), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id", upload.array("newImages", 5), updateProduct);

export default router;

