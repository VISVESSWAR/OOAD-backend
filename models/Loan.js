// const { Sequelize, DataTypes } = require('sequelize');
// const db = require('../config/db');
// const User = require('./User');

// const Loan = db.define('Loan', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: User,
//             key: 'id'
//         }
//     },
//     amount: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false
//     },
//     duration: {
//         type: DataTypes.INTEGER,
//         allowNull: false // Duration in months
//     },
//     status: {
//         type: DataTypes.STRING,
//         defaultValue: 'Pending'
//     },
//     application_date: {
//         type: DataTypes.DATE,
//         defaultValue: Sequelize.NOW
//     },
//     due_date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     }
// });

// module.exports = Loan;
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db");
const User = require("./User");

const Loan = db.define("Loan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  purpose: {
    type: DataTypes.STRING, // New field for loan purpose
    // allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false, // Duration in months
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
  application_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Loan;
