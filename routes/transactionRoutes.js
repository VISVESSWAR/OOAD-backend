const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { verifyToken } = require('../middlewares/authMiddleware');
//const { recognizeFace } = require('../middlewares/facialRecognition');

//router.post('/', verifyToken, recognizeFace, transactionController.createTransaction);
router.get('/:userId', verifyToken, transactionController.getUserTransactions);

module.exports = router;
