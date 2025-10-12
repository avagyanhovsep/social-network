import express from "express";
import { db } from "./models/index.js";
import { authRouter } from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use('/auth', authRouter);

db.sequelize.sync({ alter: true }).then(() => {
    console.log("SYNC");
})

app.listen(4002, () => console.log('Server started on http://localhost:4002'));