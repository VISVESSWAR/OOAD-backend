// const { Sequelize, DataTypes } = require('sequelize');
// const db = require('../config/db');
// const User = require('./User');

// const Account = db.define('Account', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: User,
//             key: 'id'
//         },
//         onDelete: 'CASCADE'
//     },
//     account_number: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     balance: {
//         type: DataTypes.DECIMAL(10, 2),
//         defaultValue: 0.00
//     },
//     account_type: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     created_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     },
//     updated_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     }
// }, {
//     timestamps: false
// });

// module.exports = Account;

// const { Sequelize, DataTypes } = require('sequelize');
// const db = require('../config/db');
// const User = require('./User');

// const Account = db.define('Account', {
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true
//     },
//     user_id: {
//         type: DataTypes.UUID,
//         allowNull: false
//     },
//     accountType: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     account_number: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false
//     },
//     balance: {
//         type: DataTypes.DECIMAL,
//         defaultValue: 0,
//         allowNull: false
//     },
//     created_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//         allowNull: false
//     },
//     updated_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//         allowNull: false
//     }
// });

// module.exports = Account;

const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db");
const User = require("./User");

const Account = db.define(
  "Account",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    account_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Savings", "Current"]],
      },
    },
    account_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Account;
