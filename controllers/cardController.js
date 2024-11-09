const Card = require('../models/Card');
const { verifyToken } = require('../middlewares/authMiddleware');

exports.applyForCard = async (req, res) => {
    const { user_id, card_type } = req.body;
    try {
        const card = await Card.create({ user_id, card_type });
        res.status(201).json({ message: 'Credit card application submitted', card });
    } catch (error) {
        res.status(400).json({ message: 'Error applying for credit card', error });
    }
};
exports.getUserCards = async (req, res) => {
    try {
        const cards = await Card.findAll({ where: { user_id: req.params.userId } });
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching credit cards', error });
    }
};

exports.approveCard = async (req, res) => {
    const { cardId } = req.params;
    try {
        const card = await Card.findByPk(cardId);
        if (!card) return res.status(404).json({ message: 'Card not found' });

        card.status = 'Approved';
        await card.save();
        res.json({ message: 'Credit card application approved', card });
    } catch (error) {
        res.status(500).json({ message: 'Error approving credit card', error });
    }
};
