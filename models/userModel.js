const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  careerGoals: {
    type: DataTypes.TEXT,
    allowNull: true, // User can leave this empty or provide information about their career goals
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field for phone number
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field for address
  },
});

module.exports = User;
