import { Sequelize } from "sequelize";

const db = new Sequelize("sorteo4", null, null, {
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

export default db;
