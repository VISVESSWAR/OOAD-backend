const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const Card = db.define('Card', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    card_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending'
    },
    card_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Card;
