import express from "express";
const router = express.Router();
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransaction,
} from "./transaction.controller.js";

router.post("/create-transaction", createTransaction);
router.put("/update-transaction/:id", updateTransaction);
router.delete("/delete-transaction/:id", deleteTransaction);
router.get("/get-transaction", getAllTransaction);

export default router;
