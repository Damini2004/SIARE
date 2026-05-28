const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Collaboration = sequelize.define("Collaboration", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logo: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Collaboration;