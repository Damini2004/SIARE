const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const RecentView = sequelize.define(
  "RecentView",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    page: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    viewedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }
);

module.exports = RecentView;