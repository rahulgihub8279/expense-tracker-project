import express from "express";
const router = express.Router();
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransaction,
} from "./transaction.controller.js";
import { adminUserGuard } from "../../middleware/guardMiddleware.js";

router.post("/create-transaction", adminUserGuard, createTransaction);
router.put("/update-transaction/:id", adminUserGuard, updateTransaction);
router.delete("/delete-transaction/:id", adminUserGuard, deleteTransaction);
router.get("/get-transaction", adminUserGuard, getAllTransaction);

export default router;
