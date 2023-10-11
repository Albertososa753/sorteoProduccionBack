const Sequelize = require("sequelize");
const db = require("../config/db");

class Participant extends Sequelize.Model {}

Participant.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false, // Asegura que no sea nulo

    },
    name: {
      type: Sequelize.DataTypes.STRING,
    },
    lastname: {
      type: Sequelize.DataTypes.STRING,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.DataTypes.STRING,
    },
    amountPaid: {
      type: Sequelize.DataTypes.FLOAT,
    },
  },
  {
    sequelize: db,
    modelName: "participant", // Nombre del modelo en la base de datos
  }
);

module.exports = Participant;
