const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
  const { from_user_id, to_user_id, amount } = req.body;
  try {
    const transaction = await Transaction.create({
      from_user_id,
      to_user_id,
      amount,
    });
    res.status(201).json({ message: "Transaction successful", transaction });
  } catch (error) {
    res.status(400).json({ message: "Error processing transaction", error });
  }
};

exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { from_user_id: req.params.userId },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};
