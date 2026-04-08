import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);
