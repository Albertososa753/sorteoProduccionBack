import { Model, DataTypes } from "sequelize";
import db from "../config/db.js";
import bcrypt from "bcrypt";

class Admin extends Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then((newHash) => {
      return newHash === this.password;
    });
  }
}

Admin.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize: db,
    modelName: "admin",
  }
);

Admin.beforeCreate((admin) => {
  const salt = bcrypt.genSaltSync();
  admin.salt = salt;
  return admin.hash(admin.password, salt).then((hash) => {
    admin.password = hash;
  });
});

export default Admin;
