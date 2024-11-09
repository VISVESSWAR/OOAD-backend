const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, loanController.applyForLoan);
router.get('/:userId', verifyToken, loanController.getUserLoans);
router.put('/sanction/:loanId', verifyToken, loanController.sanctionLoan);

module.exports = router;
