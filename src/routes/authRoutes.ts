import { login, register } from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/register", async (req, res) => {
  await register(req, res);
});
router.post("/login", async (req, res) => {
  await login(req, res);
});

export default router;

