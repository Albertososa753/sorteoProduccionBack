const Sequelize = require("sequelize");
const db = require("../config/db");

class Participant extends Sequelize.Model {}

Participant.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    amountPaid: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'participant', // Nombre del modelo en la base de datos
  }
);

module.exports = Participant;
