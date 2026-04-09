import TransactionModel from "./transaction.model.js";

export const createTransaction = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.user;
    data.userId = id;
    const transaction = await new TransactionModel(data).save();
    res.json(transaction);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const transaction = await TransactionModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await TransactionModel.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found !" });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

export const getAllTransaction = async (req, res) => {
  try {
    const {id}=req.user;
    const allTransactions = await TransactionModel.find({userId:id});
    res.json({ data: allTransactions });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};
