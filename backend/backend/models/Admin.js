const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../config/db");

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      defaultValue: "Super Admin",
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "superadmin",
    },
  },
  {
    timestamps: true,

    hooks: {
      beforeCreate: async (admin) => {
        if (admin.password) {
          admin.password = await bcrypt.hash(admin.password, 10);
        }
      },

      beforeUpdate: async (admin) => {
        if (admin.changed("password")) {
          admin.password = await bcrypt.hash(admin.password, 10);
        }
      },
    },
  }
);

module.exports = Admin;