const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, cardController.applyForCard);
router.get('/:userId', verifyToken, cardController.getUserCards);
router.put('/approve/:cardId', verifyToken, cardController.approveCard);

module.exports = router;
