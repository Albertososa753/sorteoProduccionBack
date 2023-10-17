import { Model, DataTypes } from "sequelize";
import db from "../config/db.js";

class AccumulatedNumbers extends Model {}

AccumulatedNumbers.init(
  {
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "accumulated_numbers",
  }
);

export default AccumulatedNumbers;
