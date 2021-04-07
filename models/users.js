const bcryptjs = require("bcryptjs");
const _ = require("underscore");

module.exports = function (sequelize, DataType) {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataType.VIRTUAL,
        allowNull: false,
      },
      salt: {
        type: DataType.STRING,
      },
      hash: {
        type: DataType.STRING,
      },
    },
    {
      hooks: {
        beforeValidate: function (input) {
          if (input.email) {
            input.email = input.email.toLowerCase().trim();
          }
        },
        beforeCreate: async function (input) {
          // generate salt
          // has
          try {
            const _salt = await bcryptjs.genSalt(10);
            const _hash = await bcryptjs.hash(input.password, _salt);
            input.setDataValue("salt", _salt);
            input.setDataValue("hash", _hash);
          } catch (err) {
            return err;
          }
        },
      },
    }
  );

  User.prototype.toPublic = function () {
    return _.omit(this.toJSON(), "salt", "hash", "password");
  };

  User.prototype.verifyPassword = async function (password) {
    return !!(await bcryptjs.compare(password, this.hash));
  };

  return User;
};
