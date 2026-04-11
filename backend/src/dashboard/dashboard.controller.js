import transactionModel from "../transaction/transaction.model.js";

export const getReport = async (req, res) => {
  try {
    const { id, role } = req.user;
    let transactions = [];
    if (role === "admin") {
      transactions = await transactionModel.find().lean();
    } else {
      transactions = await transactionModel.find({ userId: id }).lean();
    }
    let totalCredit = 0;
    let totalDebit = 0;
    transactions.forEach((transaction) => {
      if (transaction.transactionType === "cr") {
        totalCredit += transaction.amount;
      } else if (transaction.transactionType === "dr") {
        totalDebit += transaction.amount;
      }
    });
    const totalTransactions = transactions.length;
    const balance = totalCredit - totalDebit;
    const estimate = (value) => Math.floor(value + value * 0.15);

    //* daily chart last 30 days
    const dailyMap = {};
    transactions.forEach((transaction) => {
      const date = new Date(transaction.createdAt).toISOString().slice(0, 10);
      dailyMap[date] = (dailyMap[date] || 0) + transaction.amount;
    });

    const last30Days = [];
    for (let i = 30; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateSTR = d.toISOString().slice(0, 10);
      last30Days.push({
        date: dateSTR,
        total: dailyMap[dateSTR] || 0,
      });
    }
    res.json({
      summary: {
        totalCredit,
        totalDebit,
        totalTransactions,
        balance,
        totalTransactionEstimate: estimate(totalTransactions),
        totalCreditEstimate: estimate(totalCredit),
        totalDebitEstimate: estimate(totalDebit),
        balanceEstimate: estimate(balance),
      },
      chart: last30Days,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error ",
    });
  }
};
