import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import db from "./config/db.js";
import routes from "./routes/index.js";
import { Admin, Participant, AccumulatedNumbers } from "./model/index.js";
import cors from "cors";
import { PORT } from "../config.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

db.sync({ force: false }).then(() => {
  console.log("Base de datos conectada.💻");
  app.listen(PORT, () => {
    console.log("Escuchando en el puerto 4001 🚀");
  });
});
