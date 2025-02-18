import { Router } from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favoriteController";

const router = Router();

router.post("/", addFavorite);
router.delete("/", removeFavorite);
router.get("/", getFavorites);

export default router;

