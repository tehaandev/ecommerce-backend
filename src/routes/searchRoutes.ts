import { Router } from "express";
import {
  getSearchSuggestions,
  searchProducts,
} from "../controllers/searchController";

const router = Router();

router.get("/:query", searchProducts);
router.get("/suggestions/:query", getSearchSuggestions);

export default router;

