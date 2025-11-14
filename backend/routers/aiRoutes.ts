import { Router, type Request, type Response } from "express";
import axios, { AxiosError } from "axios";

const router = Router();
const AI_BASE = "http://localhost:8000";

router.post("/suggest", async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.post(`${AI_BASE}/ai/suggest`, req.body);
    res.json(response.data);
  } catch (err: unknown) {
    const error = err as AxiosError;
    res.status(500).json({
      message: "AI service error",
      error: error.message || "Unknown error",
    });
  }
});

router.post("/categorize", async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.post(`${AI_BASE}/ai/categorize`, req.body);
    res.json(response.data);
  } catch (err: unknown) {
    const error = err as AxiosError;
    res.status(500).json({
      message: "AI service error",
      error: error.message || "Unknown error",
    });
  }
});

export default router;
