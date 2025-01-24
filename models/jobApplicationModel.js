const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const JobApplication = sequelize.define("JobApplication", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  applicationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "applied",
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  documentPath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = JobApplication;
