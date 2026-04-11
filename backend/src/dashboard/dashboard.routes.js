import express from "express";
const router = express.Router();
import { getReport } from "./dashboard.controller.js";
import { adminUserGuard } from "../../middleware/guardMiddleware.js";

router.get("/get-report", adminUserGuard, getReport);

export default router;
