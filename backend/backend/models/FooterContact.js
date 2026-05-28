const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const FooterContact = sequelize.define("FooterContact", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = FooterContact;