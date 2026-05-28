const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Member = sequelize.define(
  "Member",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    memberCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    designation: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue(
          "email",
          String(value || "").toLowerCase().trim()
        );
      },
    },

    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    scopus: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    orcid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Member;