import { sequelize } from "./config.js";
import { User } from "./user.js";


export const db = {
    sequelize,
    User
}