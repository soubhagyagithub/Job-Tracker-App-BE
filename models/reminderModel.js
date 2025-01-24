const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Reminder = sequelize.define("Reminder", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  reminderDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Reminder;
