import { Router } from "express";
import { signup, login, requestReset, resetPassword } from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot", requestReset);
router.post("/reset", resetPassword);

export default router;
