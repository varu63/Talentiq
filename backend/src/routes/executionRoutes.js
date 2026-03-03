import express from "express";
import { executeCode } from "../controllers/execution.js";

const router = express.Router();

router.post("/execute", executeCode);

export default router;