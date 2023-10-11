const Sequelize = require("sequelize");

const db = new Sequelize("sorteo3", null, null, {
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
