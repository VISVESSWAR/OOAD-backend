const Loan = require("../models/Loan");
const User = require("../models/User");
const { Op } = require("sequelize");

function calculateDueDate(duration) {
  const today = new Date();
  today.setMonth(today.getMonth() + duration); // Add the loan duration in months to the current date
  return today;
}

exports.applyForLoan = async (req, res) => {
  try {
    const { user_id, amount, duration, purpose } = req.body;
    console.log(req.body);

    // Validate the amount and duration fields
    const parsedAmount = parseFloat(amount);
    const parsedDuration = parseInt(duration, 10);

    if (isNaN(parsedAmount) || isNaN(parsedDuration)) {
      return res.status(400).json({ message: "Invalid amount or duration" });
    }

    // Fetch the user from the database based on user_id (to validate user exists)
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate the loan's due date based on the duration provided
    const dueDate = calculateDueDate(parsedDuration);

    // Create the loan entry in the database
    const loan = await Loan.create({
      user_id,
      amount: parsedAmount,
      duration: parsedDuration,
      created_at: new Date(),
      updated_at: new Date(),
      due_date: dueDate, // Set the calculated due date
    });

    // Return a success message along with the loan details
    res.status(200).json({ message: "Loan applied successfully", loan });
  } catch (error) {
    console.error("Error applying for loan:", error);
    res
      .status(400)
      .json({ message: "Error applying for loan", error: error.message });
  }
};

exports.getUserLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({ where: { user_id: req.params.userId } });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching loans", error });
  }
};

exports.sanctionLoan = async (req, res) => {
  const { loanId } = req.params;
  try {
    const loan = await Loan.findByPk(loanId);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    loan.status = "Sanctioned";
    await loan.save();
    res.json({ message: "Loan application sanctioned", loan });
  } catch (error) {
    res.status(500).json({ message: "Error sanctioning loan", error });
  }
};
