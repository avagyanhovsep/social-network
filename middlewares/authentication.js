import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { User } from "../models/user.js";

dotenv.config();

export const isAuthenticated = (req, res, next) => {
    const authentication = req.headers["authorization"];
    const token = authentication && authentication.split(" ")[1];

    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.status(401).send({ message: "Forbidden" });
        }

        const user = await User.findByPk(data.id, {
            attributes: {
                exclude: 'password'
            }
        });
        
        req.user = user.dataValues;
        next();
    });
}