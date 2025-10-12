import { DataTypes } from "sequelize";
import { sequelize } from "./config.js";
import { validEmail, validPhone, validDOB } from "../utils/validation.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkEmail: (email) => {
          if (!validEmail(email)) {
            throw new Error("Invalid email format.");
          }
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        checkPhone: (phone) => {
          if (phone && !validPhone(phone)) {
            throw new Error("Invalid phone number format.");
          }
        },
      },
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkDOB: (dob) => {
          if (!validDOB(dob)) {
            throw new Error("Invalid or underage date of birth.");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
