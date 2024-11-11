const Account = require("../models/Account");

// Utility function to generate a unique 12-digit account number
const generateAccountNumber = () => {
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
};

// Apply for a new account
exports.applyForAccount = async (req, res) => {
  const { user_id, account_type } = req.body;
  console.log(req.body);
  try {
    const account = await Account.create({
      user_id,
      account_type,
      account_number: generateAccountNumber(),
      balance: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });
    console.log(account);
    res.status(201).json({ message: "Account created successfully", account });
  } catch (error) {
    res.status(400).json({ message: "Error creating account", error });
  }
};

// Get all accounts for a user
exports.getUserAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll({
      where: { user_id: req.params.userId },
    });
    console.log("account details is", accounts);
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching accounts", error });
  }
};

// Update account type
exports.updateAccountType = async (req, res) => {
  const { accountId } = req.params;
  const { accountType } = req.body;
  try {
    const account = await Account.findByPk(accountId);
    if (!account) return res.status(404).json({ message: "Account not found" });

    account.accountType = accountType;
    account.updated_at = new Date();
    await account.save();
    res.json({ message: "Account type updated successfully", account });
  } catch (error) {
    res.status(500).json({ message: "Error updating account type", error });
  }
};
