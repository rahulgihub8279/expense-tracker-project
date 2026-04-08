import TransactionModel from "./transaction.model.js";

export const createTransaction = async (req, res) => {
  try {
    // const { transactionType, title, amount, paymentMethod, notes } = req.body;
    // const uid = req.user._id;
    res.json({
        message:"create"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

export const updateTransaction = async (req, res) => {
    try { 
    res.json({
        message:"update"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

export const deleteTransaction = async (req, res) => {
    try { 
    res.json({
        message:"delete"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

export const getAllTransaction = async (req, res) => {
    try { 
    res.json({
        message:"geting transactions..."
    })
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};
