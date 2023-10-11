const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");
class Admin extends Sequelize.Model {
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
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    salt: {
      type: Sequelize.DataTypes.STRING,
    },

    email: {
      type: Sequelize.DataTypes.STRING,
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
module.exports = Admin;
