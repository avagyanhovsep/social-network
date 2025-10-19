import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";
import { db } from "./models/index.js";
import { authRouter } from "./routes/auth.js";

const app = express();
app.use(cors({origin: "http://localhost:5173", credentials: true}));

const docs = YAML.load("./docs/openapi.yaml");

app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", authRouter);
app.use("/api", swaggerUI.serve, swaggerUI.setup(docs));

db.sequelize.sync({ alter: true }).then(() => {
  console.log("SYNC");
});

app.listen(4002, () => console.log("Server started on http://localhost:4002"));
