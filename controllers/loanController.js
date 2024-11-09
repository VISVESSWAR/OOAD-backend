const Loan = require('../models/Loan');

exports.applyForLoan = async (req, res) => {
    const { user_id, amount, duration } = req.body;
    try {
        const loan = await Loan.create({ user_id, amount, duration });
        res.status(201).json({ message: 'Loan application submitted', loan });
    } catch (error) {
        res.status(400).json({ message: 'Error applying for loan', error });
    }
};
exports.getUserLoans = async (req, res) => {
    try {
        const loans = await Loan.findAll({ where: { user_id: req.params.userId } });
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching loans', error });
    }
};

exports.sanctionLoan = async (req, res) => {
    const { loanId } = req.params;
    try {
        const loan = await Loan.findByPk(loanId);
        if (!loan) return res.status(404).json({ message: 'Loan not found' });

        loan.status = 'Sanctioned';
        await loan.save();
        res.json({ message: 'Loan application sanctioned', loan });
    } catch (error) {
        res.status(500).json({ message: 'Error sanctioning loan', error });
    }
};
