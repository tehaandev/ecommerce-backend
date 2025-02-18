import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController";
import upload from "../middleware/uploadMiddleware";

const router = Router();

router.post("/", upload.array("images", 5), createProduct);
router.get("/", getProducts);
router.delete("/", deleteProduct);
router.put("/", updateProduct);

export default router;

